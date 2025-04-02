/* 
   Common declarations and definitions for the interface between an Nginx web server and the Web
   Gateway, used by NSD and dynamic modules. Unlike typical header files, this file contains
   function definitions because Nginx requires that an addon be built from a single .c file and any
   included headers. Code that is shared between two addons (one for the NSD and one for the dynamic
   modules), including function definitions, must live in a header file to avoid code duplication.

   Cache Server Pages:

      +--------------------------------------------------------+
      | Copyright 1986-2019 by InterSystems Corporation,       |
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

#ifndef NGX_HTTP_CSP_COMMON_H
#define NGX_HTTP_CSP_COMMON_H

#include <ngx_config.h>
#include <ngx_core.h>
#include <ngx_http.h>
#include <nginx.h>

#ifndef _WIN32
#include <pthread.h>
#include <semaphore.h>
#endif


/* Enable AOD052 on all platforms except MacOS  */
#ifndef __APPLE__
#define CSP_AOD052
#endif


/* Thread synchronization. We use semaphores instead of condition variables because the Nginx build
 * procedure on Windows uses the Windows XP version of the Windows headers. Condition variables were
 * not available until Windows Vista. */

#if defined(_WIN32)
typedef CRITICAL_SECTION csp_mutex_t;
typedef HANDLE csp_sem_t;
#else
typedef pthread_mutex_t csp_mutex_t;
typedef sem_t csp_sem_t;
#endif



/* state of writing data to client */

#define CSP_WSTATUS_ERROR   0  // error occurred while writing to client
#define CSP_WSTATUS_WRITING 1  // in the middle of writing to client
#define CSP_WSTATUS_DONE    2  // finished writing to client

typedef struct {
   int                        wstatus;           // CSP_WSTATUS_ERROR, CSP_WSTATUS_WRITING, or CSP_WSTATUS_DONE
   csp_mutex_t                wstatus_mutex;     // mutex for thread-safe access to `wstatus`
   csp_sem_t                  wstatus_sem;       // semaphore for waiting for response buffer to finish sending to client
   ngx_buf_t                  response_buffer;   // buffer to send to client
} csp_client_write_state_t;



/* thread synchronization function declarations */

int               cspMutexCreate                      (csp_mutex_t *mutex);
int               cspMutexAcquire                     (csp_mutex_t *mutex);
int               cspMutexRelease                     (csp_mutex_t *mutex);
int               cspMutexDestroy                     (csp_mutex_t *mutex);
int               cspSemCreate                        (csp_sem_t *sem);
int               cspSemWait                          (csp_sem_t *sem);
int               cspSemSignal                        (csp_sem_t *sem);
int               cspSemDestroy                       (csp_sem_t *sem);


/* client write function declarations */

int               cspInitClientWriteState             (csp_client_write_state_t *client_write_state);
void              cspDestroyClientWriteState          (csp_client_write_state_t *client_write_state);
void              cspChangeWstatus                    (csp_client_write_state_t *client_write_state, int new_wstatus);
static ngx_int_t  ngx_http_csp_set_write_handler      (ngx_http_request_t *r, ngx_http_event_handler_pt write_event_handler, csp_mutex_t *mutex);
int               ngx_http_csp_send_to_client         (ngx_http_request_t *r, ngx_http_event_handler_pt write_event_handler,
                                                         csp_mutex_t *mutex, csp_client_write_state_t *client_write_state,
                                                         u_char *buffer, int buffer_size);


/* thread synchronization function definitions */

/** Create a mutex. Return 0 on success, nonzero on failure.
 * Precondition: `mutex` is a non-NULL pointer to a region of memory that can be used to store a mutex. */
int cspMutexCreate(csp_mutex_t *mutex)
{
#ifdef _WIN32
   InitializeCriticalSection(mutex);
   return 0;
#else
   return pthread_mutex_init(mutex, NULL);
#endif
}

/** Acquire a mutex. Return 0 on success, nonzero on failure.
 * Preconditions:
 *    The current thread does not own the mutex.
 *    The mutex was created by cspMutexCreate(). */
