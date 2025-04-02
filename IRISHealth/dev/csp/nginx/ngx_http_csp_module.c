/* 
   Chris Munt: Interface between an Nginx web server and the CSP NSD module.

   Cache Server Pages:

      +--------------------------------------------------------+
      | Copyright 1986-2017 by InterSystems Corporation,       |
      | Cambridge, Massachusetts, U.S.A.                       |
      | All rights reserved.                                   |
      |                                                        |
      | Confidential, unpublished property of InterSystems.    |
      |                                                        |
      | This media contains an authorized copy or copies       |
      | of material copyrighted by InterSystems and is the     |
      | confidential, unpublished property of InterSystems.    |
      | This copyright notice and any other copyright notices  |
      | included in machine readable copies must be reproduced |
      | on all authorized copies.                              |
      +--------------------------------------------------------+


*/


#include <ngx_config.h>
#include <ngx_core.h>
#include <ngx_http.h>
#include <nginx.h>

/* build information */
#define CSP_MODULE_TYPE             "ngxapi-nsd"
#define CSP_MODULE_BUILD            "12"
#define CSP_ADHOC_BUILD             "0"
#define CSP_MODULE_VERSION          "1.1.12"

/* default configuration values */
#define CSPNSD_DEFAULT_PASS                 "127.0.0.1:7038"  /* hostname/IP and port for NSD */
#define CSPNSD_DEFAULT_CONNECT_TIMEOUT      300000  /* timeout (ms) for connecting to NSD */
#define CSPNSD_DEFAULT_SEND_TIMEOUT         300000  /* timeout (ms) for a single send operation to NSD */
#define CSPNSD_DEFAULT_READ_TIMEOUT         300000  /* timeout (ms) for a single read operation from NSD */
#define CSPNSD_DEFAULT_RESPONSE_BUFFER_SIZE 8192 /* buffer size for reading HTTP headers from NSD */

/* if f evaluates to NGX_ERROR, return NGX_ERROR */
#define CSP_RETURN_ON_ERROR(f) if (f == NGX_ERROR) return NGX_ERROR


/* Configuration struct for location context */
typedef struct {
   /* configuration for communicating with NSD, the upstream server */
   ngx_http_upstream_conf_t upstream;

   /* File types for which CSP access is enabled, represented as an array of
    * lowercased null-terminated strings without the preceding '.'
    * For example,
    *    CSPFileTypes xxx YYY .zzz
    * is stored as ["xxx", "yyy", "zzz"].
    * If the array contains "*", then CSP access is enabled for all file types.
    * If the CSPFileTypes parameter is not present, this is NULL. */
   ngx_array_t *csp_file_types;

   /* flag for whether CSP access is enabled */
   short csp_enabled;
} ngx_http_csp_loc_conf_t;

/* context struct for tracking state of reading response from NSD */
typedef struct {
   ngx_http_status_t status;    /* parsed HTTP status line */
   ngx_http_chunked_t chunked;  /* parsed chunked response */
   unsigned is_head:1;          /* flag for whether request is a HEAD request */
} ngx_http_csp_ctx_t;


/* configuration parameter handlers */
static char* ngx_http_conf_csp(ngx_conf_t *cf, ngx_command_t *cmd, void *conf);
static char* ngx_http_conf_cspfiletypes(ngx_conf_t *cf, ngx_command_t *cmd, void *conf);
static char* ngx_http_conf_cspnsd_pass(ngx_conf_t *cf, ngx_command_t *cmd, void *conf);

/* configuration phase callbacks */
static void* ngx_http_csp_create_loc_conf(ngx_conf_t *cf);
static char* ngx_http_csp_merge_loc_conf(ngx_conf_t *cf, void *parent, void *child);

/* CSP request handler */
static ngx_int_t ngx_http_csp_handler(ngx_http_request_t *r);

/* upstream callbacks */
static ngx_int_t ngx_http_csp_create_request(ngx_http_request_t *r);
static ngx_int_t ngx_http_csp_reinit_request(ngx_http_request_t *r);
static ngx_int_t ngx_http_csp_process_status_line(ngx_http_request_t *r);
static ngx_int_t ngx_http_csp_process_header(ngx_http_request_t *r);
static void ngx_http_csp_abort_request(ngx_http_request_t *r);
static void ngx_http_csp_finalize_request(ngx_http_request_t *r, ngx_int_t rc);
static ngx_int_t ngx_http_csp_filter_init(void *data);
static ngx_int_t ngx_http_csp_copy_filter(void *data, ssize_t bytes);
static ngx_int_t ngx_http_csp_chunked_filter(void *data, ssize_t bytes);

/* miscellaneous helper functions */
static ngx_inline int ngx_http_csp_check_file_type(const ngx_array_t *csp_file_types, const u_char *ext);
static void ngx_http_csp_strup(u_char *str);
static int ngx_http_csp_array_contains(const ngx_array_t *a, const u_char *elt);
static ngx_int_t ngx_http_csp_array_append(ngx_array_t *a, const u_char *str, ssize_t i);
static ngx_int_t ngx_http_csp_array_set(ngx_array_t *a, const u_char *str);


/* module context; sets the callbacks for creating and merging configurations */
static ngx_http_module_t ngx_http_csp_module_ctx = {
   NULL,                                 /* preconfiguration */
   NULL,                                 /* postconfiguration */

   NULL,                                 /* create main configuration */
   NULL,                                 /* init main configuration */

   NULL,                                 /* create server configuration */
   NULL,                                 /* merge server configuration */

   ngx_http_csp_create_loc_conf,         /* create location configuration */
   ngx_http_csp_merge_loc_conf           /* merge location configuration */
};

