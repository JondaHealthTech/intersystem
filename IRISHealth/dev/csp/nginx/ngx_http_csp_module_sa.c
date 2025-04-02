/* 
   Chris Munt: Interface between an Nginx web server and the Universal CSP Gateway Modules.
               CSPx.dll/so CSPxSys.dll/so

   Cache Server Pages:

      +--------------------------------------------------------+
      | Copyright 1986-2018 by InterSystems Corporation,       |
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

#if !defined(_WIN32)
#include <pthread.h>
#endif

#include "cspapi.h"
#include "ngx_http_csp_common.h"

/*
#define CSP_API_TRACE               1
*/

#define CSP_MODULE_TYPE_SHORT       "ngxapi"
#define CSP_MODULE_TYPE_LONG        "Nginx_Module"

#define CSP_MODULE_BUILD            21
#define CSP_ADHOC_BUILD             0
#define CSP_MODULE_VERSION          "1.1.21"

#define CSP_DEFAULT_AP_TIMEOUT      300000

#define CACHE_MAXSIZE               32767
#define CACHE_BUFFER                32768
/*
#define CSP_WEBSOCKET_TEST          1
*/

#if defined(CSP_WEBSOCKET_TEST)

#define CSP_WS_BLOCK_DATA_SIZE              4096

#define CSP_WS_DATA_FRAMING_MASK               0
#define CSP_WS_DATA_FRAMING_START              1
#define CSP_WS_DATA_FRAMING_PAYLOAD_LENGTH     2
#define CSP_WS_DATA_FRAMING_PAYLOAD_LENGTH_EXT 3
#define CSP_WS_DATA_FRAMING_EXTENSION_DATA     4
#define CSP_WS_DATA_FRAMING_APPLICATION_DATA   5
#define CSP_WS_DATA_FRAMING_CLOSE              6

#define CSP_WS_FRAME_GET_FIN(BYTE)         (((BYTE) >> 7) & 0x01)
#define CSP_WS_FRAME_GET_RSV1(BYTE)        (((BYTE) >> 6) & 0x01)
#define CSP_WS_FRAME_GET_RSV2(BYTE)        (((BYTE) >> 5) & 0x01)
#define CSP_WS_FRAME_GET_RSV3(BYTE)        (((BYTE) >> 4) & 0x01)
#define CSP_WS_FRAME_GET_OPCODE(BYTE)      ( (BYTE)       & 0x0F)
#define CSP_WS_FRAME_GET_MASK(BYTE)        (((BYTE) >> 7) & 0x01)
#define CSP_WS_FRAME_GET_PAYLOAD_LEN(BYTE) ( (BYTE)       & 0x7F)

#define CSP_WS_FRAME_SET_FIN(BYTE)         (((BYTE) & 0x01) << 7)
#define CSP_WS_FRAME_SET_OPCODE(BYTE)       ((BYTE) & 0x0F)
#define CSP_WS_FRAME_SET_MASK(BYTE)        (((BYTE) & 0x01) << 7)
#define CSP_WS_FRAME_SET_LENGTH(X64, IDX)  (unsigned char)(((X64) >> ((IDX)*8)) & 0xFF)

#define CSP_WS_OPCODE_CONTINUATION 0x0
#define CSP_WS_OPCODE_TEXT         0x1
#define CSP_WS_OPCODE_BINARY       0x2
#define CSP_WS_OPCODE_CLOSE        0x8
#define CSP_WS_OPCODE_PING         0x9
#define CSP_WS_OPCODE_PONG         0xA

#define CSP_WS_WEBSOCKET_GUID "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
#define CSP_WS_WEBSOCKET_GUID_LEN 36

#define CSP_WS_STATUS_CODE_OK                1000
#define CSP_WS_STATUS_CODE_GOING_AWAY        1001
#define CSP_WS_STATUS_CODE_PROTOCOL_ERROR    1002
#define CSP_WS_STATUS_CODE_RESERVED          1004 /* Protocol 8: frame too large */
#define CSP_WS_STATUS_CODE_INVALID_UTF8      1007
#define CSP_WS_STATUS_CODE_POLICY_VIOLATION  1008
#define CSP_WS_STATUS_CODE_MESSAGE_TOO_LARGE 1009
#define CSP_WS_STATUS_CODE_INTERNAL_ERROR    1011

#define CSP_WS_MESSAGE_TYPE_INVALID  -1
#define CSP_WS_MESSAGE_TYPE_TEXT      0
#define CSP_WS_MESSAGE_TYPE_BINARY  128
#define CSP_WS_MESSAGE_TYPE_CLOSE   255
#define CSP_WS_MESSAGE_TYPE_PING    256
#define CSP_WS_MESSAGE_TYPE_PONG    257

#endif /* #if defined(CSP_WEBSOCKET_TEST) */


/* Operating System type */

#if defined(_WIN32) /* Windows */

#ifndef CSP_WIN32
#define CSP_WIN32                   1
#endif

#define CSP_MODULE_NAME             "CSPx.dll"
#define CSP_LOG_FILE                "C:/TEMP/nginx_csp.log"

#else /* UNIX */

#ifndef CSP_UNIX
#define CSP_UNIX                    1
#endif

#define CSP_MODULE_NAME             "CSPx.so"
#define CSP_LOG_FILE                "/tmp/nginx_csp.log"
#define CSP_UNIX_DSO_DLFCN          1

#endif


#if defined(CSP_UNIX)

#if defined(CSP_UNIX_DSO_DLFCN)
#include <dlfcn.h>         /* defines dlopen(), etc.       */
#else
#include <dl.h>            /* defines shl_load(), etc.     */
#endif

#if defined(CSP_UNIX_DSO_DLFCN)
typedef void            * CSPHLIB;
#else
typedef shl_t           CSPHLIB;
#endif /* #ifdef CSP_UNIX_DSO_DLFCN */
typedef void            * CSPPROC;

#else /* Windows */

typedef HINSTANCE       CSPHLIB;
typedef FARPROC         CSPPROC;

#endif /* #if defined(CSP_UNIX) */


typedef struct {
   int n;
   char    csp_module_path[256];
} ngx_http_csp_main_conf_t;

typedef struct {
   int n;
   char    csp_module_path[256];
} ngx_http_csp_server_conf_t;

typedef struct {
   short   csp_enabled;
   char    csp_file_types[128];
   char    csp_module_path[256];
} ngx_http_csp_loc_conf_t;


typedef struct tagCSPIFC {
   short    context;
   short    defined;
   void     *p1;
   void     *p2;
   void     *p3;
} CSPIFC, *LPCSPIFC;


typedef struct tagMEMOBJ {
   int      size;
   int      curr_size;
   int      incr_size;
   char *   lp_buffer;
} MEMOBJ, *LPMEMOBJ;

typedef struct tagCSPGWDSO {
   short                      gwdso;
   short                      load_attempted;
   CSPHLIB                    h_gwdso;
   LPFN_CSP_X_VERSION         p_csp_x_version;
   LPFN_CSP_X_REQ_HANDLER     p_csp_x_req_handler;
   LPFN_CSP_X_SERVER_VARIABLE p_csp_x_server_variable;
   LPFN_CSP_X_SYS_STARTUP     p_csp_x_sys_startup;
   LPFN_CSP_X_SYS_CLOSEDOWN   p_csp_x_sys_closedown;
   LPFN_CSP_X_WRK_STARTUP     p_csp_x_wrk_startup;
   LPFN_CSP_X_WRK_CLOSEDOWN   p_csp_x_wrk_closedown;
   LPFN_CSP_X_SHA1            p_csp_x_sha1;
   LPFN_CSP_X_B64_ENCODE      p_csp_x_b64_encode;
   LPFN_CSP_X_B64_DECODE      p_csp_x_b64_decode;
   LPFN_CSP_X_UTF8_DATA       p_csp_x_utf8_data;
   CSPXGWVERS                 gwvers;
} CSPGWDSO, *LPCSPGWDSO;

/* CMT1515 */
CSPGWDSO cspgwdso = {0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, {0, 0, 0, "\0", "\0"}};
CSPXSYS cspxsys;
CSPXWRK cspxwrk;

/* Mutex for use with Nginx library functions that are not thread-safe. */
csp_mutex_t csp_nginx_mutex;
int csp_nginx_mutex_created = 0;

const char *cgi_vars[] = { "CSP_MODULE_TYPE",
                           "CSP_MODULE_BUILD",
                           "REQUEST_METHOD",
                           "SCRIPT_NAME",
                           "QUERY_STRING",
                           "SERVER_PROTOCOL",
                           "SERVER_SOFTWARE",
                           "REMOTE_ADDR",
                           "REMOTE_PORT", /* CMT1556 */
                           "REMOTE_HOST",
                           "PATH_TRANSLATED",
                           NULL
                        };

#if defined(CSP_WEBSOCKET_TEST)

typedef unsigned long long    csp_uint64_t;
typedef long long             csp_int64_t;

typedef void *                LPDSYS;

typedef struct tagCSPHTTPD {
   unsigned char  context;
   LPMEMOBJ       lp_request;
   LPMEMOBJ       lp_response;
} CSPHTTPD, *LPCSPHTTPD;


typedef struct tagCSPWS {
   short                status;
   short                nocframe;
   short                binary;
   short                closed;
   int                  closing;
   short                shared;
   short                wsclass_protocol_version;
   csp_int64_t          protocol_version;
   int                  shndle;
   LPDSYS               lp_dsys;
   char                 websocket_id[256];
} CSPWS, *LPCSPWS;


typedef struct tagCSPWSFD {
   csp_uint64_t      application_data_offset;
   unsigned char *   application_data;
   unsigned char     fin;
   unsigned char     opcode;
   unsigned int      utf8_state;
} CSPWSFD, *LPCSPWSFD;


#endif /* #if defined(CSP_WEBSOCKET_TEST) */


typedef struct tagRCB {
   char                       error[256];
   ngx_http_request_t         *r;
   ngx_http_csp_main_conf_t   *mconf;
   ngx_http_csp_server_conf_t *sconf;
   ngx_http_csp_loc_conf_t    *dconf;
   char                       file[64];
   FILE                       *fp;

   LPMEMOBJ                   lp_cgievar;
#ifndef CSP_AOD052
   LPMEMOBJ                   lp_responsedata;
#endif
   LPMEMOBJ                   lp_requestdata;
   MEMOBJ                     requestdata;
   int                        requestdata_ptr;

   int                        status;

   short                      soap;
   short                      chunked;
   short                      request_chunked;
   short                      request_header_sent;
   short                      request_chunk_no;
   short                      ws_headers;
   short                      context;
   unsigned long              clen;
   unsigned long              rlen;

   unsigned long              ap_timeout;

   CSPXREQ                    *p_cspxreq;
   CSPGWDSO                   *p_cspgwdso;

#if defined(CSP_WEBSOCKET_TEST)
   LPCSPHTTPD     lp_httpd;
   CSPWS * p_websocket;
   unsigned char websocket_upgrade;
#endif

} RCB, *LPRCB;


typedef struct {
   unsigned int              done; /* CMT1220 */
   unsigned int              waiting_more_body; /* CMT1220 */
#ifdef CSP_AOD052
   csp_client_write_state_t  client_write_state;
#endif
   RCB                       *pRCB;
} ngx_http_csp_ctx_t;

/* CMT1472 */
#define CSP_ASYNC_T              0
#define CSP_ASYNC_TP_MUTEX       1
#define CSP_ASYNC_TP_SIGNAL      2
#define CSP_ASYNC_NODE           3
#define CSP_ASYNC_SYNC           4

typedef struct tagCSPFUN {
   short                context;
   short                detach;
   short                async_mode;
   ngx_http_request_t   *r;
   ngx_http_csp_ctx_t   *f;
} CSPFUN, *PCSPFUN;


struct sys_pool_task {
#if !defined(_WIN32)
   pthread_t   parent_tid;
#endif
   int         task_id;
   CSPFUN      *pc_fun;
   struct sys_pool_task *next;
};




static long                   request_no        = 0;

#ifdef _WIN32
static WORD VersionRequested;
#define CSP_GET_LAST_ERROR CSPNET_WSAGETLASTERROR()
#else
extern int errno;
#define CSP_GET_LAST_ERROR errno
#endif


static char *     ngx_http_conf_csp_sa                (ngx_conf_t *cf, ngx_command_t *cmd, void *conf);
static char *     ngx_http_conf_cspfiletypes_sa       (ngx_conf_t *cf, ngx_command_t *cmd, void *conf);
static char *     ngx_http_conf_cspmodulepath_sa      (ngx_conf_t *cf, ngx_command_t *cmd, void *conf);
static ngx_int_t  ngx_http_csp_pre_config_sa          (ngx_conf_t *cf);
static ngx_int_t  ngx_http_csp_post_config_sa         (ngx_conf_t *cf);
static void *     ngx_http_csp_create_main_conf_sa    (ngx_conf_t *cf);
char *            ngx_http_csp_init_main_conf_sa      (ngx_conf_t *cf, void *conf);
static void *     ngx_http_csp_create_server_conf_sa  (ngx_conf_t *cf);
static char *     ngx_http_csp_merge_server_conf_sa   (ngx_conf_t *cf, void *parent, void *child);
static void *     ngx_http_csp_create_loc_conf_sa     (ngx_conf_t *cf);
static char *     ngx_http_csp_merge_loc_conf_sa      (ngx_conf_t *cf, void *parent, void *child);
ngx_int_t         ngx_csp_init_master                 (ngx_log_t *log);
void              ngx_csp_exit_master                 (ngx_cycle_t *cycle);
ngx_int_t         ngx_csp_init_module                 (ngx_cycle_t *cycle);
ngx_int_t         ngx_csp_init_process                (ngx_cycle_t *cycle);
void              ngx_csp_exit_process                (ngx_cycle_t *cycle);
ngx_int_t         ngx_csp_init_thread                 (ngx_cycle_t *cycle);
void              ngx_csp_exit_thread                 (ngx_cycle_t *cycle);
static void       ngx_http_payload_handler_sa         (ngx_http_request_t *r);
static int        ngx_http_exec_sa                    (ngx_http_request_t *r, ngx_http_csp_ctx_t *f);
static ngx_int_t  ngx_http_csp_handler_sa             (ngx_http_request_t *r);
#ifdef CSP_AOD052
static void       ngx_http_csp_writer_sa              (ngx_http_request_t *r);
#endif

int               cspCheckFileType                    (char *csp_file_types_main, char *csp_file_types_server, char *csp_file_types_loc, char *type);
int               cspMemInit                          (RCB *pRCB, LPMEMOBJ lp_mem_obj, int size, int incr_size);
int               cspMemFree                          (RCB *pRCB, LPMEMOBJ lp_mem_obj);
int               cspMemCpy                           (RCB *pRCB, LPMEMOBJ lp_mem_obj, char *buffer, int buffer_len);
int               cspMemCat                           (RCB *pRCB, LPMEMOBJ lp_mem_obj, char *buffer, int buffer_len);
int               cspUCase                            (char *string);
int               cspLCase                            (char *string);
int               cspReturnError                      (RCB *pRCB, LPMEMOBJ lp_responsedata, char *error);
int               cspLogBuffer                        (unsigned char *buffer, unsigned long buffer_len, char *title);
int               cspLogEvent                         (char *message, char *title);