int cspMutexAcquire(csp_mutex_t *mutex)
{
#ifdef _WIN32
   EnterCriticalSection(mutex);
   return 0;
#else
   return pthread_mutex_lock(mutex);
#endif
}

/** Release a mutex. Return 0 on success, nonzero on failure.
 * Precondition:
 *    The current thread owns the mutex. */
int cspMutexRelease(csp_mutex_t *mutex)
{
#ifdef _WIN32
   LeaveCriticalSection(mutex);
   return 0;
#else
   return pthread_mutex_unlock(mutex);
#endif
}

/** Destroy a mutex. Return 0 on success, nonzero on failure.
 * Preconditions:
 *    The mutex was created by cspMutexCreate().
 *    No thread owns or is trying to acquire the mutex. */
int cspMutexDestroy(csp_mutex_t *mutex)
{
#ifdef _WIN32
   DeleteCriticalSection(mutex);
   return 0;
#else
   return pthread_mutex_destroy(mutex);
#endif
}

/** Create a semaphore with initial count 0. Return 0 on success, nonzero on failure.
 * Precondition: `sem` is a non-NULL pointer to a region of memory that can store a semaphore. */
int cspSemCreate(csp_sem_t *sem)
{
#ifdef _WIN32
   *sem = CreateSemaphore(NULL, 0, LONG_MAX, NULL);
   return *sem == NULL;
#else
   return sem_init(sem, 0, 0);
#endif
}

/** Decrement a semaphore. Return 0 on success, nonzero on failure.
 * Precondition: `sem` was created by cspSemCreate(). */
int cspSemWait(csp_sem_t *sem)
{
#ifdef _WIN32
   return WaitForSingleObject(*sem, INFINITE) != WAIT_OBJECT_0;
#else
   return sem_wait(sem);
#endif
}

/** Increment a semaphore. Return 0 on sucess, nonzero on failure.
 * Precondition: `sem` was created by cspSemCreate(). */
int cspSemSignal(csp_sem_t *sem)
{
#ifdef _WIN32
   return ReleaseSemaphore(*sem, 1, NULL) == 0;
#else
   return sem_post(sem);
#endif
}

/** Destroy a semaphore. Return 0 on success, nonzero on failure.
 * Precondition: `sem` was created by cspSemCreate(). */
int cspSemDestroy(csp_sem_t *sem)
{
#ifdef _WIN32
   return CloseHandle(*sem) == 0;
#else
   return sem_destroy(sem);
#endif
}



/* Client write function definitions */

/** Initialize the client write state. Return 1 on success, 0 on failure.
 * Precondition: The worker thread that communicates with the Web Gateway hasn't yet been spawned. */
int cspInitClientWriteState(csp_client_write_state_t *client_write_state)
{
   memset(client_write_state, 0, sizeof(csp_client_write_state_t));
   if (cspMutexCreate(&(client_write_state->wstatus_mutex)) != 0 ||
        cspSemCreate(&(client_write_state->wstatus_sem)) != 0) {
      return 0;
   }
   // no need to protect this assignment with mutex because worker thread hasn't been spawned
   client_write_state->wstatus = CSP_WSTATUS_DONE;
   return 1;
}

/** Destroy the client write state.
 * Preconditions:
 *    The client write state was initialized with cspInitClientWriteState().
 *    No thread is using or will use the client write state. */
void cspDestroyClientWriteState(csp_client_write_state_t *client_write_state)
{
   cspMutexDestroy(&(client_write_state->wstatus_mutex));
   cspSemDestroy(&(client_write_state->wstatus_sem));
}

/** Change the client write status to `new_wstatus` and wake up the thread waiting for such a change.
 * Precondition:
 *    The calling thread does not hold client_write_state->wstatus_mutex or csp_nginx_mutex.
 *       (Otherwise, deadlocks are possible.) */
void cspChangeWstatus(csp_client_write_state_t *client_write_state, int new_wstatus)
{
   cspMutexAcquire(&(client_write_state->wstatus_mutex));
   client_write_state->wstatus = new_wstatus;
   cspSemSignal(&(client_write_state->wstatus_sem));
   cspMutexRelease(&(client_write_state->wstatus_mutex));
}