/* module directives */
static ngx_command_t ngx_http_csp_commands[] = {
   { ngx_string("CSP"),
     NGX_HTTP_LOC_CONF|NGX_HTTP_LIF_CONF|NGX_CONF_TAKE1,
     ngx_http_conf_csp,
     NGX_HTTP_LOC_CONF_OFFSET,
     0,
     NULL },

   { ngx_string("CSPFileTypes"),
     NGX_HTTP_LOC_CONF|NGX_HTTP_LIF_CONF|NGX_CONF_ANY,
     ngx_http_conf_cspfiletypes,
     NGX_HTTP_LOC_CONF_OFFSET,
     0,
     NULL },

   { ngx_string("CSPNSD_pass"),
     NGX_HTTP_LOC_CONF|NGX_HTTP_LIF_CONF|NGX_CONF_TAKE1,
     ngx_http_conf_cspnsd_pass,
     NGX_HTTP_LOC_CONF_OFFSET,
     0,
     NULL },

   { ngx_string("CSPNSD_response_headers_maxsize"),
     NGX_HTTP_LOC_CONF|NGX_HTTP_LIF_CONF|NGX_CONF_TAKE1,
     ngx_conf_set_size_slot,
     NGX_HTTP_LOC_CONF_OFFSET,
     offsetof(ngx_http_csp_loc_conf_t, upstream.buffer_size),
     NULL },

   { ngx_string("CSPNSD_connect_timeout"),
     NGX_HTTP_LOC_CONF|NGX_HTTP_LIF_CONF|NGX_CONF_TAKE1,
     ngx_conf_set_msec_slot,
     NGX_HTTP_LOC_CONF_OFFSET,
     offsetof(ngx_http_csp_loc_conf_t, upstream.connect_timeout),
     NULL },

   { ngx_string("CSPNSD_send_timeout"),
     NGX_HTTP_LOC_CONF|NGX_HTTP_LIF_CONF|NGX_CONF_TAKE1,
     ngx_conf_set_msec_slot,
     NGX_HTTP_LOC_CONF_OFFSET,
     offsetof(ngx_http_csp_loc_conf_t, upstream.send_timeout),
     NULL },

   { ngx_string("CSPNSD_read_timeout"),
     NGX_HTTP_LOC_CONF|NGX_HTTP_LIF_CONF|NGX_CONF_TAKE1,
     ngx_conf_set_msec_slot,
     NGX_HTTP_LOC_CONF_OFFSET,
     offsetof(ngx_http_csp_loc_conf_t, upstream.read_timeout),
     NULL },

   ngx_null_command
};

/* module definition */
ngx_module_t ngx_http_csp_module = {
   NGX_MODULE_V1,
   &ngx_http_csp_module_ctx,     /* module context */
   ngx_http_csp_commands,        /* module directives */
   NGX_HTTP_MODULE,              /* module type */
   NULL,                         /* init master */
   NULL,                         /* init module */
   NULL,                         /* init process */
   NULL,                         /* init thread */
   NULL,                         /* exit thread */
   NULL,                         /* exit process */
   NULL,                         /* exit master */
   NGX_MODULE_V1_PADDING
};

/* Handle the CSP configuration directive. */
static char* ngx_http_conf_csp(ngx_conf_t *cf, ngx_command_t *cmd, void *conf) {
   ngx_http_csp_loc_conf_t *dconf = conf;
   ngx_str_t *value = cf->args->elts;
   u_char *arg = value[1].data;

   dconf->csp_enabled = (arg && !ngx_strcasecmp(arg, (u_char *)"on"));

   return NGX_CONF_OK;
}

#define CSPFILETYPES_INIT_LEN 32

/* Handle the CSPFileTypes configuration directive. */
static char* ngx_http_conf_cspfiletypes(ngx_conf_t *cf, ngx_command_t *cmd, void *conf) {
   ngx_http_csp_loc_conf_t *dconf = conf;

   /* create array for holding file types if it wasn't created in previous
    * invocation of this function */
   if (!dconf->csp_file_types) {
      dconf->csp_file_types = ngx_array_create(cf->pool, CSPFILETYPES_INIT_LEN, sizeof(u_char *));
      if (!dconf->csp_file_types) {
         return NGX_CONF_ERROR;
      }
   }

   /* populate file types array using values from configuration file */
   ngx_str_t *value = cf->args->elts;
   ngx_uint_t i;  /* argument number for CSPFileTypes directive */
   for (i = 1; i < cf->args->nelts; i++) {
      u_char *file_type_src = value[i].data;
      if (file_type_src[0]) {
         /* copy file type, lowercased and with preceding '.' removed, into
          * configuration struct */
         u_char **file_type_dest = ngx_array_push(dconf->csp_file_types);
         if (!file_type_dest) {
            return NGX_CONF_ERROR;
         }
         if (file_type_src[0] == '.') {
            *file_type_dest = ngx_pnalloc(cf->pool, ngx_strlen(file_type_src));
            if (!*file_type_dest) {
               return NGX_CONF_ERROR;
            }
            ngx_strlow(*file_type_dest, file_type_src + 1, ngx_strlen(file_type_src));
         } else {
            *file_type_dest = ngx_pnalloc(cf->pool, ngx_strlen(file_type_src) + 1);
            if (!*file_type_dest) {
               return NGX_CONF_ERROR;
            }
            ngx_strlow(*file_type_dest, file_type_src, ngx_strlen(file_type_src) + 1);
         }
      }
   }

   return NGX_CONF_OK;
}

/* Handle the CSPNSD_pass configuration directive. */
static char* ngx_http_conf_cspnsd_pass(ngx_conf_t *cf, ngx_command_t *cmd, void *conf) {
   ngx_http_csp_loc_conf_t *dconf = conf;
   if (dconf->upstream.upstream) {
      return "is duplicate";
   }
   ngx_str_t *value = cf->args->elts;
   ngx_url_t u;
   ngx_memzero(&u, sizeof u);
   u.url = value[1];
   /* Do not resolve hostname at runtime because that would block the whole
    * worker process. Let hostname resolution happen at startup only. */
   u.no_resolve = 1;
   dconf->upstream.upstream = ngx_http_upstream_add(cf, &u, 0);
   if (!dconf->upstream.upstream) {
      return NGX_CONF_ERROR;
   }

   return NGX_CONF_OK;
}

