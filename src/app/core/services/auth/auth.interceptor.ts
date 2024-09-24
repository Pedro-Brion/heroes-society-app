import {
  HttpRequest,
  HttpHandler,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const newRequest = req.clone({
    headers: inject(AuthService).authorizationHeaders(req.headers),
  });

  return next(newRequest);
}
