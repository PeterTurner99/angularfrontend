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
    console.log(req.headers)

  const cookieService = inject(CookieService);
  const router = inject(Router);
  const authToken = cookieService.get('userToken');
  console.log(authToken, 'athuu test');
  let newReq;
  if (authToken) {
    newReq = req.clone({
      headers: req.headers.append('Authorization', `Token ${authToken}`),
    });
  } else {
    newReq = req.clone();
  }
  console.log(newReq);
  return next(newReq);
}