/* Create module configuration struct. */
static void* ngx_http_csp_create_loc_conf(ngx_conf_t *cf) {
   ngx_http_csp_loc_conf_t *conf = ngx_pcalloc(cf->pool, sizeof(ngx_http_csp_loc_conf_t));
   if (!conf) {
      return NULL;
   }
   /* set by ngx_pcalloc():
    *
    *  conf->upstream.upstream = NULL;
    *  conf->upstream.local = NULL;
    *  conf->upstream.temp_path = NULL;
    *  conf->upstream.hide_headers_hash = { NULL, 0 };
    *  conf->upstream.store = 0;
    *  conf->upstream.store_access = 0;
    *  conf->upstream.store_lengths = NULL;
    *  conf->upstream.store_values = NULL;
    *  conf->upstream.buffering = 0;
    *  conf->upstream.change_buffering = 0;
    *  conf->upstream.bufs.num = 0;
    *  conf->upstream.busy_buffers_size_conf = 0;
    *  conf->upstream.max_temp_file_size_conf = 0;
    *  conf->upstream.temp_file_write_size = 0;
    *  conf->upstream.socket_keepalive = 0;
    *  conf->upstream.next_upstream = 0;
    *  conf->upstream.next_upstream_tries = 0;
    *  conf->upstream.next_upstream_timeout = 0;
    *  conf->upstream.request_buffering = 0;
    *  conf->upstream.ignore_client_abort = 0;
    *  conf->upstream.send_lowat = 0;
    *  conf->upstream.limit_rate = 0;
    *  conf->upstream.pass_request_headers = 0;
    *  conf->upstream.pass_request_body = 0;
    *  conf->upstream.pass_trailers = 0;
    *  conf->upstream.preserve_output = 0;
    *  conf->upstream.intercept_errors = 0;
    *  conf->upstream.intercept_404 = 0;
    *  conf->upstream.cyclic_temp_file = 0;
    *  conf->upstream.ignore_headers = 0;
    *  conf->upstream.force_ranges = 0;
    * 
    *  conf->csp_file_types = NULL; */

   conf->upstream.connect_timeout = NGX_CONF_UNSET_MSEC;
   conf->upstream.send_timeout = NGX_CONF_UNSET_MSEC;
   conf->upstream.read_timeout = NGX_CONF_UNSET_MSEC;
   conf->upstream.buffer_size = NGX_CONF_UNSET_SIZE;
   conf->upstream.hide_headers = NGX_CONF_UNSET_PTR;
   conf->upstream.pass_headers = NGX_CONF_UNSET_PTR;

   conf->csp_enabled = NGX_CONF_UNSET;

   return conf;
}

/* Merge a child configuration struct with its parent and set defaults. */
static char* ngx_http_csp_merge_loc_conf(ngx_conf_t *cf, void *parent, void *child) {
   ngx_http_csp_loc_conf_t *prev = parent;
   ngx_http_csp_loc_conf_t *conf = child;

   if (!conf->upstream.upstream) {
      /* Inherit upstream server from parent */
      conf->upstream.upstream = prev->upstream.upstream;
   }

   /* Merge numeric values and set defaults */
   ngx_conf_merge_msec_value(conf->upstream.connect_timeout, prev->upstream.connect_timeout, CSPNSD_DEFAULT_CONNECT_TIMEOUT);
   ngx_conf_merge_msec_value(conf->upstream.send_timeout, prev->upstream.send_timeout, CSPNSD_DEFAULT_SEND_TIMEOUT);
   ngx_conf_merge_msec_value(conf->upstream.read_timeout, prev->upstream.read_timeout, CSPNSD_DEFAULT_READ_TIMEOUT);
   ngx_conf_merge_size_value(conf->upstream.buffer_size, prev->upstream.buffer_size, CSPNSD_DEFAULT_RESPONSE_BUFFER_SIZE);
   ngx_conf_merge_value(conf->csp_enabled, prev->csp_enabled, 0);

   /* Merge CSPFileTypes */
   if (conf->csp_file_types && prev->csp_file_types) {
      /* Parent and child both have a value; merge the parent's file types into
       * the child. */
      u_char **value = prev->csp_file_types->elts;
      ngx_uint_t i;
      for (i = 0; i < prev->csp_file_types->nelts; i++) {
         if (!ngx_http_csp_array_contains(conf->csp_file_types, value[i])) {
            u_char **new_value = ngx_array_push(conf->csp_file_types);
            if (!new_value) {
               return NGX_CONF_ERROR;
            }
            size_t len = ngx_strlen(value[i]);
            *new_value = ngx_pnalloc(cf->pool, len + 1);
            if (!*new_value) {
               return NGX_CONF_ERROR;
            }
            ngx_memcpy(*new_value, value[i], len + 1);
         }
      }
   } else if (!conf->csp_file_types && prev->csp_file_types) {
      /* Only parent has a value; inherit from parent */
      conf->csp_file_types = prev->csp_file_types;
   }
   /* Do nothing if
    *    (conf->csp_file_types && !prev->csp_file_types) ||
    *    (!conf->csp_file_types && !prev->csp_file_types) */

   /* Create hash table of HTTP headers from NSD to avoid sending to client.
    * All HTTP headers should be sent to the client, so the hash table is
    * empty. */
   ngx_hash_init_t hash;
   hash.max_size = 1;
   hash.bucket_size = 1;
   hash.name = "empty hash table";
   ngx_str_t empty = ngx_null_string;
   if (ngx_http_upstream_hide_headers_hash(cf, &conf->upstream, &prev->upstream, &empty, &hash) != NGX_OK) {
      return NGX_CONF_ERROR;
   }

   /* register the CSP request handler if CSP access is enabled or the
    * CSPFileTypes directive is present */
   if (conf->csp_enabled || conf->csp_file_types) {
      ngx_http_core_loc_conf_t *clcf = ngx_http_conf_get_module_loc_conf(cf, ngx_http_core_module);
      clcf->handler = ngx_http_csp_handler;
   }

   return NGX_CONF_OK;
}