int               cspWriteString                      (RCB *pRCB, char *buffer, short context);

/* Exported Functions */
int               cspReadBuffer                       (struct tagCSPXREQ * p_cspxreq, unsigned char * buffer, int buffer_size);
int               cspWriteBuffer                      (struct tagCSPXREQ * p_cspxreq, unsigned char * buffer, int buffer_size);
int               cspSendResponseHeader               (struct tagCSPXREQ * p_cspxreq, char * header);
int               cspGetServerVariables               (struct tagCSPXREQ * p_cspxreq);
/* Exported WebSocket Functions */
int               cspWSStart                          (struct tagCSPXREQ * p_cspxreq);
int               cspWSReadBuffer                     (struct tagCSPXREQ * p_cspxreq, unsigned char * buffer, int buffer_size);
int               cspWSWriteBuffer                    (struct tagCSPXREQ * p_cspxreq, const unsigned char *buffer, int buffer_size);
int               cspWSEnd                            (struct tagCSPXREQ * p_cspxreq);
/* End of Exported Functions */

int               cspGetServerVariable                (RCB *pRCB, char *VariableName, LPMEMOBJ lp_cgievar, short context);
int               cspGetReqVars                       (RCB *pRCB, LPMEMOBJ lp_cgievar);
int               cspLoadGWDSO                        (char *module_path, char * error, int error_size, int context);
int               cspUnloadGWDSO                      (int context);
CSPHLIB           cspDSOload                          (char *library, char * error, int error_size);
CSPPROC           cspDSOsym                           (CSPHLIB h_library, char * symbol);
int               cspDSOunload                        (CSPHLIB h_library);
int               cspLaunchThread                     (CSPFUN *pc_fun);
#if defined(_WIN32)
DWORD WINAPI      cspThreadMain                       (LPVOID pargs);
#else
void *            cspThreadMain                       (void *pargs);
#endif

#if defined(CSP_WEBSOCKET_TEST)
int               cspWS                               (RCB *pRCB);
int               cspWSTestRequest                    (RCB *pRCB, LPMEMOBJ lp_cgievar);
size_t            cspWSClientSendBlock                (RCB *pRCB, const int type, unsigned char *buffer, const size_t buffer_size, short context);
size_t            cspWSReadClientBlock                (RCB *pRCB, char *buffer, size_t bufsiz, size_t *remaining_length);
void              cspWSDataFraming                    (RCB *pRCB);
#endif /* #if defined(CSP_WEBSOCKET_TEST) */


static ngx_http_module_t  ngx_http_csp_module_ctx_sa = {
   ngx_http_csp_pre_config_sa,              /* preconfiguration */
   ngx_http_csp_post_config_sa,             /* postconfiguration */

   ngx_http_csp_create_main_conf_sa,        /* create main configuration */
   ngx_http_csp_init_main_conf_sa,          /* init main configuration */

   ngx_http_csp_create_server_conf_sa,      /* create server configuration */
   ngx_http_csp_merge_server_conf_sa,       /* merge server configuration */

   ngx_http_csp_create_loc_conf_sa,         /* create location configuration */
   ngx_http_csp_merge_loc_conf_sa           /* merge location configuration */
};

ngx_module_t  ngx_http_csp_module_sa;

static ngx_command_t ngx_http_csp_commands_sa[] = {
   {
      ngx_string("CSP"),
      NGX_HTTP_LOC_CONF|NGX_HTTP_LIF_CONF|NGX_CONF_TAKE1,
      ngx_http_conf_csp_sa,
      NGX_HTTP_LOC_CONF_OFFSET,
      0,
      NULL
   },

   {
      ngx_string("CSPFileTypes"),
      NGX_HTTP_LOC_CONF|NGX_HTTP_LIF_CONF|NGX_CONF_ANY,
      ngx_http_conf_cspfiletypes_sa,
      NGX_HTTP_LOC_CONF_OFFSET,
      0,
      NULL
   },

   {
      ngx_string("CSPModulePath"),
      NGX_HTTP_MAIN_CONF|NGX_CONF_ANY,
      ngx_http_conf_cspmodulepath_sa,
      NGX_HTTP_MAIN_CONF_OFFSET,
      0,
      NULL
   },
};


ngx_module_t  ngx_http_csp_module_sa = {
   NGX_MODULE_V1,
   &ngx_http_csp_module_ctx_sa,  /* module context */
   ngx_http_csp_commands_sa,     /* module directives */
   NGX_HTTP_MODULE,              /* module type */
   ngx_csp_init_master,          /* init master */
   ngx_csp_init_module,          /* init module */
   ngx_csp_init_process,         /* init process */
   ngx_csp_init_thread,          /* init thread */
   ngx_csp_exit_thread,          /* exit thread */
   ngx_csp_exit_process,         /* exit process */
   ngx_csp_exit_master,          /* exit master */
   NGX_MODULE_V1_PADDING
};

static char * ngx_http_conf_csp_sa(ngx_conf_t *cf, ngx_command_t *cmd, void *conf)
{
   char *p;
   char buffer[256];
   ngx_str_t *value;
   ngx_http_csp_loc_conf_t *dconf = conf;
   ngx_http_core_loc_conf_t  *clcf;

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_conf_csp_sa");
#endif

   value = cf->args->elts;

   p = (char *) value[1].data;

   dconf->csp_enabled = 0;
   if (p) {
      strcpy(buffer, p);
      cspLCase(buffer);
      if (!strcmp(buffer, "on")) {
         dconf->csp_enabled = 1;
      }
   }

   clcf = ngx_http_conf_get_module_loc_conf(cf, ngx_http_core_module);
   clcf->handler = ngx_http_csp_handler_sa;

   return NGX_CONF_OK;
}


static char * ngx_http_conf_cspfiletypes_sa(ngx_conf_t *cf, ngx_command_t *cmd, void *conf)
{
   int n, len;
   char *p;
   char buffer[256];
   ngx_str_t *value;
   ngx_http_csp_loc_conf_t *dconf = conf;
   ngx_http_core_loc_conf_t  *clcf;

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_conf_cspfiletypes_sa");
#endif

   value = cf->args->elts;

   dconf->csp_file_types[0] = '\0';
   for (n = 1; ; n ++) {
      p = (char *) value[n].data;
      if (!p) {
         break;
      }

#if defined(CSP_API_TRACE)
      cspLogEvent(p, "ngx_http_conf_cspfiletypes : value");
#endif

      strcpy(buffer, p);
      cspLCase(buffer);
      len = strlen(buffer);
      if (len) {
         if (buffer[0] != '.') {
            strcat(dconf->csp_file_types, ".");
         }
         strcat(dconf->csp_file_types, buffer);
      }
   }
   if (dconf->csp_file_types[0]) {
      strcat(dconf->csp_file_types, ".");
   }

   clcf = ngx_http_conf_get_module_loc_conf(cf, ngx_http_core_module);
   clcf->handler = ngx_http_csp_handler_sa;

   return NGX_CONF_OK;
}


static char * ngx_http_conf_cspmodulepath_sa(ngx_conf_t *cf, ngx_command_t *cmd, void *conf)
{
   char *p;
   ngx_str_t *value;
   ngx_http_csp_main_conf_t *dconf = conf;
   ngx_http_core_loc_conf_t  *clcf;

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_conf_cspmodulepath_sa");
#endif

   value = cf->args->elts;

   p = (char *) value[1].data;

   dconf->csp_module_path[0] = '\0';
   if (p) {

#if defined(CSP_API_TRACE)
      cspLogEvent(p, "ngx_http_conf_cspmodulepath_sa : value");
#endif

      strcpy(dconf->csp_module_path, p);
   }

   clcf = ngx_http_conf_get_module_loc_conf(cf, ngx_http_core_module);
   clcf->handler = ngx_http_csp_handler_sa;

   return NGX_CONF_OK;
}


static ngx_int_t ngx_http_csp_pre_config_sa(ngx_conf_t *cf)
{

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_csp_pre_config_sa");
#endif

   return NGX_OK;
}


static ngx_int_t ngx_http_csp_post_config_sa(ngx_conf_t *cf)
{
   ngx_http_handler_pt *h;
   ngx_http_core_main_conf_t *cmcf;

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_csp_post_config_sa");
#endif

   cmcf = ngx_http_conf_get_module_main_conf(cf, ngx_http_core_module);

   h = ngx_array_push(&cmcf->phases[NGX_HTTP_CONTENT_PHASE].handlers);
   if (h == NULL) {
      return NGX_ERROR;
   }

   *h = ngx_http_csp_handler_sa;

   return NGX_OK;
}


static void * ngx_http_csp_create_main_conf_sa(ngx_conf_t *cf)
{
   ngx_http_csp_main_conf_t *conf;

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_csp_create_main_conf_sa");
#endif

   conf = ngx_pcalloc(cf->pool, sizeof(ngx_http_csp_main_conf_t));
   if (conf == NULL) {
      return NGX_CONF_ERROR;
   }

   conf->csp_module_path[0] = '\0';

   return conf;
}


char * ngx_http_csp_init_main_conf_sa(ngx_conf_t *cf, void *conf)
{
   ngx_http_csp_main_conf_t *main_conf = conf;

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_csp_init_main_conf_sa");
#endif

   main_conf->n = 0;

   return NGX_CONF_OK;
}


static void * ngx_http_csp_create_server_conf_sa(ngx_conf_t *cf)
{
   ngx_http_csp_server_conf_t *conf;

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_csp_create_server_conf_sa");
#endif

   conf = ngx_pcalloc(cf->pool, sizeof(ngx_http_csp_server_conf_t));
   if (conf == NULL) {
      return NGX_CONF_ERROR;
   }

   conf->csp_module_path[0] = '\0';

   return conf;
}


static char * ngx_http_csp_merge_server_conf_sa(ngx_conf_t *cf, void *parent, void *child)
{
   ngx_http_csp_server_conf_t *prev = parent;
   ngx_http_csp_server_conf_t *conf = child;

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_csp_merge_server_conf_sa");
#endif

   prev->n = 0;
   conf->n = 0;

   return NGX_CONF_OK;
}



static void * ngx_http_csp_create_loc_conf_sa(ngx_conf_t *cf)
{
   ngx_http_csp_loc_conf_t *conf;

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_csp_create_loc_conf_sa");
#endif

   conf = ngx_pcalloc(cf->pool, sizeof(ngx_http_csp_loc_conf_t));
   if (conf == NULL) {
      return NGX_CONF_ERROR;
   }
   conf->csp_enabled = 0;
   conf->csp_file_types[0] = '\0';
   conf->csp_module_path[0] = '\0';

   return conf;
}


static char * ngx_http_csp_merge_loc_conf_sa(ngx_conf_t *cf, void *parent, void *child)
{
#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_csp_merge_loc_conf_sa");
#endif

    return NGX_CONF_OK;
}


ngx_int_t ngx_csp_init_master(ngx_log_t *log)
{
#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_csp_init_master");
#endif

   return NGX_OK;
}

void ngx_csp_exit_master(ngx_cycle_t *cycle)
{
#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_csp_exit_master");
#endif

   /* CMT1687 */
#if defined(_WIN32)
#else
   if (cspgwdso.gwdso) { /* CMT1254 */
      cspgwdso.p_csp_x_sys_closedown(&cspxsys);
   }
   cspUnloadGWDSO(0);
#endif

   return;
}

ngx_int_t ngx_csp_init_module(ngx_cycle_t *cycle)
{
   /* CMT1687 */
#if defined(_WIN32)

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_csp_init_module");
#endif

#else

   int rc;
   char error[1024];
   ngx_http_csp_main_conf_t  *pmain;

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_csp_init_module");
#endif

   *error = '\0';

   cspxsys.api_level = CSP_UNIVERSAL_API_LEVEL; /* CMT1515 */

   pmain = (ngx_http_csp_main_conf_t *) ngx_http_cycle_get_module_main_conf(cycle, ngx_http_csp_module_sa);

   if (pmain) {
#if defined(CSP_API_TRACE)
      cspLogEvent(pmain->csp_module_path, "ngx_csp_init_process : load modules");
#endif
      strcpy(cspxsys.module_path, pmain->csp_module_path);
   }

   /* CMT1522 */
   rc = cspLoadGWDSO(cspxsys.module_path, error, 1024, 0);
   if (!rc) {
      if (!error[0]) {
         sprintf(error, "Error loading Gateway Library from this location: %s (check the 'CSPModulePath' directive in nginx.conf)", cspxsys.module_path);
      }
      ngx_log_error(NGX_LOG_ERR, cycle->log, 0, error);
      goto ngx_csp_init_module_exit;
   }

   cspxsys.mod_build = CSP_MODULE_BUILD;
   strcpy(cspxsys.mod_type_short, CSP_MODULE_TYPE_SHORT);
   strcpy(cspxsys.mod_type_long, CSP_MODULE_TYPE_LONG);
   cspxsys.server_port = 80;

   if (cspgwdso.gwdso) { /* CMT1254 */
      cspgwdso.p_csp_x_sys_startup(&cspxsys);
   }
   else {
      ngx_log_error(NGX_LOG_ERR, cycle->log, 0, "Error loading Gateway Library from this location: %s (check the 'CSPModulePath' directive in nginx.conf)", cspxsys.module_path);
   }

   /* CMT1515 */
   if (cspxsys.api_level != cspgwdso.gwvers.api_level) {
      char buffer[256];
      sprintf(buffer, "API not compatible between the 'ngx_http_csp_module_sa' module and 'CSPx.so' (ngx_http_csp_module_sa=%d; CSPx=%d)", cspxsys.api_level, cspgwdso.gwvers.api_level);
      ngx_log_error(NGX_LOG_ERR, cycle->log, 0, buffer);
   }

   cspxwrk.p_cspxsys = &cspxsys;

ngx_csp_init_module_exit:

#endif

   return NGX_OK;
}