/** Set the write event handler that flushes data to the client. Return NGX_OK on success, NGX_ERROR
 * on failure. Inspired by ngx_http_set_write_handler() in src/http/ngx_http_request.c, which is how
 * Nginx sets a write event handler that flushes HTTP responses.
 * 
 * `mutex` is the mutex that this function uses to call thread-unsafe Nginx functions */
static ngx_int_t ngx_http_csp_set_write_handler(ngx_http_request_t *r, ngx_http_event_handler_pt write_event_handler, csp_mutex_t *mutex)
{
   r->write_event_handler = write_event_handler;
   ngx_event_t *wev = r->connection->write;

   if (wev->ready && wev->delayed) {
      return NGX_OK;
   }

   cspMutexAcquire(mutex);
   ngx_http_core_loc_conf_t *clcf = ngx_http_get_module_loc_conf(r, ngx_http_core_module);
   if (!wev->delayed) {
      ngx_add_timer(wev, clcf->send_timeout);
   }
   ngx_int_t rc = ngx_handle_write_event(wev, clcf->send_lowat);
   cspMutexRelease(mutex);
   if (rc != NGX_OK) {
      cspMutexAcquire(mutex);
      ngx_log_error(NGX_LOG_INFO, wev->log, 0,
                    "ngx_http_csp_set_write_handler: failed to handle write event");
      cspMutexRelease(mutex);
      return NGX_ERROR;
   }

   return NGX_OK;
}

/** Synchronously send a block of data to the client.
 * Parameters:
 *    r: the request
 *    write_event_handler: Event handler that flushes data to client.
 *    mutex: mutex that this function uses to call thread-unsafe Nginx functions
 *    client_write_state: state of writing data to client
 *    buffer: buffer to send to client
 *    buffer_size: size of buffer to send to client
 * Return Value:
 *    1 on success, 0 on failure */
int ngx_http_csp_send_to_client(ngx_http_request_t *r, ngx_http_event_handler_pt write_event_handler,
                                csp_mutex_t *mutex, csp_client_write_state_t *client_write_state,
                                u_char *buffer, int buffer_size)
{
   // initialize response buffer
   memset(&(client_write_state->response_buffer), 0, sizeof(ngx_buf_t));
   client_write_state->response_buffer.pos = buffer;
   client_write_state->response_buffer.last = buffer + buffer_size;
   client_write_state->response_buffer.memory = 1;
   client_write_state->response_buffer.flush = 1;
   ngx_chain_t out;
   out.buf = &(client_write_state->response_buffer);
   out.next = NULL;

   // send response buffer to client
   cspMutexAcquire(mutex);
   ngx_int_t rc = ngx_http_output_filter(r, &out);
   cspMutexRelease(mutex);
   int result = 1;
   if (rc == NGX_AGAIN) {
      // Socket is not ready for write. Set a write handler to send data when socket is ready, then
      // wait until write is complete or an error happens.
      ngx_http_event_handler_pt old_write_handler = r->write_event_handler;
      cspMutexAcquire(&(client_write_state->wstatus_mutex));
      client_write_state->wstatus = CSP_WSTATUS_WRITING;
      cspMutexRelease(&(client_write_state->wstatus_mutex));
      if (ngx_http_csp_set_write_handler(r, write_event_handler, mutex) == NGX_OK) {
         cspSemWait(&(client_write_state->wstatus_sem));
         cspMutexAcquire(&(client_write_state->wstatus_mutex));
         if (client_write_state->wstatus == CSP_WSTATUS_ERROR) {
            result = 0;
         }
         cspMutexRelease(&(client_write_state->wstatus_mutex));
      } else {
         result = 0;
      }
      r->write_event_handler = old_write_handler;
   } else if (rc != NGX_OK) {
      result = 0;
   }
   
   return result;
}

#endif  // #ifndef NGX_HTTP_CSP_COMMON_H