#define CSP_URL_EXT_BUFSIZE 16

/* Main CSP request handler.
 *
 * First, check whether CSP access is enabled for this request. If so,
 * set the upstream server to the NSD and set the callbacks for handling
 * communication with the NSD. */
static ngx_int_t ngx_http_csp_handler(ngx_http_request_t *r) {
   ngx_log_debug0(NGX_LOG_DEBUG_HTTP, r->connection->log, 0, "ngx_http_csp_handler called");
   ngx_http_csp_loc_conf_t *dconf = ngx_http_get_module_loc_conf(r, ngx_http_csp_module);

   /* obtain extension from URL and save its lowercased version in ext */
   u_char ext_stack[CSP_URL_EXT_BUFSIZE] = "";
   u_char *ext = ext_stack;
   if (r->uri.len > 3) {
      int n;
      for (n = r->uri.len - 1; n > 1; n--) {
         if (r->uri.data[n] == '.') {
            n++;
            size_t ext_len = r->uri.len - n;
            if (ext_len >= CSP_URL_EXT_BUFSIZE) {
               ext = ngx_pnalloc(r->pool, ext_len + 1);
               if (!ext) {
                  return NGX_HTTP_INTERNAL_SERVER_ERROR;
               }
            }
            ngx_strlow(ext, r->uri.data + n, ext_len);
            ext[ext_len] = '\0';
            break;
         }
      }
   }

   if (!dconf->csp_enabled && !ngx_http_csp_check_file_type(dconf->csp_file_types, ext)) {
      /* CSP access is disabled, so pass request to next handler */
      ngx_log_debug0(NGX_LOG_DEBUG_HTTP, r->connection->log, 0, "ngx_http_csp_handler returning NGX_DECLINED");
      return NGX_DECLINED;
   }

   if (!dconf->upstream.upstream) {
      ngx_log_error(NGX_LOG_ERR, r->connection->log, 0,
         "The CSPNSD_pass configuration directive is missing. If you are "
         "running the NSD in its default configuration, add the line "
         "`CSPnsd_pass " CSPNSD_DEFAULT_PASS "` to the Nginx configuration "
         "file in the proper location{} block");
      return NGX_HTTP_INTERNAL_SERVER_ERROR;
   }

   if (ngx_http_upstream_create(r) != NGX_OK) {
      return NGX_HTTP_INTERNAL_SERVER_ERROR;
   }

   ngx_http_upstream_t *u = r->upstream;
   ngx_str_set(&u->schema, "CSPnsd://");  /* upstream schema is used for logging purposes only */
   u->output.tag = (ngx_buf_tag_t)&ngx_http_csp_module;
   u->conf = &dconf->upstream;

   /* set upstream callbacks */
   u->create_request = ngx_http_csp_create_request;
   u->reinit_request = ngx_http_csp_reinit_request;
   u->process_header = ngx_http_csp_process_status_line;
   u->abort_request = ngx_http_csp_abort_request;
   u->finalize_request = ngx_http_csp_finalize_request;
   u->input_filter_ctx = r;  /* the argument to pass to input_filter_init and input_filter */
   u->input_filter_init = ngx_http_csp_filter_init;
   u->input_filter = ngx_http_csp_copy_filter;

   /* read request body from client and initialize the upstream connection
    * once the body is fully read */
   ngx_int_t rc = ngx_http_read_client_request_body(r, ngx_http_upstream_init);
   if (rc >= NGX_HTTP_SPECIAL_RESPONSE) {
      return rc;
   }

   return NGX_DONE;
}

/* initial size of array for holding CGI environment variables to send to NSD */
#define CSP_TRANS_ARRAY_INIT_LEN       1024

/* initial size of array for holding temporary strings */
#define CSP_TMP_ARRAY_INIT_LEN         256

/* placeholder for header length field to send to NSD before we know what the length is */
#define CSP_NSD_HEADER_LEN_PLACEHOLDER "#########\r"

/* maximum length (bytes) of header that can be sent to NSD, excluding header length field */
#define CSP_NSD_MAX_HEADER_LEN         999999999

/* Create a request to send to NSD. To do so, create and populate a chain of
 * buffers, then set a pointer to the start of the chain. */
