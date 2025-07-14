import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, GuardResult, Router, UrlTree } from '@angular/router';
import { error } from 'console';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  let returnVal: GuardResult = router.parseUrl('/login');
  const http = inject(HttpClient);
  const authToken = cookieService.get('userToken');
  if (!authToken) {
    router.navigate(['login']);
    return returnVal;
  }
  if (
    http.post('http://localhost:4200/api/auth/Check/', {}, {}).subscribe({
      next: (config) => {
        console.log('testtttt');
        return true;
      },
      error: () => {
        cookieService.delete('userToken');
      },
    })
  ) {
    returnVal = true;
  }
  return returnVal;
};