ngx_int_t ngx_csp_init_process(ngx_cycle_t *cycle)
{
   ngx_int_t result = NGX_OK;
   /* CMT1687 */
#if defined(_WIN32)
   int rc;
   char error[1024];
   ngx_http_csp_main_conf_t  *pmain;

   *error = '\0';

   cspxsys.api_level = CSP_UNIVERSAL_API_LEVEL; /* CMT1515 */

   pmain = (ngx_http_csp_main_conf_t *) ngx_http_cycle_get_module_main_conf(cycle, ngx_http_csp_module_sa);

   if (pmain) {
#if defined(CSP_API_TRACE)
      cspLogEvent(pmain->csp_module_path, "ngx_csp_init_process : load modules");
#endif
      strcpy(cspxsys.module_path, pmain->csp_module_path);
   }
   
   if (cspMutexCreate(&csp_nginx_mutex) == 0) {
      csp_nginx_mutex_created = 1;
   } else {
      ngx_log_error(NGX_LOG_ERR, cycle->log, 0, "Unable to create mutex for synchronizing Nginx library calls.");
      result = NGX_ERROR;
      goto ngx_csp_init_process_exit;
   }

   /* CMT1522 */
   rc = cspLoadGWDSO(cspxsys.module_path, error, 1024, 0);
   if (!rc) {
      if (!error[0]) {
         sprintf(error, "Error loading Gateway Library from this location: %s (check the 'CSPModulePath' directive in nginx.conf)", cspxsys.module_path);
      }
      ngx_log_error(NGX_LOG_ERR, cycle->log, 0, error);
      goto ngx_csp_init_process_exit;
   }

   cspxsys.mod_build = CSP_MODULE_BUILD;
   strcpy(cspxsys.mod_type_short, CSP_MODULE_TYPE_SHORT);
   strcpy(cspxsys.mod_type_long, CSP_MODULE_TYPE_LONG);
   cspxsys.server_port = 80;

   if (cspgwdso.gwdso) { /* CMT1254 */
      cspgwdso.p_csp_x_sys_startup(&cspxsys);
   }
   else {
      ngx_log_error(NGX_LOG_ERR, cycle->log, 0, "Error loading Gateway Library from this location: %s (check the 'CSPModulePath' directive in nginx.conf)", cspxsys.module_path);
   }

   /* CMT1515 */
   if (cspxsys.api_level != cspgwdso.gwvers.api_level) {
      char buffer[256];
      sprintf(buffer, "API not compatible between the 'ngx_http_csp_module_sa' module and 'CSPx.so' (ngx_http_csp_module_sa=%d; CSPx=%d)", cspxsys.api_level, cspgwdso.gwvers.api_level);
      ngx_log_error(NGX_LOG_ERR, cycle->log, 0, buffer);
   }

   cspxwrk.p_cspxsys = &cspxsys;

   if (cspgwdso.gwdso) { /* CMT1254 */
      cspgwdso.p_csp_x_wrk_startup(&cspxwrk);
   }

ngx_csp_init_process_exit:

#else

#if defined(CSP_API_TRACE)
   char buffer[256];

   sprintf(buffer, "mod_build=%d; mod_type_short=%s; mod_type_short=%s;", cspxsys.mod_build, cspxsys.mod_type_short, cspxsys.mod_type_long);
   cspLogEvent(buffer, "ngx_csp_init_process : parameters");
#endif

   if (cspgwdso.gwdso) { /* CMT1254 */
      cspgwdso.p_csp_x_wrk_startup(&cspxwrk);
   }

#endif


#if defined(CSP_API_TRACE)
   cspLogEvent("ngx_csp_init_process : DONE", "ngx_csp_init_process");
#endif

   return result;
}


void ngx_csp_exit_process(ngx_cycle_t *cycle)
{
#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_csp_exit_process");
#endif

   /* CMT1687 */
#if defined(_WIN32)
   if (cspgwdso.gwdso) { /* CMT1254 */
      cspgwdso.p_csp_x_wrk_closedown(&cspxwrk);
      cspgwdso.p_csp_x_sys_closedown(&cspxsys);
   }
   cspUnloadGWDSO(0);
#else
   if (cspgwdso.gwdso) { /* CMT1254 */
      cspgwdso.p_csp_x_wrk_closedown(&cspxwrk);
   }
#endif

   if (csp_nginx_mutex_created) {
      cspMutexDestroy(&csp_nginx_mutex);
   }
   return;
}

ngx_int_t ngx_csp_init_thread(ngx_cycle_t *cycle)
{
#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_csp_init_thread");
#endif

   return NGX_OK;
}

void ngx_csp_exit_thread(ngx_cycle_t *cycle)
{
#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_csp_exit_thread");
#endif

   return;
}



static void ngx_http_payload_handler_sa(ngx_http_request_t *r)
{
   int rc;
   int clen;
   size_t len;
   ngx_buf_t *buf;
   ngx_chain_t *cl;
   size_t total;
   ngx_http_csp_ctx_t *f;
   CSPFUN *pc_fun;

   f = ngx_http_get_module_ctx(r, ngx_http_csp_module_sa);

   /* CMT1220 CMT1252 : Waiting_more_body : rewrite phase handler */
   if (f->waiting_more_body) {
      f->waiting_more_body = 0;
      ngx_http_core_run_phases(r);
      return;
   }


   total = 0;
   cl = r->request_body->bufs;
   clen = (int) f->pRCB->clen;

   if (r->request_body->temp_file) { /* CMT1253 */
      size_t offset = 0;
      unsigned char data[4096];

      f->pRCB->p_cspxreq->info = CSP_REQ_INFO_TEMPFILE;

      while ((len = ngx_read_file(&r->request_body->temp_file->file, data, 4096, offset)) > 0) {
         cspMemCat(f->pRCB, f->pRCB->lp_requestdata, (char *) data, len);
         offset = offset + len;
      }
   }
   else {
      while (cl) {
         buf = cl->buf;

         if (buf->pos) {
            len = (int) (buf->last - buf->pos);

            if (len == 0) {
               len = clen;
               cspMemCat(f->pRCB, f->pRCB->lp_requestdata, (char *) buf->start, len);
               total += len;
/*
               {
                  char *buffer;
                  buffer = (char *) malloc(sizeof(char) * (len + 1));
                  if (buffer) {
                     strncpy(buffer, (char *) buf->start, len);
                     buffer[len] = '\0';
                     cspLogEvent(buffer, "ngx_http_payload_handler_sa : Read a buffer from chain : Content A");
                     free((void *) buffer);
                  }
               }
*/
            }
            else {

               cspMemCat(f->pRCB, f->pRCB->lp_requestdata, (char *) buf->pos, len);
               total += len;
/*
               {
                  char *buffer;
                  buffer = (char *) malloc(sizeof(char) * (len + 1));
                  if (buffer) {
                     strncpy(buffer, (char *) buf->pos, len);
                     buffer[len] = '\0';
                     cspLogEvent(buffer, "ngx_http_payload_handler_sa : Read a buffer from chain : Content B");
                     free((void *) buffer);
                  }
               }
*/
            }
         }
         cl = cl->next;
      }
   }

   /* CMT1472 */
   pc_fun = ngx_pcalloc(r->pool, sizeof(CSPFUN));
   pc_fun->context = 0;
   pc_fun->detach = 1;
   pc_fun->async_mode = CSP_ASYNC_T;
   pc_fun->r = r;
   pc_fun->f = f;

   rc = cspLaunchThread(pc_fun);
   if (!rc) {
      return;
   }

#if defined(CSP_API_TRACE)
   cspLogEvent("DONE", "ngx_http_payload_handler_sa");
#endif

   return;
}


/* CMT1472
 * This function can be called by multiple threads. Nginx library functions are usually not thread-safe,
 * so every call to an Nginx library function must be protected by a mutex. */
static int ngx_http_exec_sa(ngx_http_request_t *r, ngx_http_csp_ctx_t *f)
{
#if defined(CSP_WEBSOCKET_TEST)
   int upgrade_connection;
#endif

   /* CMT1517 */

#if defined(CSP_WEBSOCKET_TEST)
   upgrade_connection = cspWSTestRequest(f->pRCB, f->pRCB->lp_cgievar);
   if (upgrade_connection) {
      rc = cspWS(f->pRCB);
      if (!rc) {
         cspMutexAcquire(&csp_nginx_mutex);
         ngx_log_error(NGX_LOG_ERR, r->connection->log, 0, "Failed to initialize a WebSocket session.");
         ngx_http_finalize_request(f->pRCB->r, NGX_HTTP_INTERNAL_SERVER_ERROR);
         cspMutexRelease(&csp_nginx_mutex);
      }
      return rc;
   }
#endif

   if (cspgwdso.gwdso) { /* CMT1254 */
      cspgwdso.p_csp_x_req_handler(f->pRCB->p_cspxreq);
      /* CMT1658 */
      if (f->pRCB->p_cspxreq->websocket_upgrade) {
         /*
         ngx_log_error(NGX_LOG_ERR, f->pRCB->r->connection->log, 0, "Stop WebSocket and exit main thread");
         */
         return 1;
      }
   }
   else {
      cspMutexAcquire(&csp_nginx_mutex);
      ngx_log_error(NGX_LOG_ERR, r->connection->log, 0, "Failed to link to CSP Gateway Library.");
      ngx_http_finalize_request(r, NGX_HTTP_INTERNAL_SERVER_ERROR);
      cspMutexRelease(&csp_nginx_mutex);
      return 0;
   }

   // end the request
#ifdef CSP_AOD052
   cspDestroyClientWriteState(&(f->client_write_state));
   cspMutexAcquire(&csp_nginx_mutex);
   ngx_int_t rc = ngx_http_send_special(r, NGX_HTTP_LAST | NGX_HTTP_FLUSH);
   ngx_http_finalize_request(r, rc);
   cspMutexRelease(&csp_nginx_mutex);
#else
   cspMutexAcquire(&csp_nginx_mutex);
   char *pb = ngx_pcalloc(r->pool, sizeof(char) * f->pRCB->lp_responsedata->curr_size);
   cspMutexRelease(&csp_nginx_mutex);
   int clen;
   
   if (pb) {
      char *p = strstr(f->pRCB->lp_responsedata->lp_buffer, "\r\n\r\n");
      if (p) {
         *p = '\0';
         strcpy(pb, f->pRCB->lp_responsedata->lp_buffer);
         *p = '\r';
         int hlen = (int) strlen(pb);
         clen =  f->pRCB->lp_responsedata->curr_size - (hlen + 4);
         cspLCase(pb);
         if (!strstr(pb, "transfer-encoding:") && !strstr(pb, "content-length:")) {
            memcpy((void *) pb, (void *) (p + 4), clen);
            char cl[32];
            sprintf(cl, "\r\nContent-Length: %d\r\n\r\n", clen);
            f->pRCB->lp_responsedata->curr_size = hlen;
            cspMemCat(f->pRCB, f->pRCB->lp_responsedata, cl, (int) strlen(cl));
            f->pRCB->lp_responsedata->lp_buffer[f->pRCB->lp_responsedata->curr_size] = '\0';

#if defined(CSP_API_TRACE)
            cspLogEvent(f->pRCB->lp_responsedata->lp_buffer, "ngx_http_payload_handler_sa : modified header");
#endif
            cspMemCat(f->pRCB, f->pRCB->lp_responsedata, pb, clen);
         }
      }
   }

   clen = f->pRCB->lp_responsedata->curr_size;
   char *pbuffer = f->pRCB->lp_responsedata->lp_buffer;

   cspMutexAcquire(&csp_nginx_mutex);
   ngx_buf_t *b = ngx_pcalloc(r->pool, sizeof(ngx_buf_t));
   cspMutexRelease(&csp_nginx_mutex);

   if (b == NULL) {
      cspMutexAcquire(&csp_nginx_mutex);
      ngx_log_error(NGX_LOG_ERR, r->connection->log, 0, "Failed to allocate response buffer.");
      ngx_http_finalize_request(r, NGX_HTTP_INTERNAL_SERVER_ERROR);
      cspMutexRelease(&csp_nginx_mutex);
      return 0;
   }

   b->pos = (u_char *) pbuffer; /* first position in memory of the data */
   b->last = (u_char *) (pbuffer + clen); /* last position */

   b->memory = 1; /* content is in read-only memory */
   /* (i.e., filters should copy it rather than rewrite in place) */

   b->last_buf = 1; /* there will be no more buffers in the request */
   /* Now the module attaches it to the chain link: */
   
   ngx_chain_t out;
   out.buf = b;
   out.next = NULL;
   
   cspMutexAcquire(&csp_nginx_mutex);
   int rc = ngx_http_output_filter(r, &out);
   ngx_http_finalize_request(r, rc);
   cspMutexRelease(&csp_nginx_mutex);
#endif

   return 1;
}


static ngx_int_t ngx_http_csp_handler_sa(ngx_http_request_t *r)
{
   int n, clen, ok;
   int rc;
   char ext[16];
   ngx_http_csp_ctx_t *f;
   ngx_http_csp_loc_conf_t *dconf;
   RCB *pRCB;
   CSPXREQ *p_cspxreq;

#if defined(CSP_API_TRACE)
   cspLogEvent("test", "ngx_http_csp_handler_sa");
#endif

   dconf = ngx_http_get_module_loc_conf(r, ngx_http_csp_module_sa);
   ext[0] = '\0';
   if (r->uri.len > 3) {
      for (n = r->uri.len - 1; n > 1; n --) {
         if (r->uri.data[n] == '.') {
            n ++;
            clen = r->uri.len - n;
            if (clen < 16) {
               strncpy(ext, (char *) (r->uri.data + n), clen);
               ext[clen] = '\0';
               break;
            }
         }
      }
   }

   ok = cspCheckFileType("", "", dconf->csp_file_types, ext);
/*
   {
      char buffer[1024];
      if (dconf) {
         sprintf(buffer, "dconf=%p; csp_enabled=%d; csp_file_types=%s; ext=%s; ok=%d; r->uri.len=%d; r->uri.data=%s", dconf, dconf->csp_enabled, dconf->csp_file_types, ext, ok, (int) r->uri.len, (char *) r->uri.data);
         cspLogEvent(buffer, "ngx_http_csp_handler_sa");
      }
      else {
         cspLogEvent("NULL LOCATION CONFIG", "ngx_http_csp_handler_sa");
      }
   }
*/

   if (!ok && !dconf->csp_enabled) {
      return NGX_DECLINED;
   }

   if (!cspgwdso.gwdso) { /* CMT1254 */
      return NGX_HTTP_INTERNAL_SERVER_ERROR;
   }

   /* CMT1515 */
   if (cspxsys.api_level != cspgwdso.gwvers.api_level) {
      return NGX_HTTP_INTERNAL_SERVER_ERROR;
   }

   f = ngx_pcalloc(r->pool, sizeof(ngx_http_csp_ctx_t));
   if (f == NULL) {
      return NGX_HTTP_INTERNAL_SERVER_ERROR;
   }
#ifdef CSP_AOD052
   if (!cspInitClientWriteState(&(f->client_write_state))) {
      return NGX_HTTP_INTERNAL_SERVER_ERROR;
   }
#endif
   ngx_http_set_ctx(r, f, ngx_http_csp_module_sa);

   pRCB = ngx_pcalloc(r->pool, sizeof(RCB));
   if (pRCB == NULL) {
      return NGX_HTTP_INTERNAL_SERVER_ERROR;
   }
   p_cspxreq = ngx_pcalloc(r->pool, sizeof(CSPXREQ));
   if (p_cspxreq == NULL) {
      return NGX_HTTP_INTERNAL_SERVER_ERROR;
   }
   p_cspxreq->websocket_upgrade = 0; /* CMT1658 */

   pRCB->lp_cgievar = ngx_pcalloc(r->pool, sizeof(MEMOBJ));
   if (pRCB->lp_cgievar == NULL) {
      return NGX_HTTP_INTERNAL_SERVER_ERROR;
   }
   pRCB->lp_requestdata = ngx_pcalloc(r->pool, sizeof(MEMOBJ));
   if (pRCB->lp_requestdata == NULL) {
      return NGX_HTTP_INTERNAL_SERVER_ERROR;
   }
#ifndef CSP_AOD052
   pRCB->lp_responsedata = ngx_pcalloc(r->pool, sizeof(MEMOBJ));
   if (pRCB->lp_responsedata == NULL) {
      return NGX_HTTP_INTERNAL_SERVER_ERROR;
   }
#endif
   f->pRCB = pRCB;

   pRCB->r = r;

   pRCB->p_cspxreq = p_cspxreq;
   pRCB->p_cspgwdso = &cspgwdso;
   p_cspxreq->p_wsreq = (void *) pRCB;
   p_cspxreq->info = CSP_REQ_INFO_NONE; /* CMT1253 */
   p_cspxreq->p_cspxwrk = &cspxwrk;

   pRCB->clen = 0;
   clen = 0;

   pRCB->ap_timeout = CSP_DEFAULT_AP_TIMEOUT;
   pRCB->requestdata_ptr = 0;

   p_cspxreq->p_client_read = cspReadBuffer;
   p_cspxreq->p_client_write = cspWriteBuffer;
   p_cspxreq->p_send_response_headers = cspSendResponseHeader;
   p_cspxreq->p_get_server_variables = cspGetServerVariables;
   p_cspxreq->p_ws_start = cspWSStart;
   p_cspxreq->p_ws_client_read = cspWSReadBuffer;
   p_cspxreq->p_ws_client_write = cspWSWriteBuffer;
   p_cspxreq->p_ws_end = cspWSEnd;
   p_cspxreq->pheader = NULL;

   request_no ++;

   cspMemInit(pRCB, pRCB->lp_requestdata, 8192, 8192);
#ifndef CSP_AOD052
   cspMemInit(pRCB, pRCB->lp_responsedata, 8192, 8192);
#endif
   cspMemInit(pRCB, pRCB->lp_cgievar, 1024, 1024);

   cspGetReqVars(pRCB, pRCB->lp_cgievar);

   /* CMT1517 */

/*
#if defined(CSP_WEBSOCKET_TEST)
   {
      int upgrade_connection;
      upgrade_connection = cspWSTestRequest(pRCB, pRCB->lp_cgievar);
      if (upgrade_connection) {
         cspWS(pRCB);
      }
   }
#endif
*/

   rc = ngx_http_read_client_request_body(r, ngx_http_payload_handler_sa);

   if (rc >= NGX_HTTP_SPECIAL_RESPONSE) {

      return rc;
   }

   if (rc == NGX_AGAIN) { /* CMT1220 */
      f->waiting_more_body = 1;
      return NGX_DONE;
   }

   return NGX_DONE;
}