static ngx_int_t ngx_http_csp_create_request(ngx_http_request_t *r) {
   ngx_log_debug0(NGX_LOG_DEBUG_HTTP, r->connection->log, 0, "ngx_http_csp_create_request called");

   /* create context struct that will be used to track state of reading response
    * from NSD */
   ngx_http_csp_ctx_t *ctx = ngx_pcalloc(r->pool, sizeof(ngx_http_csp_ctx_t));
   if (!ctx) {
      return NGX_ERROR;
   }
   ctx->is_head = (r->method_name.len == sizeof "HEAD" - 1 &&
                  !ngx_strncasecmp(r->method_name.data, (u_char *)"HEAD", sizeof "HEAD" - 1));
   ngx_http_set_ctx(r, ctx, ngx_http_csp_module);
   
   /* Construct headers to send to NSD. Headers consist of CGI environment variables. */
   ngx_array_t *headers = ngx_array_create(r->pool, CSP_TRANS_ARRAY_INIT_LEN, sizeof(u_char));
   if (!headers) {
      return NGX_ERROR;
   }

   CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"REQUEST_METHOD=", -1)));
   CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, r->method_name.data, r->method_name.len)));

   CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\rSCRIPT_NAME=", -1)));
   CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, r->uri.data, r->uri.len)));

   if (r->args.len >= 1) {
      CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\rQUERY_STRING=", -1)));
      CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, r->args.data, r->args.len)));
   }

   CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\rSERVER_PROTOCOL=", -1)));
   CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, r->http_protocol.data, r->http_protocol.len)));

   CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\rSERVER_SOFTWARE=" NGINX_VER, -1)));

   CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\rREMOTE_ADDR=", -1)));
   if (r->connection->addr_text.data && r->connection->addr_text.len >= 1) {  /* CMT1262 */
      CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, r->connection->addr_text.data, r->connection->addr_text.len)));
   }

   /* CMT1556 */
   ngx_int_t port = 0;
   struct sockaddr_in *sin;
#if (NGX_HAVE_INET6)
   struct sockaddr_in6 *sin6;
#endif
   switch (r->connection->sockaddr->sa_family) {
#if (NGX_HAVE_INET6)
      case AF_INET6:
         sin6 = (struct sockaddr_in6 *)r->connection->sockaddr;
         port = ntohs(sin6->sin6_port);
         break;
#endif
      case AF_UNIX:
         port = 0;
         break;
      default: /* AF_INET */
         sin = (struct sockaddr_in *)r->connection->sockaddr;
         port = ntohs(sin->sin_port);
         break;
   }
   if (port > 0 && port < 65536) {
      u_char port_str[NGX_INT_T_LEN + 1];
      ngx_sprintf(port_str, "%i%Z", port);
      CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\rREMOTE_PORT=", -1)));
      CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, port_str, -1)));
   }

   CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\rREMOTE_HOST=", -1)));
   if (r->connection->addr_text.data && r->connection->addr_text.len >= 1) {  /* CMT1262 */
      CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, r->connection->addr_text.data, r->connection->addr_text.len)));
   }

   CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\rCSP_MODULE_TYPE=" CSP_MODULE_TYPE, -1)));

   CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\rCSP_MODULE_BUILD=" CSP_MODULE_BUILD "\r", -1)));

   /* convert request headers list to CGI environment variables */
   ngx_array_t tmp;
   if (ngx_array_init(&tmp, r->pool, CSP_TMP_ARRAY_INIT_LEN, sizeof(u_char)) != NGX_OK) {
      return NGX_ERROR;
   }
   ngx_list_part_t *part = &(r->headers_in.headers.part);
   ngx_table_elt_t *hd = part->elts;
   ngx_uint_t i;
   for (i = 0; /* void */; i++) {
      if (i >= part->nelts) {
         if (part->next == NULL) {
            break;
         }
         part = part->next;
         hd = part->elts;
         i = 0;
      }

      if (hd[i].key.data) {
         /* Convert HTTP request header name into CGI environment variable
          * name. To do so, capitalize the header name, change all hyphens to
          * underscores, and (with the exception of Content-Type and
          * Content-Length fields) prepend "HTTP_". */
         CSP_RETURN_ON_ERROR((ngx_http_csp_array_set(&tmp, hd[i].key.data)));
         ngx_http_csp_strup(tmp.elts);
         u_char *c;
         for (c = tmp.elts; *c; c++) {
            if (*c == '-') {
               *c = '_';
            }
         }
         if (ngx_strcmp(tmp.elts, "CONTENT_TYPE") && ngx_strcmp(tmp.elts, "CONTENT_LENGTH")) {
            CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"HTTP_", -1)));
         }
         CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, tmp.elts, -1)));

         /* obtain HTTP request header value */
         CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"=", -1)));
         CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, hd[i].value.data, -1)));
         CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\r", -1)));
         
         if (!ngx_strcmp(tmp.elts, "HOST")) {
            /* construct SERVER_NAME and SERVER_PORT variables from Host header */
            CSP_RETURN_ON_ERROR((ngx_http_csp_array_set(&tmp, hd[i].value.data)));
            u_char *colon = (u_char *)ngx_strchr(tmp.elts, ':');
            if (colon) {
               *colon = '\0';
            }

            CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"SERVER_NAME=", -1)));
            CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, tmp.elts, -1)));

            CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\rSERVER_PORT=", -1)));
            if (colon) {
               CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, colon + 1, -1)));
            } else {
               CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"80", -1)));
            }
            CSP_RETURN_ON_ERROR((ngx_http_csp_array_append(headers, (u_char *)"\r", -1)));
         }
      }
   }

   /* create chain link for header length */
   ngx_buf_t *header_len_b = ngx_create_temp_buf(r->pool, sizeof CSP_NSD_HEADER_LEN_PLACEHOLDER - 1);
   if (!header_len_b) {
      return NGX_ERROR;
   }
   ngx_memcpy(header_len_b->last, CSP_NSD_HEADER_LEN_PLACEHOLDER, sizeof CSP_NSD_HEADER_LEN_PLACEHOLDER - 1);
   header_len_b->last += sizeof CSP_NSD_HEADER_LEN_PLACEHOLDER - 1;
   if (headers->nelts > CSP_NSD_MAX_HEADER_LEN) {
      return NGX_HTTP_REQUEST_ENTITY_TOO_LARGE;
   }
   ngx_sprintf(header_len_b->pos, "%ui", headers->nelts);
   ngx_chain_t *header_len_cl = ngx_alloc_chain_link(r->pool);
   if (!header_len_cl) {
      return NGX_ERROR;
   }
   header_len_cl->buf = header_len_b;

   /* attach chain link for headers, pointing to the data in the headers array */
   ngx_buf_t *headers_b = ngx_calloc_buf(r->pool);
   if (!headers_b) {
      return NGX_ERROR;
   }
   /* set by ngx_calloc_buf():
    *
    *  headers_b->file_pos = 0;
    *  headers_b->file_last = 0;
    *  headers_b->file = NULL;
    *  headers_b->shadow = NULL;
    *  headers_b->tag = 0;
    *     and flags */
   headers_b->start = headers->elts;
   headers_b->end = headers_b->start + headers->nelts * headers->size;
   headers_b->pos = headers_b->start;
   headers_b->last = headers_b->end;
   headers_b->temporary = 1;
   ngx_chain_t *headers_cl = ngx_alloc_chain_link(r->pool);
   if (!headers_cl) {
      return NGX_ERROR;
   }
   headers_cl->buf = headers_b;
   header_len_cl->next = headers_cl;

   /* attach chain links for request body */
   headers_cl->next = r->request_body->bufs;

   /* set request buffers pointer to the first chain link (i.e. the header
    * length chain link) to tell upstream to send entire chain to NSD) */
   r->upstream->request_bufs = header_len_cl;
   return NGX_OK;
}

