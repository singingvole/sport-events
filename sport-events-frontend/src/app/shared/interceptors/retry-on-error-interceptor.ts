import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, EMPTY, Observable, retry, throwError } from 'rxjs';

const RETRY_COUNT = 100;
const RETRY_DELAY_MS = 3000;
@Injectable()
export class RetryOnErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        console.log(error);
        return error.status === 0 ? throwError(() => error) : EMPTY;
      }),
      retry({ count: RETRY_COUNT, delay: RETRY_DELAY_MS })
    );
  }
}