#ifdef CSP_AOD052
/** Write event handler that flushes data to the client. Inspired by ngx_http_writer() in
 * src/http/ngx_http_request.c, which is the write event handler that Nginx uses to flush an HTTP
 * response. */
static void ngx_http_csp_writer_sa(ngx_http_request_t *r)
{
   ngx_connection_t *c = r->connection;
   ngx_event_t *wev = c->write;
   cspMutexAcquire(&csp_nginx_mutex);
   ngx_log_debug2(NGX_LOG_DEBUG_HTTP, wev->log, 0,
                  "http CSP writer handler: \"%V?%V\"", &r->uri, &r->args);
   ngx_http_core_loc_conf_t *clcf = ngx_http_get_module_loc_conf(r->main, ngx_http_core_module);
   cspMutexRelease(&csp_nginx_mutex);

   ngx_http_csp_ctx_t *ctx = ngx_http_get_module_ctx(r, ngx_http_csp_module_sa);
   csp_client_write_state_t *client_write_state = &(ctx->client_write_state);
   if (wev->timedout) {
      cspMutexAcquire(&csp_nginx_mutex);
      ngx_log_error(NGX_LOG_INFO, c->log, NGX_ETIMEDOUT,
                    "http CSP writer handler: client timed out");
      cspMutexRelease(&csp_nginx_mutex);
      c->timedout = 1;
      cspChangeWstatus(client_write_state, CSP_WSTATUS_ERROR);
      return;
   }

   ngx_int_t rc;
   if (wev->delayed || r->aio) {
      cspMutexAcquire(&csp_nginx_mutex);
      ngx_log_debug0(NGX_LOG_DEBUG_HTTP, wev->log, 0, "http CSP writer handler: writer delayed");
      if (!wev->delayed) {
         ngx_add_timer(wev, clcf->send_timeout);
      }
      rc = ngx_handle_write_event(wev, clcf->send_lowat);
      cspMutexRelease(&csp_nginx_mutex);
      if (rc != NGX_OK) {
         cspMutexAcquire(&csp_nginx_mutex);
         ngx_log_error(NGX_LOG_INFO, c->log, 0,
                       "http CSP writer handler: failed to handle write event while delayed");
         cspMutexRelease(&csp_nginx_mutex);
         cspChangeWstatus(client_write_state, CSP_WSTATUS_ERROR);
      }
      return;
   }

   cspMutexAcquire(&csp_nginx_mutex);
   rc = ngx_http_output_filter(r, NULL);
   ngx_log_debug3(NGX_LOG_DEBUG_HTTP, c->log, 0,
                  "http CSP writer handler: output filter: %i, \"%V?%V\"",
                  rc, &r->uri, &r->args);
   cspMutexRelease(&csp_nginx_mutex);
   if (rc == NGX_ERROR) {
      cspMutexAcquire(&csp_nginx_mutex);
      ngx_log_error(NGX_LOG_INFO, c->log, 0, "http CSP writer handler: output filter error");
      cspMutexRelease(&csp_nginx_mutex);
      cspChangeWstatus(&(ctx->client_write_state), CSP_WSTATUS_ERROR);
      return;
   }

   if (r->buffered || r->postponed || (r == r->main && c->buffered)) {
      cspMutexAcquire(&csp_nginx_mutex);
      if (!wev->delayed) {
         ngx_add_timer(wev, clcf->send_timeout);
      }
      rc = ngx_handle_write_event(wev, clcf->send_lowat);
      cspMutexRelease(&csp_nginx_mutex);
      if (rc != NGX_OK) {
         cspMutexAcquire(&csp_nginx_mutex);
         ngx_log_error(NGX_LOG_INFO, c->log, 0,
                       "http CSP writer handler: failed to handle write event while buffered");
         cspMutexRelease(&csp_nginx_mutex);
         cspChangeWstatus(&(ctx->client_write_state), CSP_WSTATUS_ERROR);
      }
      return;
   }

   cspMutexAcquire(&csp_nginx_mutex);
   ngx_log_debug2(NGX_LOG_DEBUG_HTTP, wev->log, 0,
                  "http CSP writer done: \"%V?%V\"", &r->uri, &r->args);
   cspMutexRelease(&csp_nginx_mutex);
   cspChangeWstatus(&(ctx->client_write_state), CSP_WSTATUS_DONE);
}
#endif


int cspCheckFileType(char *csp_file_types_main, char *csp_file_types_server, char *csp_file_types_loc, char *type)
{
   int result;
   char buffer[32];

   strcpy(buffer, ".");
   strncpy(buffer + 1, type, 10);
   buffer[11] = '\0';
   strcat(buffer, ".");

   if (csp_file_types_loc[0] && (strstr(csp_file_types_loc, buffer) || strstr(csp_file_types_loc, ".*.")))
      result = 2;
   else if (csp_file_types_server[0] && (strstr(csp_file_types_server, buffer) || strstr(csp_file_types_server, ".*.")))
      result = 3;
   else
      result = 0;

   return result;
}


int cspMemInit(RCB *pRCB, LPMEMOBJ lp_mem_obj, int size, int incr_size)
{
   int result;
   lp_mem_obj->lp_buffer = (char *) ngx_pcalloc(pRCB->r->pool, sizeof(char) * (size + 1));
   if (lp_mem_obj->lp_buffer) {
      *(lp_mem_obj->lp_buffer) = '\0';
      result = 1;
   }
   else {
      result = 0;
      lp_mem_obj->lp_buffer = (char *) ngx_pcalloc(pRCB->r->pool, sizeof(char));
      if (lp_mem_obj->lp_buffer) {
         *(lp_mem_obj->lp_buffer) = '\0';
         size = 1;
      }
      else
         size = 0;
   }

   lp_mem_obj->size = size;
   lp_mem_obj->incr_size = incr_size;
   lp_mem_obj->curr_size = 0;

   return result;
}


int cspMemFree(RCB *pRCB, LPMEMOBJ lp_mem_obj)
{
   if (lp_mem_obj->lp_buffer) {
      ngx_pfree(pRCB->r->pool, (void *) lp_mem_obj->lp_buffer);
   }

   lp_mem_obj->lp_buffer = NULL;
   lp_mem_obj->size = 0;
   lp_mem_obj->incr_size = 0;
   lp_mem_obj->curr_size = 0;

   return 1;
}


int cspMemCpy(RCB *pRCB, LPMEMOBJ lp_mem_obj, char *buffer, int buffer_len)
{
   int result, req_size, size, incr_size;

   result = 1;

   if (buffer_len < 0)
      buffer_len = strlen(buffer);

   if (buffer_len < 1) {
      req_size = 0;
      lp_mem_obj->lp_buffer[req_size] = '\0';
      lp_mem_obj->curr_size = req_size;
      return result;
   }

   req_size = buffer_len;
   if (req_size > lp_mem_obj->size) {
      size = lp_mem_obj->size;
      incr_size = lp_mem_obj->incr_size;
      while (req_size > size)
         size = size + lp_mem_obj->incr_size;
      cspMemFree(pRCB, lp_mem_obj);
      result = cspMemInit(pRCB, lp_mem_obj, size, incr_size);
   }
   if (result) {
      memcpy((void *) lp_mem_obj->lp_buffer, (void *) buffer, buffer_len);
      lp_mem_obj->lp_buffer[req_size] = '\0';
      lp_mem_obj->curr_size = req_size;
   }

   return result;
}


int cspMemCat(RCB *pRCB, LPMEMOBJ lp_mem_obj, char *buffer, int buffer_len)
{
   int result, req_size, size, incr_size, curr_size;
   char *lp_temp;

   result = 1;

   if (buffer_len < 0)
      buffer_len = strlen(buffer);

   if (buffer_len < 1)
      return result;

   req_size = (int) (buffer_len + lp_mem_obj->curr_size);
   curr_size = lp_mem_obj->curr_size;

   if (req_size > lp_mem_obj->size) {
      size = lp_mem_obj->size;
      incr_size = lp_mem_obj->incr_size;
      while (req_size > size)
         size = size + lp_mem_obj->incr_size;
      lp_temp = lp_mem_obj->lp_buffer;
      result = cspMemInit(pRCB, lp_mem_obj, size, incr_size);
      if (result) {
         if (lp_temp) {
            memcpy((void *) lp_mem_obj->lp_buffer, (void *) lp_temp, curr_size);
            lp_mem_obj->curr_size = curr_size;
            ngx_pfree(pRCB->r->pool, (void *) lp_temp);
         }
      }
      else
         lp_mem_obj->lp_buffer = lp_temp;
   }
   if (result) {
      memcpy((void *) (lp_mem_obj->lp_buffer + curr_size), (void *) buffer, buffer_len);
      lp_mem_obj->lp_buffer[req_size] = '\0';
      lp_mem_obj->curr_size = req_size;
   }

   return result;
}



int cspLCase(char *string)
{

#if defined(_WIN32) && defined(_UNICODE)

   CharLower(string);
   return 1;

#else

   int n, chr;

   n = 0;
   while (string[n] != '\0') {
      chr = (int) string[n];
      if (chr >= 65 && chr <= 90)
         string[n] = (char) (chr + 32);
      n ++;
   }
   return 1;

#endif

}


int cspUCase(char *string)
{
#ifdef _UNICODE

   CharUpper(string);
   return 1;

#else

   int n, chr;

   n = 0;
   while (string[n] != '\0') {
      chr = (int) string[n];
      if (chr >= 97 && chr <= 122)
         string[n] = (char) (chr - 32);
      n ++;
   }
   return 1;

#endif
}


int cspReturnError(RCB *pRCB, LPMEMOBJ lp_responsedata, char *error)
{
   char buffer[4096];

   strcpy(buffer, "HTTP/1.1 200 OK\r\n");
   strcat(buffer, "Content-type: text/html\r\n");
   strcat(buffer, "Connection: close\r\n\r\n");

   /* cspSendResponseHeader(pRCB, buffer, 0, 0, 0); */

   cspMemCpy(pRCB, lp_responsedata, buffer, -1);

   cspMemCat(pRCB, lp_responsedata, "<HTML>\r\n", -1);
   cspMemCat(pRCB, lp_responsedata, "<HEAD><TITLE>Cach&eacute; Server Pages Connection Error</TITLE></HEAD>\r\n", -1);
   cspMemCat(pRCB, lp_responsedata, "<BODY>\r\n", -1);
   cspMemCat(pRCB, lp_responsedata, "<H2>An error occurred while attempting to communicate with the Cach&eacute; Server Pages Network Service Daemon</H2>\r\n", -1);
   cspMemCat(pRCB, lp_responsedata, "<P>\r\n", -1);
   cspMemCat(pRCB, lp_responsedata, error, -1);
   cspMemCat(pRCB, lp_responsedata, "\r\n</BODY>\r\n", -1);
   cspMemCat(pRCB, lp_responsedata, "</HTML>\r\n", -1);

   return 1;
}


int cspLogBuffer(unsigned char *buffer, unsigned long buffer_len, char *title)
{
   unsigned int c, len, strt;
   unsigned long n, n1, nc, size;
   char tmp[16];
   unsigned char *p;

   for (n = 0, nc = 0; n < buffer_len; n ++) {
      c = (unsigned int) buffer[n];
      if (c < 32 || c > 126)
         nc ++;
   }

   size = buffer_len + (nc * 4) + 32;

   p = (unsigned char *) malloc(sizeof(char) * size);
   if (!p)
      return 0;

   if (nc) {

      for (n = 0, nc = 0; n < buffer_len; n ++) {
         c = (unsigned int) buffer[n];
         if (c < 32 || c > 126) {
            sprintf((char *) tmp, "%02x", c);
            len = strlen(tmp);
            if (len > 2)
               strt = len - 2;
            else
               strt = 0;
            p[nc ++] = '\\';
            p[nc ++] = 'x';
            for (n1 = strt; tmp[n1]; n1 ++)
               p[nc ++] = tmp[n1];
         }
         else
            p[nc ++] = buffer[n];
      }
      p[nc] = '\0';
   }
   else {
      strncpy((char *) p, (char *) buffer, buffer_len);
      p[buffer_len] = '\0';
   }

   cspLogEvent((char *) p, title);

   free((void *) p);

   return 1;

}