/* Callback for reinitializing a request to the NSD. */
static ngx_int_t ngx_http_csp_reinit_request(ngx_http_request_t *r) {
   ngx_log_debug0(NGX_LOG_DEBUG_HTTP, r->connection->log, 0, "ngx_http_csp_reinit_request called");
   return NGX_OK;
}

/* Process the HTTP status line received from the NSD. If status line is
 * processed successfully, then continue on to processing the HTTP headers.
 * 
 * Inspired by ngx_http_proxy_process_status_line() from
 * ngx_http_proxy_module.c.
 * 
 * Return value:
 *    NGX_OK: HTTP status line and headers were processed successfully
 *    NGX_AGAIN:
 *       HTTP status line and headers have not yet been fully received from the
 *       NSD
 *    NGX_HTTP_UPSTREAM_INVALID_HEADER:
 *       failed to parse headers received from the NSD
 *    NGX_ERROR: other error occurred */
static ngx_int_t ngx_http_csp_process_status_line(ngx_http_request_t *r) {
   ngx_http_csp_ctx_t *ctx = ngx_http_get_module_ctx(r, ngx_http_csp_module);
   if (!ctx) {
      return NGX_ERROR;
   }

   ngx_http_upstream_t *u = r->upstream;
   ngx_int_t rc = ngx_http_parse_status_line(r, &u->buffer, &ctx->status);

   if (rc == NGX_AGAIN) {
      /* HTTP status line has not yet been fully received */
      return rc;
   }

   if (rc == NGX_ERROR) {
      /* error parsing HTTP status line; assume HTTP 0.9 response */
      ngx_log_error(NGX_LOG_ERR, r->connection->log, 0, "NSD sent no valid HTTP/1.0 header");

      r->http_version = NGX_HTTP_VERSION_9;
      u->state->status = NGX_HTTP_OK;
      u->headers_in.connection_close = 1;

      return NGX_OK;
   }

   if (u->state && u->state->status == 0) {
      u->state->status = ctx->status.code;
   }

   u->headers_in.status_n = ctx->status.code;

   size_t len = ctx->status.end - ctx->status.start;
   u->headers_in.status_line.len = len;
   u->headers_in.status_line.data = ngx_pnalloc(r->pool, len);
   if (!u->headers_in.status_line.data) {
      return NGX_ERROR;
   }
   ngx_memcpy(u->headers_in.status_line.data, ctx->status.start, len);

   ngx_log_debug2(NGX_LOG_DEBUG_HTTP, r->connection->log, 0,
      "NSD response status: %ui \"%V\"",
      u->headers_in.status_n, &u->headers_in.status_line);

   if (ctx->status.http_version < NGX_HTTP_VERSION_11) {
      u->headers_in.connection_close = 1;
   }

   u->process_header = ngx_http_csp_process_header;
   return ngx_http_csp_process_header(r);
}

/* Process the HTTP header received from the NSD.
 * 
 * Inspired by ngx_http_proxy_process_header() from ngx_http_proxy_module.c.
 * 
 * Return value:
 *    NGX_OK: HTTP headers were processed successfully
 *    NGX_AGAIN: HTTP headers have not yet been fully received from the NSD
 *    NGX_HTTP_UPSTREAM_INVALID_HEADER: invalid header was received from the NSD
 *    NGX_ERROR: other error occurred */
