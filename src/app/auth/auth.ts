import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor() {}
}

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const cookieService = inject(CookieService);
  const authToken = cookieService.get('userToken');
  let newReq;
  if (authToken && !req.headers.has('Authorization')) {
    newReq = req.clone({
      headers: req.headers.append('Authorization', `Token ${authToken}`),
    });
  } else {
    newReq = req.clone();
  }
  return next(newReq);
}