int cspLogEvent(char *message, char *title)
{
   int len, n, mem_alloc;
   char *pbuffer;
   char timestr[128], s_buffer[1024];
   time_t now = 0;
   FILE *fp;

   *s_buffer = '\0';
   mem_alloc = 0;
   now = time(NULL);
   sprintf(timestr, ">>> %s", ctime(&now));

   for (n = 0; timestr[n] != '\0'; n ++) {
      if ((unsigned int) timestr[n] < 32) {
         timestr[n] = '\0';
         break;
      }
   }

#if defined(_WIN32) /* Windows */
   sprintf(s_buffer, "%s; Version: %s; PID=%lu;", timestr, CSP_MODULE_VERSION, (unsigned long) GetCurrentProcessId());
#else
   sprintf(s_buffer, "%s; Version: %s; PID=%lu;", timestr, CSP_MODULE_VERSION, (unsigned long) getpid());
#endif
   strcpy(timestr, s_buffer);


   len = strlen(timestr) + strlen(title) + strlen(message) + 32;

   if (len > 1000) {

      pbuffer = (char *) malloc(sizeof(char) * len);

      if (pbuffer == NULL)
         return 0;

      mem_alloc = 1;
   }
   else {
      pbuffer = s_buffer;
   }

   pbuffer[0] = '\0';
   strcpy(pbuffer, timestr);
   strcat(pbuffer, "\r\n    ");
   strcat(pbuffer, title);
   strcat(pbuffer, "\r\n    ");

   len = strlen(pbuffer);

   pbuffer[len] = '\0';

   strcat(pbuffer, message);
   strcat(pbuffer, "\r\n");

   fp = fopen(CSP_LOG_FILE, "a");
   if (fp) {
      fputs(pbuffer, fp);
      fclose(fp);
   }

   if (mem_alloc) {
      free((void *) pbuffer);
      pbuffer = NULL;
   }

   return 0;
}

int cspWriteString(RCB *pRCB, char *buffer, short context)
{
   int result, size;

   size = (int) (strlen(buffer) * sizeof(char));

   result = cspWriteBuffer(pRCB->p_cspxreq, (unsigned char *) buffer, (int) size);

   return result;
}


int cspReadBuffer(struct tagCSPXREQ * p_cspxreq, unsigned char * buffer, int buffer_size)
{
   int avail, result;
   RCB *pRCB;

   pRCB = (RCB *) p_cspxreq->p_wsreq;

   result = 0;
   avail = pRCB->lp_requestdata->curr_size - pRCB->requestdata_ptr;

   /* CMT1252 */
   if (avail > 0) {
      if (avail < buffer_size) {
         memcpy((void *) buffer, (void *) (pRCB->lp_requestdata->lp_buffer + pRCB->requestdata_ptr), (size_t) avail);
         pRCB->requestdata_ptr = pRCB->lp_requestdata->curr_size;
         result = avail;
      }
      else {
         memcpy((void *) buffer, (void *) (pRCB->lp_requestdata->lp_buffer + pRCB->requestdata_ptr), (size_t) buffer_size);
         pRCB->requestdata_ptr += buffer_size;
         result = buffer_size;
      }
   }

   return result;
}

int cspWriteBuffer(struct tagCSPXREQ * p_cspxreq, unsigned char * buffer, int buffer_size)
{
   RCB *pRCB = (RCB *)p_cspxreq->p_wsreq;
#ifdef CSP_AOD052
   ngx_http_csp_ctx_t *ctx = ngx_http_get_module_ctx(pRCB->r, ngx_http_csp_module_sa);
   csp_client_write_state_t *client_write_state = &(ctx->client_write_state);
   return ngx_http_csp_send_to_client(pRCB->r, ngx_http_csp_writer_sa, &csp_nginx_mutex, client_write_state, (u_char *)buffer, buffer_size);
#else
   cspMemCat(pRCB, pRCB->lp_responsedata, (char *) buffer, buffer_size);
   return 1;
#endif
}


int cspSendResponseHeader(struct tagCSPXREQ * p_cspxreq, char * header)
{
   int header_sent;
   RCB *pRCB;

   header_sent = 0;
   pRCB = (RCB *) p_cspxreq->p_wsreq;

   if (p_cspxreq->keepalive)
      p_cspxreq->ws_sends_header = 1;

   if (p_cspxreq->ws_sends_header) {

      int n, status;
      double version;
      char *p, *p1, *p2, *p3;
      char pvers[32], stat[32], desc[32];

      version = 1.1;
      status = 200;
      strcpy(desc, "OK");

      cspWriteBuffer(p_cspxreq, (unsigned char *) header, (int) strlen(header));

      for (p = header, n = 0;; n ++) {
         p1 = strstr(p, "\r\n");
         if (!p1)
            break;
         *p1 = '\0';
         if (!strlen(p)) {
            *p1 = '\r';
            break;
         }

         if (!n) {
            p2 = strstr(p, "/");
            p3 = strstr(p, " ");
            if (p3) {
               *p3 = '\0';
               strcpy(pvers, p2 + 1);
               version = (double) strtod(pvers, NULL);
               if (!version)
                  version = 1.1;
               *p3 = ' ';
               while (*p3 == ' ')
                  p3 ++;
               p2 = strstr(p3, " ");
               if (p2)
                  *p2 = '\0';
               strcpy(stat, p3);
               if (p2) {
                  *p2 = ' ';
                  while (*p2 == ' ')
                     p2 ++;
                  strcpy(desc, p2);
                  if (!strlen(desc))
                     strcpy(desc, "OK");
               }
               status = (int) strtol(stat, NULL, 10);
               if (!status) {
                  status = 200;
               }
               pRCB->r->headers_out.status = (ngx_uint_t) status; /*  CMT1692 */
               pRCB->status = status;
            }
         }
         else {
            p2 = strstr(p, ":");
         }

         *p1 = '\r';
         p = p1 + 2;
      }

      header_sent = 1;
   }
   else {
      int status;
      char *p;

      p = strstr(header, " ");
      if (p) {
         p += 1;
         status = strtol(p, NULL, 10);
         if (!status) {
            status = 200;
         }
         pRCB->r->headers_out.status = (ngx_uint_t) status; /* CMT1692 */
         pRCB->status = status;
      }

      if (p_cspxreq->context == 1) {
         header_sent = 1;
         cspWriteBuffer(p_cspxreq, (unsigned char *) header, (int) strlen(header));
      }
      else {
         header_sent = 0;
      }
   }

   return header_sent;

}


int cspServerVariable(void *rec, const char *key, const char *value)
{
   CSPIFC * p_cspifc;
   RCB *pRCB;

   if (!rec || !key || !value)
      return 0;

   p_cspifc = (CSPIFC *) rec;
   pRCB = (RCB *) p_cspifc->p1;

   pRCB->p_cspgwdso->p_csp_x_server_variable(pRCB->p_cspxreq, (char *) key, (char *) value);
   
   return 1;
}


int cspGetServerVariables(struct tagCSPXREQ * p_cspxreq)
{
   int n;
   RCB *pRCB;

   pRCB = (RCB *) p_cspxreq->p_wsreq;

   for (n = 0; cgi_vars[n]; n ++) {
      cspGetServerVariable(pRCB, (char *) cgi_vars[n] , pRCB->lp_cgievar, 1);
   }

   cspGetServerVariable(pRCB, (char *) "*" , pRCB->lp_cgievar, 1);

   return 1;
}


int cspWSStart(struct tagCSPXREQ * p_cspxreq)
{
   int clen, rc;
   char *pbuffer;
   RCB *pRCB;
   ngx_buf_t    *b;
   ngx_chain_t   out;

   pRCB = (RCB *) p_cspxreq->p_wsreq;

   pRCB->r->headers_out.status = NGX_HTTP_SWITCHING_PROTOCOLS;

   clen = (int) strlen(p_cspxreq->pheader);
   pbuffer = ngx_pcalloc(pRCB->r->pool, clen + 32);
   strcpy(pbuffer, p_cspxreq->pheader);

   b = ngx_pcalloc(pRCB->r->pool, sizeof(ngx_buf_t));
   if (b == NULL) {
      ngx_log_error(NGX_LOG_ERR, pRCB->r->connection->log, 0, "Failed to allocate response buffer.");
      return 0;
   }

   b->pos = (u_char *) pbuffer; /* first position in memory of the data */
   b->last = (u_char *) (pbuffer + clen); /* last position */

   b->memory = 1; /* content is in read-only memory */
   /* (i.e., filters should copy it rather than rewrite in place) */

   b->last_buf = 1; /* there will be no more buffers in the request */

   /* Now the module attaches it to the chain link: */

   out.buf = b;
   out.next = NULL;

   rc = ngx_http_output_filter(pRCB->r, &out);

   rc = ngx_blocking(pRCB->r->connection->fd);
   if (rc) {
      return 0;
   }

   return 1;
}


int cspWSReadBuffer(struct tagCSPXREQ * p_cspxreq, unsigned char * buffer, int buffer_size)
{
   int read, n;
   RCB *pRCB;

   pRCB = (RCB *) p_cspxreq->p_wsreq;

   n = 0;
   read = 0;

   read = 0;
   while (read < buffer_size) {
      n = (int) pRCB->r->connection->recv(pRCB->r->connection, (u_char *) (buffer + read), buffer_size - read);

      if (n == NGX_AGAIN) {
#if defined(_WIN32)
         Sleep(100);
#else
         sleep(1);
#endif
         continue;
      }

      if (n < 1) {
         read = 0;
         break;
      }
      read += n;
   }

   return read;

}


int cspWSWriteBuffer(struct tagCSPXREQ * p_cspxreq, const unsigned char *buffer, int buffer_size)
{
   int result, n;
   RCB *pRCB;

   pRCB = (RCB *) p_cspxreq->p_wsreq;

   result = 0;
   n = 0;
   result = 0;
   /* Need copy of buffer because send() does not const-qualify it.
   * This configuration is deprecated anyway, so the small performance hit
   * is not a concern. */
   unsigned char *buffer_copy = ngx_palloc(pRCB->r->pool, buffer_size);
   if (buffer_copy) {
      ngx_memcpy(buffer_copy, buffer, buffer_size);
      while (result < buffer_size) {
         n = (int) pRCB->r->connection->send(pRCB->r->connection, buffer_copy + result, buffer_size - result);

         if (n < 1) {
            result = 0;
            break;
         }
         result += n;
      }
      ngx_pfree(pRCB->r->pool, buffer_copy);
   } else {
      result = 0;
   }

   return result;
}


int cspWSEnd(struct tagCSPXREQ * p_cspxreq)
{
   int n;
   RCB *pRCB;

   pRCB = (RCB *) p_cspxreq->p_wsreq;

   n = ngx_nonblocking(pRCB->r->connection->fd);

   return n;
}