static ngx_int_t ngx_http_csp_process_header(ngx_http_request_t *r) {
   ngx_http_upstream_main_conf_t *umcf = ngx_http_get_module_main_conf(r, ngx_http_upstream_module);
   ngx_http_upstream_t *u = r->upstream;

   ngx_http_csp_ctx_t *ctx = ngx_http_get_module_ctx(r, ngx_http_csp_module);
   if (!ctx) {
      return NGX_ERROR;
   }

   for ( ;; ) {
      ngx_int_t rc = ngx_http_parse_header_line(r, &u->buffer, 1);
      ngx_table_elt_t *h;

      if (rc == NGX_OK) {
         /* a header line has been parsed successfully */
         h = ngx_list_push(&u->headers_in.headers);
         if (!h) {
            return NGX_ERROR;
         }

         h->hash = r->header_hash;
         h->key.len = r->header_name_end - r->header_name_start;
         h->value.len = r->header_end - r->header_start;

         h->key.data = ngx_pnalloc(r->pool, h->key.len + 1 + h->value.len + 1 + h->key.len);
         if (!h->key.data) {
            h->hash = 0;
            return NGX_ERROR;
         }

         h->value.data = h->key.data + h->key.len + 1;
         h->lowcase_key = h->key.data + h->key.len + 1 + h->value.len + 1;

         ngx_memcpy(h->key.data, r->header_name_start, h->key.len);
         h->key.data[h->key.len] = '\0';
         ngx_memcpy(h->value.data, r->header_start, h->value.len);
         h->value.data[h->value.len] = '\0';

         if (h->key.len == r->lowcase_index) {
            ngx_memcpy(h->lowcase_key, r->lowcase_header, h->key.len);
         } else {
            ngx_strlow(h->lowcase_key, h->key.data, h->key.len);
         }

         ngx_http_upstream_header_t *hh = ngx_hash_find(&umcf->headers_in_hash, h->hash, h->lowcase_key, h->key.len);
         if (hh && hh->handler(r, h, hh->offset) != NGX_OK) {
            return NGX_ERROR;
         }

         ngx_log_debug2(NGX_LOG_DEBUG_HTTP, r->connection->log, 0,
            "Header received from NSD: \"%V: %V\"", &h->key, &h->value);

         continue;
      }

      if (rc == NGX_HTTP_PARSE_HEADER_DONE) {
         /* a whole header has been parsed successfully */
         ngx_log_debug0(NGX_LOG_DEBUG_HTTP, r->connection->log, 0,
            "NSD header parsing done");

         /* if no "Server" or "Date" in header line, add the special empty
          * headers */
         if (!u->headers_in.server) {
            h = ngx_list_push(&u->headers_in.headers);
            if (!h) {
               return NGX_ERROR;
            }
            h->hash = ngx_hash(ngx_hash(ngx_hash(ngx_hash(ngx_hash('s', 'e'), 'r'), 'v'), 'e'), 'r');
            ngx_str_set(&h->key, "Server");
            ngx_str_null(&h->value);
            h->lowcase_key = (u_char *)"server";
         }
         if (!u->headers_in.date) {
            h = ngx_list_push(&u->headers_in.headers);
            if (!h) {
               return NGX_ERROR;
            }
            h->hash = ngx_hash(ngx_hash(ngx_hash('d', 'a'), 't'), 'e');
            ngx_str_set(&h->key, "Date");
            ngx_str_null(&h->value);
            h->lowcase_key = (u_char *)"date";
         }

         /* clear content length if response is chunked */
         if (u->headers_in.chunked) {
            u->headers_in.content_length_n = -1;
         }

         /* set u->keepalive if response has no body; this allows to keep
          * connections alive for header-only responses */
         if (u->headers_in.status_n == NGX_HTTP_NO_CONTENT
               || u->headers_in.status_n == NGX_HTTP_NOT_MODIFIED
               || ctx->is_head
               || (!u->headers_in.chunked &&
                  u->headers_in.content_length_n == 0))
         {
               u->keepalive = !u->headers_in.connection_close;
         }

         /* handle protocol upgrade, typically used for WebSockets */
         if (u->headers_in.status_n == NGX_HTTP_SWITCHING_PROTOCOLS) {
            u->keepalive = 0;

            if (r->headers_in.upgrade) {
               u->upgrade = 1;
            }
         }

         return NGX_OK;
      }

      if (rc == NGX_AGAIN) {
         /* need to wait for more data from NSD before continuing header
          * parsing */
         return rc;
      }

      /* there was an error while parsing a header line */
      ngx_log_error(NGX_LOG_ERR, r->connection->log, 0, "NSD sent invalid header");

      return NGX_HTTP_UPSTREAM_INVALID_HEADER;
   }
}

/* Callback for when client aborts a request. */
static void ngx_http_csp_abort_request(ngx_http_request_t *r) {
   ngx_log_debug0(NGX_LOG_DEBUG_HTTP, r->connection->log, 0, "ngx_http_csp_abort_request called");
}

/* Callback for when request is complete. */
static void ngx_http_csp_finalize_request(ngx_http_request_t *r, ngx_int_t rc) {
   ngx_log_debug0(NGX_LOG_DEBUG_HTTP, r->connection->log, 0, "ngx_http_csp_finalize_request called");
}

/* Initialize input filter for processing response body from NSD. */
static ngx_int_t ngx_http_csp_filter_init(void *data) {
   ngx_http_request_t *r = data;
   ngx_log_debug0(NGX_LOG_DEBUG_HTTP, r->connection->log, 0, "ngx_http_csp_filter_init called");

   ngx_http_upstream_t *u = r->upstream;
   ngx_http_csp_ctx_t *ctx = ngx_http_get_module_ctx(r, ngx_http_csp_module);
   if (!ctx) {
      return NGX_ERROR;
   }

   if (u->headers_in.status_n == NGX_HTTP_NO_CONTENT
      || u->headers_in.status_n == NGX_HTTP_NOT_MODIFIED
      || ctx->is_head
      || u->headers_in.content_length_n == 0) {
      /* empty or no body */
      u->length = 0;
      u->keepalive = !u->headers_in.connection_close;
   } else if (u->headers_in.chunked) {
      /* change the filter to the chunked filter */
      ngx_log_debug0(NGX_LOG_DEBUG_HTTP, r->connection->log, 0, "ngx_http_csp_chunked_filter set");
      u->input_filter = ngx_http_csp_chunked_filter;
   } else {
      /* content length or connection close; keep default copy filter */
      u->length = u->headers_in.content_length_n;
   }

   return NGX_OK;
}

/* Input filter for processing regular (non-chunked) response body from NSD.
 * Inspired by ngx_http_proxy_non_buffered_copy_filter() from
 * ngx_http_proxy_module.c. */
