/*
   Chris Munt: Universal Gateway Modules.
               API Definition

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


#ifndef CSPAPI_H
#define CSPAPI_H

#if !defined(CSP_UNIVERSAL_API_LEVEL)
#define CSP_UNIVERSAL_API_LEVEL  6
#endif

#define CSP_REQ_INFO_NONE        0
#define CSP_REQ_INFO_TEMPFILE    1

#if !defined(_WIN32)
#define WINAPI
#endif

typedef struct tagCSPXGWVERS {
   int   api_level; /* CMT1515 */
   int   gw_build_major;
   int   gw_build_minor;
   char  gw_build[32];
   char  gw_version[32];
} CSPXGWVERS, * LPCSPXGWVERS;


typedef struct tagCSPXSYS {
   int   api_level; /* CMT1515 */
   short mod_build;
   char  mod_type_short[16];
   char  mod_type_long[32];
   int   server_port;
   char  module_path[256];
} CSPXSYS, * LPCSPXSYS;


typedef struct tagCSPXWRK {
   CSPXSYS  *p_cspxsys;
} CSPXWRK, * LPCSPXWRK;


typedef struct tagCSPXREQ {
   CSPXWRK  *p_cspxwrk;
   short    context;
   short    ws_sends_header;
   short    keepalive;
   char     uri[256];
   char     *pheader;
   int      (* p_client_read)             (struct tagCSPXREQ * p_cspxreq, unsigned char * buffer, int buffer_size);
   int      (* p_client_write)            (struct tagCSPXREQ * p_cspxreq, unsigned char * buffer, int buffer_size);
   int      (* p_send_response_headers)   (struct tagCSPXREQ * p_cspxreq, char * headers);
   int      (* p_get_server_variables)    (struct tagCSPXREQ * p_cspxreq);
   int      (* p_ws_start)                (struct tagCSPXREQ * p_cspxreq);
   int      (* p_ws_client_read)          (struct tagCSPXREQ * p_cspxreq, unsigned char * buffer, int buffer_size);
   int      (* p_ws_client_write)         (struct tagCSPXREQ * p_cspxreq, const unsigned char *buffer, int buffer_size);
   int      (* p_ws_end)                  (struct tagCSPXREQ * p_cspxreq);
   void     *p_wsreq;
   void     *p_gwreq;
   short    info; /* CMT1253 */
   short    websocket_upgrade; /* CMT1658 */
   short    s2;
   int      i1;
   int      i2;
   long     l1;
   long     l2;
   void     *p1;
   void     *p2;
   char     buffer[256];
} CSPXREQ, * LPCSPXREQ;

typedef struct tagCSPXUTF8DATA {
   unsigned int utf8_valid;
   unsigned int utf8_invalid;
   unsigned short *validate_utf8;
} CSPXUTF8DATA, * LPCSPXUTF8DATA;


typedef int    (WINAPI * LPFN_CSP_X_VERSION)          (CSPXGWVERS *p_cspxgwvers);
typedef int    (WINAPI * LPFN_CSP_X_REQ_HANDLER)      (CSPXREQ *p_cspxreq);
typedef int    (WINAPI * LPFN_CSP_X_SERVER_VARIABLE)  (CSPXREQ *p_cspxreq, char *name, char *value);
typedef int    (WINAPI * LPFN_CSP_X_SYS_STARTUP)      (CSPXSYS *p_cspxsys);
typedef int    (WINAPI * LPFN_CSP_X_SYS_CLOSEDOWN)    (CSPXSYS *p_cspxsys);
typedef int    (WINAPI * LPFN_CSP_X_WRK_STARTUP)      (CSPXWRK *p_cspxwrk);
typedef int    (WINAPI * LPFN_CSP_X_WRK_CLOSEDOWN)    (CSPXWRK *p_cspxwrk);
typedef int    (WINAPI * LPFN_CSP_X_SHA1)             (unsigned char * sha1, const unsigned char *data, unsigned long data_len);
typedef int    (WINAPI * LPFN_CSP_X_B64_ENCODE)       (char *from, char *to, int length, int quads);
typedef int    (WINAPI * LPFN_CSP_X_B64_DECODE)       (char *from, char *to, int length);
typedef int    (WINAPI * LPFN_CSP_X_UTF8_DATA)        (CSPXUTF8DATA *p_cspxutf8data);


int WINAPI           csp_x_version                    (CSPXGWVERS *p_cspxgwvers);
int WINAPI           csp_x_req_handler                (CSPXREQ *p_cspxreq);
int WINAPI           csp_x_server_variable            (CSPXREQ *p_cspxreq, char *name, char *value);
int WINAPI           csp_x_sys_startup                (CSPXSYS *p_cspxsys);
int WINAPI           csp_x_sys_closedown              (CSPXSYS *p_cspxsys);
int WINAPI           csp_x_wrk_startup                (CSPXWRK *p_cspxwrk);
int WINAPI           csp_x_wrk_closedown              (CSPXWRK *p_cspxwrk);
int WINAPI           csp_x_sha1                       (unsigned char * sha1, const unsigned char *data, unsigned long data_len);
int WINAPI           csp_x_b64_encode                 (char *from, char *to, int length, int quads);
int WINAPI           csp_x_b64_decode                 (char *from, char *to, int length);
int WINAPI           csp_x_utf8_data                  (CSPXUTF8DATA *p_cspxutf8data);


#endif /* #ifndef CSPAPI_H */