int cspGetServerVariable(RCB *pRCB, char *VariableName, LPMEMOBJ lp_cgievar, short context)
{
   int ok, n;
   unsigned int i;
   char *p;
   CSPIFC cspifc;
   MEMOBJ temp, *lp_temp;
   ngx_list_part_t  *part;
   ngx_table_elt_t *hd;

   /* CMT1561 */
   lp_temp = &temp;
   cspMemInit(pRCB, lp_temp, 1024, 1024);

   cspMemCpy(pRCB, lp_cgievar, "", 0); /* CMT1735 */

   if (context == 1) {
      cspifc.context = 1;
      cspifc.p1 = (void *) pRCB;
   }

   ok = 0;
   if (!strcmp(VariableName, "CSP_MODULE_TYPE")) {
      cspMemCpy(pRCB, lp_cgievar, CSP_MODULE_TYPE_SHORT, strlen(CSP_MODULE_TYPE_SHORT));
      ok = 1;
      if (context == 1) {
         cspServerVariable((void *) &cspifc, (const char *) VariableName, (const char *) lp_cgievar->lp_buffer);
      }
   }
   else if (!strcmp(VariableName, "CSP_MODULE_BUILD")) {
      sprintf((char *) lp_temp->lp_buffer, "%d", CSP_MODULE_BUILD);
      cspMemCpy(pRCB, lp_cgievar, (char *) lp_temp->lp_buffer, strlen((char *) lp_temp->lp_buffer));
      ok = 1;
      if (context == 1) {
         cspServerVariable((void *) &cspifc, (const char *) VariableName, (const char *) lp_cgievar->lp_buffer);
      }
   }
   else if (!strcmp(VariableName, "REQUEST_METHOD")) {
      cspMemCpy(pRCB, lp_cgievar, (char *) pRCB->r->method_name.data, (int)  pRCB->r->method_name.len);
      ok = 1;
      if (context == 1) {
         cspServerVariable((void *) &cspifc, (const char *) VariableName, (const char *) lp_cgievar->lp_buffer);
      }
   }
   else if (!strcmp(VariableName, "SCRIPT_NAME")) {
      cspMemCpy(pRCB, lp_cgievar, (char *)  pRCB->r->uri.data, (int)  pRCB->r->uri.len);
      ok = 1;
      if (context == 1) {
         cspServerVariable((void *) &cspifc, (const char *) VariableName, (const char *) lp_cgievar->lp_buffer);
      }
   }
   else if (!strcmp(VariableName, "QUERY_STRING")) {
      if (pRCB->r->args.len >= 1) {
         cspMemCpy(pRCB, lp_cgievar, (char *) pRCB->r->args.data, (int) pRCB->r->args.len);
         ok = 1;
         if (context == 1) {
            cspServerVariable((void *) &cspifc, (const char *) VariableName, (const char *) lp_cgievar->lp_buffer);
         }
      }
   }
   else if (!strcmp(VariableName, "SERVER_PROTOCOL")) {
      cspMemCpy(pRCB, lp_cgievar, (char *) pRCB->r->http_protocol.data, (int) pRCB->r->http_protocol.len);
      ok = 1;
      if (context == 1) {
         cspServerVariable((void *) &cspifc, (const char *) VariableName, (const char *) lp_cgievar->lp_buffer);
      }
   }
   else if (!strcmp(VariableName, "SERVER_SOFTWARE")) {
      cspMemCpy(pRCB, lp_cgievar, NGINX_VER, -1);
      ok = 1;
      if (context == 1) {
         cspServerVariable((void *) &cspifc, (const char *) VariableName, (const char *) lp_cgievar->lp_buffer);
      }
   }
   else if (!strcmp(VariableName, "REMOTE_ADDR")) {
      if (pRCB->r->connection->addr_text.data && pRCB->r->connection->addr_text.len >= 1) /* CMT1262 */
         cspMemCpy(pRCB, lp_cgievar, (char *) pRCB->r->connection->addr_text.data, (int) pRCB->r->connection->addr_text.len);
      else
         cspMemCpy(pRCB, lp_cgievar, "", -1);
      ok = 1;
      if (context == 1) {
         cspServerVariable((void *) &cspifc, (const char *) VariableName, (const char *) lp_cgievar->lp_buffer);
      }
   }
   else if (!strcmp(VariableName, "REMOTE_PORT")) { /* CMT1556 */
      int port;
      struct sockaddr_in   *sin;
#if (NGX_HAVE_INET6)
      struct sockaddr_in6  *sin6;
#endif

      port = 0;
      switch (pRCB->r->connection->sockaddr->sa_family) {
#if (NGX_HAVE_INET6)
         case AF_INET6:
            sin6 = (struct sockaddr_in6 *) pRCB->r->connection->sockaddr;
            port = ntohs(sin6->sin6_port);
            break;
#endif
         case AF_UNIX:
            port = 0;
            break;
         default: /* AF_INET */
            sin = (struct sockaddr_in *) pRCB->r->connection->sockaddr;
            port = ntohs(sin->sin_port);
            break;
      }
      if (port > 0 &&  port < 65536)
         sprintf((char *) lp_cgievar->lp_buffer, "%d", port);
      else
         cspMemCpy(pRCB, lp_cgievar, "", -1);
      ok = 1;
      if (context == 1) {
         cspServerVariable((void *) &cspifc, (const char *) VariableName, (const char *) lp_cgievar->lp_buffer);
      }
   }
   else if (!strcmp(VariableName, "REMOTE_HOST")) {
      if (pRCB->r->connection->addr_text.data && pRCB->r->connection->addr_text.len >= 1) /* CMT1262 */
         cspMemCpy(pRCB, lp_cgievar, (char *) pRCB->r->connection->addr_text.data, (int) pRCB->r->connection->addr_text.len);
      else
         cspMemCpy(pRCB, lp_cgievar, "", -1);
      ok = 1;
      if (context == 1) {
         cspServerVariable((void *) &cspifc, (const char *) VariableName, (const char *) lp_cgievar->lp_buffer);
      }
   }

   else if (!strcmp(VariableName, "PATH_TRANSLATED")) {
      cspMemCpy(pRCB, lp_cgievar, (char *) pRCB->p_cspxreq->p_cspxwrk->p_cspxsys->module_path, -1);
      if (lp_cgievar->curr_size > 0) {
         lp_cgievar->curr_size --;
         lp_cgievar->lp_buffer[lp_cgievar->curr_size] = '\0';
      }
      cspMemCat(pRCB, lp_cgievar, (char *) pRCB->r->uri.data, (int)  pRCB->r->uri.len);
      ok = 1;
      if (context == 1) {
         cspServerVariable((void *) &cspifc, (const char *) VariableName, (const char *) lp_cgievar->lp_buffer);
      }
   }
   else {
      part = &(pRCB->r->headers_in.headers.part);

      if (part) {
         hd = part->elts;
         for (i = 0 ;; i++) {
            if (i >= part->nelts) {
               if (part->next == NULL) {
                  break;
               }
               part = part->next;
               hd = part->elts;
               i = 0;
            }

            if (hd[i].key.data) {
               cspMemCpy(pRCB, lp_temp, "HTTP_", 5);
               cspMemCat(pRCB, lp_temp, (char *) hd[i].key.data, -1);
               cspUCase((char *) lp_temp->lp_buffer);
               for (n = 0; lp_temp->lp_buffer[n]; n ++) {
                  if (lp_temp->lp_buffer[n] == '-')
                     lp_temp->lp_buffer[n] = '_';
               }
               if (!strcmp((char *) lp_temp->lp_buffer, VariableName)) {
                  cspMemCpy(pRCB, lp_cgievar, (char *) hd[i].value.data, -1);
                  ok = 1;
               }
               else if (!strcmp((char *) (lp_temp->lp_buffer + 5), VariableName)) {
                  cspMemCpy(pRCB, lp_cgievar, (char *) hd[i].value.data, -1);
                  ok = 1;
               }
               else {

                  if (context == 1) {
                     if (!strcmp((char *) lp_temp->lp_buffer, "HTTP_CONTENT_LENGTH") || !strcmp((char *) lp_temp->lp_buffer, "HTTP_CONTENT_TYPE")) {
                        cspServerVariable((void *) &cspifc, (const char *) (lp_temp->lp_buffer + 5), (const char *) hd[i].value.data);
                     }
                     else {
                        cspServerVariable((void *) &cspifc, (const char *) lp_temp->lp_buffer, (const char *) hd[i].value.data);
                     }
                  }

                  if (!strcmp((char *) lp_temp->lp_buffer, "HTTP_HOST")) {
                     if (!strcmp(VariableName, "SERVER_NAME") || context == 1) {
                        cspMemCpy(pRCB, lp_cgievar, (char *) hd[i].value.data, -1);
                        p = strstr(lp_cgievar->lp_buffer, ":");
                        if (p) {
                           *p = '\0';
                           lp_cgievar->curr_size = strlen(lp_cgievar->lp_buffer);
                        }
                        ok = 1;
                        if (context == 1) {
                           cspServerVariable((void *) &cspifc, (const char *) "SERVER_NAME", (const char *) lp_cgievar->lp_buffer);
                        }
                     }
                     if (!strcmp(VariableName, "SERVER_PORT") || context == 1) {
                        cspMemCpy(pRCB, lp_cgievar, (char *) hd[i].value.data, -1);
                        p = strstr(lp_cgievar->lp_buffer, ":");
                        if (p) {
                           *p = '\0';
                           cspMemCpy(pRCB, lp_temp, p + 1, strlen(p + 1));
                           cspMemCpy(pRCB, lp_cgievar, (char *) lp_temp->lp_buffer, -1);
                        }
                        else { /* CMT1189 */
                           cspMemCpy(pRCB, lp_cgievar, (char *) "80", -1);
                        }
                        ok = 1;
                        if (context == 1) {
                           cspServerVariable((void *) &cspifc, (const char *) "SERVER_PORT", (const char *) lp_cgievar->lp_buffer);
                        }
                     }
                  }
               }
            }
         }
      }
   }

   if (ok)
      ok = (int) lp_cgievar->curr_size;
   else
      ok = -1;

   /* CMT1561 */
   cspMemFree(pRCB, lp_temp);

   return ok;

}


int cspGetReqVars(RCB *pRCB, LPMEMOBJ lp_cgievar)
{
   int result;
   char request_transfer_encoding[32];

   result = 1;

   pRCB->clen = 0;
   pRCB->request_chunked = 0;
   request_transfer_encoding[0] = '\0';

   cspGetServerVariable(pRCB, "SCRIPT_NAME", lp_cgievar, 0);
   strcpy(pRCB->p_cspxreq->uri, lp_cgievar->lp_buffer);

   cspGetServerVariable(pRCB, "CONTENT_LENGTH", lp_cgievar, 0);
   pRCB->clen = strtol(lp_cgievar->lp_buffer, NULL, 10);

   if (cspGetServerVariable(pRCB, "HTTP_TRANSFER_ENCODING", lp_cgievar, 0) < 128) {
      strncpy(request_transfer_encoding, (char *) lp_cgievar->lp_buffer, 31);
      request_transfer_encoding[31] = '\0';
   }

   if (*request_transfer_encoding) {
      cspLCase(request_transfer_encoding);
      if (strstr(request_transfer_encoding, "chunked")) {
         pRCB->request_chunked = 1;
      }
   }
   return result;
}



int cspLoadGWDSO(char *module_path, char * error, int error_size, int context)
{
   int result, len;
   char path[256];

   result = 0;
   *path = '\0';
   *error = '\0';

   if (cspgwdso.load_attempted)
      return 1;

   if (cspgwdso.load_attempted)
      goto cspLoadGWDSOExit;

   cspgwdso.gwdso = 0;

   /* CMT1254 */
   len = (int) strlen(module_path);
   if (len && (module_path[len - 1] == '/' || module_path[len - 1] == '\\'))
      sprintf(path, "%s%s", module_path, CSP_MODULE_NAME);
   else
      sprintf(path, "%s/%s", module_path, CSP_MODULE_NAME);

   /* CMT1522 */
   cspgwdso.h_gwdso = cspDSOload(path, error, error_size);

   if (cspgwdso.h_gwdso) {
      cspgwdso.p_csp_x_version = (LPFN_CSP_X_VERSION) cspDSOsym(cspgwdso.h_gwdso, "csp_x_version");
      cspgwdso.p_csp_x_req_handler = (LPFN_CSP_X_REQ_HANDLER) cspDSOsym(cspgwdso.h_gwdso, "csp_x_req_handler");
      cspgwdso.p_csp_x_server_variable = (LPFN_CSP_X_SERVER_VARIABLE) cspDSOsym(cspgwdso.h_gwdso, "csp_x_server_variable");
      cspgwdso.p_csp_x_sys_startup = (LPFN_CSP_X_SYS_STARTUP) cspDSOsym(cspgwdso.h_gwdso, "csp_x_sys_startup");
      cspgwdso.p_csp_x_sys_closedown = (LPFN_CSP_X_SYS_CLOSEDOWN) cspDSOsym(cspgwdso.h_gwdso, "csp_x_sys_closedown");
      cspgwdso.p_csp_x_wrk_startup = (LPFN_CSP_X_WRK_STARTUP) cspDSOsym(cspgwdso.h_gwdso, "csp_x_wrk_startup");
      cspgwdso.p_csp_x_wrk_closedown = (LPFN_CSP_X_WRK_CLOSEDOWN) cspDSOsym(cspgwdso.h_gwdso, "csp_x_wrk_closedown");
      cspgwdso.p_csp_x_sha1 = (LPFN_CSP_X_SHA1) cspDSOsym(cspgwdso.h_gwdso, "csp_x_sha1");
      cspgwdso.p_csp_x_b64_encode = (LPFN_CSP_X_B64_ENCODE) cspDSOsym(cspgwdso.h_gwdso, "csp_x_b64_encode");
      cspgwdso.p_csp_x_b64_decode = (LPFN_CSP_X_B64_DECODE) cspDSOsym(cspgwdso.h_gwdso, "csp_x_b64_decode");
      cspgwdso.p_csp_x_utf8_data = (LPFN_CSP_X_UTF8_DATA) cspDSOsym(cspgwdso.h_gwdso, "csp_x_utf8_data");

/*
{
   char buffer[1024];
   sprintf(buffer, "Load Gateway Universal Module %s (functions=%p;%p;%p;%p;%p;%p;%p) context=%d", path, cspgwdso.p_csp_x_version, cspgwdso.p_csp_x_req_handler, cspgwdso.p_csp_x_server_variable, cspgwdso.p_csp_x_sys_startup, cspgwdso.p_csp_x_sys_closedown, cspgwdso.p_csp_x_wrk_startup, cspgwdso.p_csp_x_wrk_closedown , context);
   cspLogEvent(buffer, "Diagnostic");
}
*/

      if (cspgwdso.p_csp_x_version && cspgwdso.p_csp_x_req_handler && cspgwdso.p_csp_x_server_variable && cspgwdso.p_csp_x_sys_startup && cspgwdso.p_csp_x_sys_closedown && cspgwdso.p_csp_x_wrk_startup && cspgwdso.p_csp_x_wrk_closedown) {
         cspgwdso.gwdso = 1;
         result = 1;
      }
      else {
         result = 0;
         sprintf(error, "Error loading : %s (missing functions in the Gateway Library (CSPx) - check version of this library)", path);
         cspDSOunload((CSPHLIB) cspgwdso.h_gwdso);
      }
   }
   else {
      if (!error[0]) {
         sprintf(error, "Error loading : %s", path);
      }
      result = 0;
   }

   cspgwdso.load_attempted = 1;

   if (cspgwdso.gwdso) {
      cspgwdso.p_csp_x_version(&(cspgwdso.gwvers));
   }

cspLoadGWDSOExit:

   return result;
}


int cspUnloadGWDSO(int context)
{
   int result;

   result = 0;
   if (!cspgwdso.gwdso) { /* CMT1254 */
      return result;
   }
   result = cspDSOunload(cspgwdso.h_gwdso);

   cspgwdso.load_attempted = 0;
   cspgwdso.gwdso = 0;

   return result;
}


CSPHLIB cspDSOload(char * library, char * error, int error_size)
{
   CSPHLIB h_library;

   /* CMT1522 */

#if defined(_WIN32)

   h_library = LoadLibrary(library);
   if (!h_library) {
      sprintf(error, "Error loading : %s; Error Code : %lu", library, (unsigned long) GetLastError());
   }

#else

#if defined(CSP_UNIX_DSO_DLFCN)

   h_library = dlopen(library, RTLD_NOW);
   if (!h_library) {
      char *p;

      p = (char *) dlerror();

      if (p)
         sprintf(error, "Error loading : %s; Error Code : %d; Reason=%s", library, errno, p);
      else
         sprintf(error, "Error loading : %s; Error Code : %d", library, errno);
   }

#else

   h_library = shl_load(library, BIND_IMMEDIATE, 0);
   if (!h_library) {
      sprintf(error, "Error loading : %s", library);
   }


#endif

#endif

   return h_library;
}



CSPPROC cspDSOsym(CSPHLIB h_library, char * symbol)
{
   CSPPROC p_proc;

#if defined(_WIN32)

   p_proc = GetProcAddress(h_library, symbol);

#else

#if defined(CSP_UNIX_DSO_DLFCN)

   p_proc  = (void *) dlsym(h_library, symbol);

#else

   int (* proc) (void);

   shl_findsym((shl_t *) &h_library, symbol, TYPE_PROCEDURE, (void *) &proc);
   p_proc = (void *) proc;

#endif

#endif

   return p_proc;
}



int cspDSOunload(CSPHLIB h_library)
{

#if defined(_WIN32)

   FreeLibrary(h_library);

#else

#if defined(CSP_UNIX_DSO_DLFCN)

   dlclose(h_library); 

#else

   shl_unload((shl_t) h_library);

#endif

#endif

   return 1;
}



int cspLaunchThread(CSPFUN *pc_fun)
{

   if (pc_fun->async_mode == CSP_ASYNC_NODE) {

      cspThreadMain((void *) pc_fun);

      return 1;
   }
   else if (pc_fun->async_mode == CSP_ASYNC_TP_MUTEX || pc_fun->async_mode == CSP_ASYNC_TP_SIGNAL) {

/* TODO Use thread pool
      int rc;
      rc = sys_pool_submit_task(pc_fun);
*/
      return 1;
   }
   else if (pc_fun->async_mode == CSP_ASYNC_T) {
#if defined(_WIN32)
      HANDLE hthread;
      SIZE_T stack_size;
      DWORD thread_id, cre_flags, result;
      LPSECURITY_ATTRIBUTES pattr;

      stack_size = 0;
      cre_flags = 0;
      pattr = NULL;

      hthread = CreateThread(pattr, stack_size, (LPTHREAD_START_ROUTINE) cspThreadMain, (LPVOID) pc_fun, cre_flags, &thread_id);
      if (!hthread) {
         ngx_log_error(NGX_LOG_ERR, pc_fun->r->connection->log, 0, "Failed to create thread.");
         ngx_http_finalize_request(pc_fun->r, NGX_HTTP_INTERNAL_SERVER_ERROR);
         return 0;
      }
      CloseHandle(hthread);
      if (!pc_fun->detach) {
         result = WaitForSingleObject(hthread, INFINITE);
      }
#else
      int rc = 0;
      pthread_attr_t attr;
      pthread_t child_thread;

      size_t stacksize, newstacksize;

      pthread_attr_init(&attr);

      stacksize = 0;
      pthread_attr_getstacksize(&attr, &stacksize);

      newstacksize = 0x40000; /* 262144 */
      newstacksize = 0x70000; /* 458752 */

      pthread_attr_setstacksize(&attr, newstacksize);

      rc = pthread_create(&child_thread, &attr, cspThreadMain, (void *) pc_fun);
      if (rc) {
         ngx_log_error(NGX_LOG_ERR, pc_fun->r->connection->log, 0, "Failed to create thread.");
         ngx_http_finalize_request(pc_fun->r, NGX_HTTP_INTERNAL_SERVER_ERROR);
         return 0;
      }
      if (!pc_fun->detach) {
         rc = pthread_join(child_thread, NULL);
      }
#endif
   }
   else if (pc_fun->async_mode == CSP_ASYNC_SYNC) {

      /* Do absolutely nothing !!! */
      return 0;
   }

   return 1;
}