static ngx_int_t ngx_http_csp_copy_filter(void *data, ssize_t bytes) {
   ngx_http_request_t *r = data;
   ngx_http_upstream_t *u = r->upstream;
   ngx_log_debug0(NGX_LOG_DEBUG_HTTP, r->connection->log, 0, "ngx_http_csp_copy_filter called");

   ngx_chain_t *cl, **ll;
   for (cl = u->out_bufs, ll = &u->out_bufs; cl; cl = cl->next) {
      ll = &cl->next;
   }

   cl = ngx_chain_get_free_buf(r->pool, &u->free_bufs);
   if (!cl) {
      return NGX_ERROR;
   }

   *ll = cl;

   cl->buf->flush = 1;
   cl->buf->memory = 1;

   ngx_buf_t *b = &u->buffer;

   cl->buf->pos = b->last;
   b->last += bytes;
   cl->buf->last = b->last;
   cl->buf->tag = u->output.tag;

   if (u->length == -1) {
      return NGX_OK;
   }

   u->length -= bytes;

   if (u->length == 0) {
      u->keepalive = !u->headers_in.connection_close;
   }

   return NGX_OK;
}

/* Input filter for processing chunked response body from NSD. Inspired by
 * ngx_http_proxy_non_buffered_chunked_filter() from ngx_http_proxy_module.c. */
static ngx_int_t ngx_http_csp_chunked_filter(void *data, ssize_t bytes) {
   ngx_http_request_t *r = data;
   ngx_log_debug0(NGX_LOG_DEBUG_HTTP, r->connection->log, 0, "ngx_http_csp_chunked_filter called");
   ngx_http_csp_ctx_t *ctx = ngx_http_get_module_ctx(r, ngx_http_csp_module);
   if (!ctx) {
      return NGX_ERROR;
   }

   ngx_http_upstream_t *u = r->upstream;
   ngx_buf_t *buf = &u->buffer;

   buf->pos = buf->last;
   buf->last += bytes;

   ngx_chain_t *cl, **ll;
   for (cl = u->out_bufs, ll = &u->out_bufs; cl; cl = cl->next) {
      ll = &cl->next;
   }

   for ( ;; ) {
      ngx_int_t rc = ngx_http_parse_chunked(r, buf, &ctx->chunked);

      if (rc == NGX_OK) {
         /* a chunk has been parsed successfully */
         cl = ngx_chain_get_free_buf(r->pool, &u->free_bufs);
         if (!cl) {
            return NGX_ERROR;
         }

         *ll = cl;
         ll = &cl->next;

         ngx_buf_t *b = cl->buf;

         b->flush = 1;
         b->memory = 1;

         b->pos = buf->pos;
         b->tag = u->output.tag;

         if (buf->last - buf->pos >= ctx->chunked.size) {
            buf->pos += (size_t)ctx->chunked.size;
            b->last = buf->pos;
            ctx->chunked.size = 0;
         } else {
            ctx->chunked.size -= buf->last - buf->pos;
            buf->pos = buf->last;
            b->last = buf->last;
         }

         continue;
      }

      if (rc == NGX_DONE) {
         /* a whole response has been parsed successfully */
         u->keepalive = !u->headers_in.connection_close;
         u->length = 0;
         break;
      }

      if (rc == NGX_AGAIN) {
         /* need to wait for more data before parsing this chunk */
         break;
      }

      /* invalid response */
      ngx_log_error(NGX_LOG_ERR, r->connection->log, 0, "NSD sent invalid chunked response");
      return NGX_ERROR;
   }

   return NGX_OK;
}

/* If `csp_file_types` is not NULL, `ext` is nonempty, and `csp_file_types`
 * contains `ext`, then return 1. Otherwise, return 0.
 * Precondition:
 *    ext is a null-terminated empty string or a file extension that is all
 *    lowercase and does not include the preceding period */
static ngx_inline int ngx_http_csp_check_file_type(const ngx_array_t *csp_file_types, const u_char *ext) {
   return csp_file_types && ext[0] &&
      (ngx_http_csp_array_contains(csp_file_types, ext) ||
       ngx_http_csp_array_contains(csp_file_types, (u_char *)"*"));
}

/* Capitalize all characters in a null-terminated string. */
static void ngx_http_csp_strup(u_char *str) {
   u_char *c;
   for (c = str; *c; c++) {
      *c = ngx_toupper(*c);
   }
}

/* Return 1 if `a` contains a string equal to `elt`, 0 otherwise.
 * Parameter a: an array of null-terminated strings
 * Parameter elt: a null-terminated string to search for */
static int ngx_http_csp_array_contains(const ngx_array_t *a, const u_char *elt) {
   const u_char **value = a->elts;
   ngx_uint_t i;
   for (i = 0; i < a->nelts; i++) {
      if (!ngx_strcmp(value[i], elt)) {
         return 1;
      }
   }
   return 0;
}

/* Append the first `i` characters of `str` to the u_char array `a`. If `i` is
 * -1, then assume `str` is null-terminated and append all its characters,
 * excluding the null terminator, to `a`. Return NGX_OK on success, NGX_ERROR if
 * memory is insufficient. */
static ngx_int_t ngx_http_csp_array_append(ngx_array_t *a, const u_char *str, ssize_t i) {
   size_t len = (i == -1) ? ngx_strlen(str) : (size_t)i;
   u_char *dest = ngx_array_push_n(a, len);
   if (!dest) {
      return NGX_ERROR;
   }
   ngx_memcpy(dest, str, len);
   return NGX_OK;
}

/* Copy the null-terminated string `str` to the u_char array `a`. The null
 * terminator is included when copying. Return NGX_OK on success, NGX_ERROR if
 * memory is insufficient. */
static ngx_int_t ngx_http_csp_array_set(ngx_array_t *a, const u_char *str) {
   size_t nelts_needed = ngx_strlen(str) + 1;
   if (nelts_needed > a->nelts) {
      if (!ngx_array_push_n(a, nelts_needed - a->nelts)) {
         return NGX_ERROR;
      }
   }
   ngx_memcpy(a->elts, str, nelts_needed);
   return NGX_OK;
}