#if defined(_WIN32)
DWORD WINAPI cspThreadMain(LPVOID pargs)
#else
void * cspThreadMain(void *pargs)
#endif
{
   CSPFUN *pc_fun;

   pc_fun = (CSPFUN *) pargs;
   if (!pc_fun) {
      goto cspThreadMainExit;
   }

#if !defined(_WIN32)
   if (pc_fun->detach) {
      pthread_detach(pthread_self());
   }
#endif

   ngx_http_exec_sa(pc_fun->r, pc_fun->f);

cspThreadMainExit:

#if defined(_WIN32)
   return 0;
#else
   return NULL;
#endif
}


#if defined(CSP_WEBSOCKET_TEST)

int cspWS(RCB *pRCB)
{
   int n, clen;
   char *pbuffer;
   char header[2048];
   char host[128];
   char sec_websocket_key[256];
   char token[256], hash[256], sec_websocket_accept[256];
   int protocol_version = 0;
   char sec_websocket_protocol[32];
   ngx_buf_t    *b;
   ngx_chain_t   out;

   *header = '\0';
   *sec_websocket_accept = '\0';
   *sec_websocket_key = '\0';
   *sec_websocket_protocol = '\0';
   *token = '\0';
   *hash = '\0';

   cspGetServerVariable(pRCB, "SERVER_NAME",  pRCB->lp_cgievar, 0);
   strncpy(host, (char *) pRCB->lp_cgievar->lp_buffer, 120);
   host[120] = '\0';

   cspGetServerVariable(pRCB, "HTTP_SEC_WEBSOCKET_KEY",  pRCB->lp_cgievar, 0);
   strncpy(sec_websocket_key, (char *) pRCB->lp_cgievar->lp_buffer, 250);
   sec_websocket_key[250] = '\0';

   cspGetServerVariable(pRCB, "HTTP_SEC_WEBSOCKET_PROTOCOL",  pRCB->lp_cgievar, 0);
   strncpy(sec_websocket_protocol, (char *) pRCB->lp_cgievar->lp_buffer, 30);
   sec_websocket_protocol[30] = '\0';

   cspGetServerVariable(pRCB, "HTTP_SEC_WEBSOCKET_VERSION", pRCB->lp_cgievar, 0);
   protocol_version = (int) strtol((char *) pRCB->lp_cgievar->lp_buffer, NULL, 10);
/*
   {
      char buffer[2048];
      sprintf(buffer, "host=%s; sec_websocket_key=%s; sec_websocket_protocol=%s; protocol_version=%d; pRCB->csp_lib_path=%s;", host, sec_websocket_key, sec_websocket_protocol, protocol_version, pRCB->r->uri.data);
      cspLogEvent(buffer, "WebSocket");
   }
*/

   if ((*host) && (*sec_websocket_key) && ((protocol_version == 7) || (protocol_version == 8) || (protocol_version == 13))) {

      pRCB->p_websocket = (LPCSPWS) ngx_palloc(pRCB->r->pool, sizeof(CSPWS));
      pRCB->p_websocket->status = 0;
      pRCB->p_websocket->closing = 0;
      pRCB->p_websocket->protocol_version = protocol_version;
      strcpy(pRCB->p_websocket->websocket_id, sec_websocket_key);
/*
      {
         char buffer[256];
         sprintf(buffer, "WebSocket Connection: Protocol=%d;", protocol_version);
         cspLogEvent((char *) pRCB->r->uri.data, buffer);
      }
*/
      strcpy(token, sec_websocket_key);
      strcat(token, CSP_WS_WEBSOCKET_GUID);

      cspgwdso.p_csp_x_sha1((unsigned char *) hash, (const unsigned char *) token, (int) strlen(token));
      hash[20] = '\0';

      n = cspgwdso.p_csp_x_b64_encode(hash, sec_websocket_accept, 20, 0);

      sec_websocket_accept[n] = '\0';

      /* CMT1735 */
      strcpy(header, "");
      strcat(header, "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ");
      strcat(header, sec_websocket_accept);
      strcat(header, "\r\n");
      if (sec_websocket_protocol[0]) {
         strcat(header, "Sec-WebSocket-Protocol: ");
         strcat(header, sec_websocket_protocol);
         strcat(header, "\r\n");
      }
      strcat(header, "\r\n");
/*
      ngx_log_error(NGX_LOG_ERR, pRCB->r->connection->log, 0, "WebGateway Resonse Header: %s", header);
*/
/*
      cspLogEvent(header, "WebSocket Header");
*/
      pRCB->r->headers_out.status = NGX_HTTP_SWITCHING_PROTOCOLS;

      clen = (int) strlen(header);
      pbuffer = ngx_pcalloc(pRCB->r->pool, 4096);
      strcpy(pbuffer, header);

      b = ngx_pcalloc(pRCB->r->pool, sizeof(ngx_buf_t));
      if (b == NULL) {
         ngx_log_error(NGX_LOG_ERR, pRCB->r->connection->log, 0, "Failed to allocate response buffer.");
         return 0;
      }

      b->pos = (u_char *) pbuffer; /* first position in memory of the data */
      b->last = (u_char *) (pbuffer + clen); /* last position */

      b->memory = 1; /* content is in read-only memory */
      /* (i.e., filters should copy it rather than rewrite in place) */

      b->last_buf = 1; /* there will be no more buffers in the request */

      /* Now the module attaches it to the chain link: */

      out.buf = b;
      out.next = NULL;

      ngx_http_output_filter(pRCB->r, &out);

      pRCB->websocket_upgrade = 2;

      if (pRCB->websocket_upgrade != 2) {
         ngx_pfree(pRCB->r->pool, (void *) pRCB->p_websocket);
         pRCB->p_websocket = NULL;
/*
         sprintf(header, "WebSocket Error (%d)", rc);
         cspLogEvent(header, "This Web Server does not support WebSockets");
*/
         cspMemFree(pRCB, pRCB->lp_cgievar);
         return 0;
      }

      pRCB->lp_httpd = (LPCSPHTTPD) ngx_pcalloc(pRCB->r->pool, sizeof(CSPHTTPD));
      if (!pRCB->lp_httpd) {
         cspMemFree(pRCB, pRCB->lp_cgievar);
         return 0;
      }

      pRCB->lp_httpd->context = 0;

      pRCB->lp_httpd->lp_request = (LPMEMOBJ) ngx_pcalloc(pRCB->r->pool, sizeof(MEMOBJ));
      if (!pRCB->lp_httpd->lp_request) {
         cspMemFree(pRCB, pRCB->lp_cgievar);
         return 0;
      }
      cspMemInit(pRCB, pRCB->lp_httpd->lp_request, CACHE_BUFFER, CACHE_BUFFER);

      pRCB->lp_httpd->lp_response = (LPMEMOBJ) ngx_pcalloc(pRCB->r->pool, sizeof(MEMOBJ));
      if (!pRCB->lp_httpd->lp_response) {
         cspMemFree(pRCB, pRCB->lp_cgievar);
         return 0;
      }

      cspMemInit(pRCB, pRCB->lp_httpd->lp_response, CACHE_BUFFER, CACHE_BUFFER);

      /* The main data framing loop */

      cspWSDataFraming(pRCB);

      cspMemFree(pRCB, pRCB->lp_cgievar);
   }

   return 1;
}


int cspWSTestRequest(RCB *pRCB, LPMEMOBJ lp_cgievar)
{
   int upgrade_connection;

   upgrade_connection = 0;

   if (pRCB->r->method == NGX_HTTP_GET) {

      int lenu, lenc;
      char *p, *pa, *pz;
      char upgrade[128];
      char connection[256];

      p = NULL;
      pz = NULL;
      lenu = cspGetServerVariable(pRCB, "HTTP_UPGRADE", lp_cgievar, 0);
      strncpy(upgrade, (char *) lp_cgievar->lp_buffer, 32);
      upgrade[32] = '\0';
      cspLCase(upgrade);

      lenc = cspGetServerVariable(pRCB, "HTTP_CONNECTION", lp_cgievar, 0);
      strncpy(connection, (char *) lp_cgievar->lp_buffer, 250);
      connection[250] = '\0';
      cspLCase(connection);

      if (lenu && lenc && !strcmp(upgrade, "websocket")) {
         upgrade_connection = !strcmp(connection, "upgrade");
         if (!upgrade_connection) {

            p = connection;
            while (p && *p) { /* Parse the Connection value */

               while (*p == ' ')
                  p ++;

               pz = strstr(p, ",");
               if (pz) {
                  *pz = '\0';
               }
               pa = strstr(p, " ");
               if (pa)
                  *pa = '\0';
               pa = strstr(p, ";");
               if (pa)
                  *pa = '\0';
               upgrade_connection = !strcmp(p, "upgrade");
               if (upgrade_connection) {
                  break;
               }
               p = pz + 1;
            }
         }
      }
   }

   return upgrade_connection;
}


size_t cspWSClientSendBlock(RCB *pRCB, const int type, unsigned char *buffer, const size_t buffer_size, short context)
{
   csp_uint64_t payload_length = (csp_uint64_t) ((buffer != NULL) ? buffer_size : 0);
   size_t written = 0;

/*
{
   char buffer[256];
   T_SPRINTF(buffer, _cspso(buffer), "cspWSClientSendBlock pRCB=%p; type=%d; buffer_size=%lu; pRCB->p_websocket=%d;", pRCB, type, buffer_size, pRCB->p_websocket ? pRCB->p_websocket->closed : -1);
   cspLogEvent(buffer, "cspWSClientSendBlock", 0);
}
*/
   /* Deal with size more that 63 bits - FIXME */

   if (pRCB->p_websocket != NULL) {
      CSPWS *state = pRCB->p_websocket;

      if (type == CSP_WS_MESSAGE_TYPE_CLOSE) {
         if (pRCB->p_websocket->closed) {
            return 0;
         }
         else {
            pRCB->p_websocket->closed = 1;
         }
      }

      if (!state->closing) {
         unsigned char header[32];
         size_t pos = 0;
         unsigned char opcode;

         switch (type) {
            case CSP_WS_MESSAGE_TYPE_TEXT:
               opcode = CSP_WS_OPCODE_TEXT;
               break;
            case CSP_WS_MESSAGE_TYPE_BINARY:
               opcode = CSP_WS_OPCODE_BINARY;
               break;
            case CSP_WS_MESSAGE_TYPE_PING:
               opcode = CSP_WS_OPCODE_PING;
               break;
            case CSP_WS_MESSAGE_TYPE_PONG:
               opcode = CSP_WS_OPCODE_PONG;
               break;
            case CSP_WS_MESSAGE_TYPE_CLOSE:
               state->closing = 1;
               opcode = CSP_WS_OPCODE_CLOSE;
               break;
            default:
               state->closing = 1;
               opcode = CSP_WS_OPCODE_CLOSE;
               break;
         }
         header[pos++] = CSP_WS_FRAME_SET_FIN(1) | CSP_WS_FRAME_SET_OPCODE(opcode);
         if (payload_length < 126) {
            header[pos++] = CSP_WS_FRAME_SET_MASK(0) | CSP_WS_FRAME_SET_LENGTH(payload_length, 0);
         }
         else {
            if (payload_length < 65536) {
               header[pos++] = CSP_WS_FRAME_SET_MASK(0) | 126;
            }
            else {
               header[pos++] = CSP_WS_FRAME_SET_MASK(0) | 127;
               header[pos++] = CSP_WS_FRAME_SET_LENGTH(payload_length, 7);
               header[pos++] = CSP_WS_FRAME_SET_LENGTH(payload_length, 6);
               header[pos++] = CSP_WS_FRAME_SET_LENGTH(payload_length, 5);
               header[pos++] = CSP_WS_FRAME_SET_LENGTH(payload_length, 4);
               header[pos++] = CSP_WS_FRAME_SET_LENGTH(payload_length, 3);
               header[pos++] = CSP_WS_FRAME_SET_LENGTH(payload_length, 2);
            }
            header[pos++] = CSP_WS_FRAME_SET_LENGTH(payload_length, 1);
            header[pos++] = CSP_WS_FRAME_SET_LENGTH(payload_length, 0);
         }

         cspWSWriteBuffer(pRCB->p_cspxreq, (unsigned char *) header, (int) pos); /* Header */

         if (payload_length > 0) {
            if (cspWSWriteBuffer(pRCB->p_cspxreq, (unsigned char *) buffer, (int) buffer_size) > 0) { /* Payload Data */
               written = buffer_size;
            }
         }
      }
   }

   return written;
}


/*
 * Read a buffer of data from the input stream.
 */
size_t cspWSReadClientBlock(RCB *pRCB, char *buffer, size_t bufsiz, size_t *remaining_length)
{
   int n, offs;
   size_t get;
   long long payload_length;

   offs = 0;
   payload_length = 0;

   if (*remaining_length == 0) {

      n = cspWSReadBuffer(pRCB->p_cspxreq, (unsigned char *) buffer, 6);

      offs = 6;

      if (n == 0) {
         /*
         {
            char buffer1[256];
            sprintf(buffer1, "csp_ws_read_block: n=%d; client_read_error=%d", n, 0);
            cspLogBuffer((unsigned char *) buffer, n, buffer1);
         }
         */

         return n;
      }
      payload_length = (long long) CSP_WS_FRAME_GET_PAYLOAD_LEN((unsigned char) buffer[1]);
      if (payload_length == 126) {
         n = cspWSReadBuffer(pRCB->p_cspxreq, (unsigned char *)buffer + offs, 2);
         offs += 2;
         if (n == 0) {
            return n;
         }
         payload_length = (((unsigned char) buffer[2]) * 256) + ((unsigned char) buffer[3]);
      }
      else if (payload_length == 127) {
         n = cspWSReadBuffer(pRCB->p_cspxreq, (unsigned char *) buffer + offs, 8);

         offs += 8;
         if (n == 0) {
            return n;
         }
         payload_length = 0;
#if defined(_WIN64)
         payload_length += (((unsigned char) buffer[2]) * 256 * 256 * 256 * 256 * 256 * 256 * 256);
         payload_length += (((unsigned char) buffer[3]) * 256 * 256 * 256 * 256 * 256 * 256);
         payload_length += (((unsigned char) buffer[4]) * 256 * 256 * 256 * 256 * 256);
         payload_length += (((unsigned char) buffer[5]) * 256 * 256 * 256 * 256);
#endif
         payload_length += (((unsigned char) buffer[6]) * 256 * 256 * 256);
         payload_length += (((unsigned char) buffer[7]) * 256 * 256);
         payload_length += (((unsigned char) buffer[8]) * 256);
         payload_length += (((unsigned char) buffer[9]));
      }

      *remaining_length = (size_t) payload_length;
   }


   if ((*remaining_length + (offs + 1)) < bufsiz)
      get = *remaining_length;
   else
      get = (bufsiz - (offs + 1));

   /*
   {
      char buf[256];
      sprintf(buf, "bufsiz=%lu; payload_length=%lu; remaining_length=%lu; get=%lu; offs=%d;", (unsigned long) bufsiz, (unsigned long) payload_length, (unsigned long) *remaining_length, (unsigned long) get, offs);
      cspLogEvent(buf, "CSP_WS_DATA_FRAMING_PAYLOAD_LENGTH A");
   }
   */

   n = cspWSReadBuffer(pRCB->p_cspxreq, (unsigned char *) buffer + offs, (int) get);

   *remaining_length -= n;

   return (n + offs);
}


/*
 * The data framing handler requires that the server state mutex is locked by
 * the caller upon entering this function. It will be locked when leaving too.
 */

void cspWSDataFraming(RCB *pRCB)
{
   int n;
   csp_int64_t payload_limit;
   CSPWS *state = pRCB->p_websocket;
   CSPXUTF8DATA utf8_data;

   payload_limit = 32 * 1024 * 1024;

   n = ngx_blocking(pRCB->r->connection->fd);
   if (n) {
      return;
   }

   cspgwdso.p_csp_x_utf8_data(&utf8_data);

   if (pRCB->p_websocket) {
      unsigned char block[CSP_WS_BLOCK_DATA_SIZE];
      csp_int64_t block_size;
      csp_int64_t extension_bytes_remaining = 0;
      csp_int64_t payload_length = 0;
      csp_int64_t mask_offset = 0;
      size_t remaining_length;
      int framing_state = CSP_WS_DATA_FRAMING_START;
      int payload_length_bytes_remaining = 0;
      int mask_index = 0, masking = 0;
      unsigned char mask[4] = { 0, 0, 0, 0 };
      unsigned char fin = 0, opcode = 0xFF;
      CSPWSFD control_frame = { 0, NULL, 1, 8, 0 };
      CSPWSFD message_frame = { 0, NULL, 1, 0, 0 };
      CSPWSFD *frame = &control_frame;
      unsigned short status_code = CSP_WS_STATUS_CODE_OK;
      unsigned char status_code_buffer[2];

      control_frame.utf8_state = utf8_data.utf8_valid;
      message_frame.utf8_state = utf8_data.utf8_valid;

      remaining_length = 0;
      while ((framing_state != CSP_WS_DATA_FRAMING_CLOSE) && ((block_size = cspWSReadClientBlock(pRCB, (char *) block, sizeof(block), &remaining_length)) > 0)) {
         csp_int64_t block_offset = 0;

         if (block_size < 1) { /* CMT1281 */
            framing_state = CSP_WS_DATA_FRAMING_CLOSE;
            status_code = CSP_WS_STATUS_CODE_PROTOCOL_ERROR;
            /*
               cspLogEvent("Zero Length Frame Read", "WebSocket Error: Client Read");
            */
            break;
         }

         while (block_offset < block_size) {
            switch (framing_state) {
               case CSP_WS_DATA_FRAMING_START:
                  /*
                   * Since we don't currently support any extensions,
                   * the reserve bits must be 0
                   */
                  if ((CSP_WS_FRAME_GET_RSV1(block[block_offset]) != 0) ||
                      (CSP_WS_FRAME_GET_RSV2(block[block_offset]) != 0) ||
                      (CSP_WS_FRAME_GET_RSV3(block[block_offset]) != 0)) {
                     framing_state = CSP_WS_DATA_FRAMING_CLOSE;
                     status_code = CSP_WS_STATUS_CODE_PROTOCOL_ERROR;
                     break;
                  }
                  fin = CSP_WS_FRAME_GET_FIN(block[block_offset]);
                  opcode = CSP_WS_FRAME_GET_OPCODE(block[block_offset++]);

                  framing_state = CSP_WS_DATA_FRAMING_PAYLOAD_LENGTH;

                  if (opcode >= 0x8) { /* Control frame */
                     if (fin) {
                        frame = &control_frame;
                        frame->opcode = opcode;
                        frame->utf8_state = utf8_data.utf8_valid;
                     }
                     else {
                        framing_state = CSP_WS_DATA_FRAMING_CLOSE;
                        status_code = CSP_WS_STATUS_CODE_PROTOCOL_ERROR;
                        break;
                     }
                  }
                  else { /* Message frame */
                     frame = &message_frame;
                     if (opcode) {
                        if (frame->fin) {
                           frame->opcode = opcode;
                           frame->utf8_state = utf8_data.utf8_valid;
                        }
                        else {
                           framing_state = CSP_WS_DATA_FRAMING_CLOSE;
                           status_code = CSP_WS_STATUS_CODE_PROTOCOL_ERROR;
                           break;
                        }
                     }
                     else if (frame->fin || ((opcode = frame->opcode) == 0)) {
                        framing_state = CSP_WS_DATA_FRAMING_CLOSE;
                        status_code = CSP_WS_STATUS_CODE_PROTOCOL_ERROR;
                        break;
                     }
                     frame->fin = fin;
                  }
                  payload_length = 0;
                  payload_length_bytes_remaining = 0;

                  if (block_offset >= block_size) {
                     break; /* Only break if we need more data */
                  }
               case CSP_WS_DATA_FRAMING_PAYLOAD_LENGTH:
                  payload_length = (csp_int64_t) CSP_WS_FRAME_GET_PAYLOAD_LEN(block[block_offset]);
                  masking = CSP_WS_FRAME_GET_MASK(block[block_offset ++]);

                  if (payload_length == 126) {
                     payload_length = 0;
                     payload_length_bytes_remaining = 2;
                  }
                  else if (payload_length == 127) {
                     payload_length = 0;
                     payload_length_bytes_remaining = 8;
                  }
                  else {
                     payload_length_bytes_remaining = 0;
                  }
                  if ((masking == 0) ||   /* Client-side mask is required */
                      ((opcode >= 0x8) && /* Control opcodes cannot have a payload larger than 125 bytes */
                      (payload_length_bytes_remaining != 0))) {
                     framing_state = CSP_WS_DATA_FRAMING_CLOSE;
                     status_code = CSP_WS_STATUS_CODE_PROTOCOL_ERROR;
                     break;
                  }
                  else {
                     framing_state = CSP_WS_DATA_FRAMING_PAYLOAD_LENGTH_EXT;
                  }
                  if (block_offset >= block_size) {
                     break;  /* Only break if we need more data */
                  }
               case CSP_WS_DATA_FRAMING_PAYLOAD_LENGTH_EXT:
                  while ((payload_length_bytes_remaining > 0) && (block_offset < block_size)) {
                     payload_length *= 256;
                     payload_length += block[block_offset++];
                     payload_length_bytes_remaining--;
                  }
                  if (payload_length_bytes_remaining == 0) {
                     if ((payload_length < 0) ||
                         (payload_length > payload_limit)) {
                        /* Invalid payload length */
                        framing_state = CSP_WS_DATA_FRAMING_CLOSE;
                        status_code = (state->protocol_version >= 13) ? CSP_WS_STATUS_CODE_MESSAGE_TOO_LARGE : CSP_WS_STATUS_CODE_RESERVED;
                        break;
                      }
                      else if (masking != 0) {
                         framing_state = CSP_WS_DATA_FRAMING_MASK;
                      }
                      else {
                         framing_state = CSP_WS_DATA_FRAMING_EXTENSION_DATA;
                         break;
                      }
                  }
                  if (block_offset >= block_size) {
                     break;  /* Only break if we need more data */
                  }
               case CSP_WS_DATA_FRAMING_MASK:
                  while ((mask_index < 4) && (block_offset < block_size)) {
                     mask[mask_index++] = block[block_offset++];
                  }
                  if (mask_index == 4) {
                     framing_state = CSP_WS_DATA_FRAMING_EXTENSION_DATA;
                     mask_offset = 0;
                     mask_index = 0;
                     if ((mask[0] == 0) && (mask[1] == 0) && (mask[2] == 0) && (mask[3] == 0)) {
                        masking = 0;
                     }
                  }
                  else {
                     break;
                  }
                  /* Fall through */
               case CSP_WS_DATA_FRAMING_EXTENSION_DATA:
                  /* Deal with extension data when we support them -- FIXME */
                  if (extension_bytes_remaining == 0) {
                     if (payload_length > 0) {
                        frame->application_data = (unsigned char *) realloc(frame->application_data, (size_t) (frame->application_data_offset + payload_length));
                        if (frame->application_data == NULL) {
                           framing_state = CSP_WS_DATA_FRAMING_CLOSE;
                           status_code = (state->protocol_version >= 13) ? CSP_WS_STATUS_CODE_INTERNAL_ERROR : CSP_WS_STATUS_CODE_GOING_AWAY;
                           break;
                        }
                     }
                     framing_state = CSP_WS_DATA_FRAMING_APPLICATION_DATA;
                  }
                  /* Fall through */
               case CSP_WS_DATA_FRAMING_APPLICATION_DATA:
                  {
                     csp_int64_t block_data_length;
                     csp_int64_t block_length = 0;
                     csp_uint64_t application_data_offset = frame->application_data_offset;
                     unsigned char *application_data = frame->application_data;

                     block_length = block_size - block_offset;
                     block_data_length = (payload_length > block_length) ? block_length : payload_length;
                     if (masking) {
                        csp_int64_t i;

                        if (opcode == CSP_WS_OPCODE_TEXT) {
                           unsigned int utf8_state = frame->utf8_state;
                           unsigned char c;

                           for (i = 0; i < block_data_length; i++) {
                              c = block[block_offset++] ^mask[mask_offset++ & 3];
                              utf8_state = *(utf8_data.validate_utf8 + (utf8_state + c));
                              if (utf8_state == utf8_data.utf8_invalid) {
                                 payload_length = block_data_length;
                                 break;
                              }


                              application_data[application_data_offset++] = c;
                           }
                           frame->utf8_state = utf8_state;
                        }
                        else {
                           /* Need to optimize the unmasking -- FIXME */
                           for (i = 0; i < block_data_length; i++) {
                              application_data[application_data_offset++] = block[block_offset++] ^mask[mask_offset++ & 3];
                           }
                        }
                     }
                     else if (block_data_length > 0) {
                        memcpy(&application_data[application_data_offset], &block[block_offset], (size_t) block_data_length);
                        if (opcode == CSP_WS_OPCODE_TEXT) {
                           csp_int64_t i, application_data_end = application_data_offset + block_data_length;
                           unsigned int utf8_state = frame->utf8_state;

                           for (i = application_data_offset; i < application_data_end; i++) {
                              utf8_state = *(utf8_data.validate_utf8 + (utf8_state + application_data[i]));
                              if (utf8_state == utf8_data.utf8_invalid) {
                                 payload_length = block_data_length;
                                 break;
                              }


                           }
                           frame->utf8_state = utf8_state;
                        }
                        application_data_offset += block_data_length;
                        block_offset += block_data_length;
                     }
                     payload_length -= block_data_length;
                     if (payload_length == 0) {
                        int message_type = CSP_WS_MESSAGE_TYPE_INVALID;

                        switch (opcode) {
                           case CSP_WS_OPCODE_TEXT:
                              if ((fin && (frame->utf8_state != utf8_data.utf8_valid)) || (frame->utf8_state == utf8_data.utf8_invalid)) {
                                 framing_state = CSP_WS_DATA_FRAMING_CLOSE;
                                 status_code = CSP_WS_STATUS_CODE_INVALID_UTF8;
                              }
                              else {
                                 message_type = CSP_WS_MESSAGE_TYPE_TEXT;
                              }
                              break;
                           case CSP_WS_OPCODE_BINARY:
                              message_type = CSP_WS_MESSAGE_TYPE_BINARY;
                              break;
                           case CSP_WS_OPCODE_CLOSE:
                              framing_state = CSP_WS_DATA_FRAMING_CLOSE;
                              status_code = CSP_WS_STATUS_CODE_OK;
                              break;
                           case CSP_WS_OPCODE_PING:
                              cspWSClientSendBlock(pRCB, CSP_WS_MESSAGE_TYPE_PONG, (unsigned char *) application_data, (size_t) application_data_offset, 0);
                              break;
                           case CSP_WS_OPCODE_PONG:
                              break;
                           default:
                              framing_state = CSP_WS_DATA_FRAMING_CLOSE;
                              status_code = CSP_WS_STATUS_CODE_PROTOCOL_ERROR;
                              break;
                        }
                        if (fin && (message_type != CSP_WS_MESSAGE_TYPE_INVALID)) {
                           cspWSClientSendBlock(pRCB, message_type, (unsigned char *) application_data, (size_t) application_data_offset, 0);
                        }
                        if (framing_state != CSP_WS_DATA_FRAMING_CLOSE) {
                           framing_state = CSP_WS_DATA_FRAMING_START;

                           if (fin) {
                              if (frame->application_data != NULL) {
                                 free(frame->application_data);
                                 frame->application_data = NULL;
                              }
                              application_data_offset = 0;
                           }
                        }
                    }
                    frame->application_data_offset = application_data_offset;
                  }
                  break;
               case CSP_WS_DATA_FRAMING_CLOSE:
                  block_offset = block_size;
                  break;
               default:
                  framing_state = CSP_WS_DATA_FRAMING_CLOSE;
                  status_code = CSP_WS_STATUS_CODE_PROTOCOL_ERROR;
                  break;
            }
         }
      }
      if (message_frame.application_data != NULL) {
         free(message_frame.application_data);
      }
      if (control_frame.application_data != NULL) {
         free(control_frame.application_data);
      }

      /* Send server-side closing handshake */
      status_code_buffer[0] = (status_code >> 8) & 0xFF;
      status_code_buffer[1] = status_code & 0xFF;
      cspWSClientSendBlock(pRCB, CSP_WS_MESSAGE_TYPE_CLOSE, (unsigned char *) status_code_buffer, sizeof(status_code_buffer), 0);
   }

   n = ngx_nonblocking(pRCB->r->connection->fd);
   return;
}

#endif /* #if defined(CSP_WEBSOCKET_TEST) */

