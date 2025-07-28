import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { error } from 'console';
import { CookieService } from 'ngx-cookie-service';
import {
  asyncScheduler,
  scheduled,
  switchMap,
  Observable,
  map,
  catchError,
  of,
} from 'rxjs';

export const authGuard: (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => Observable<GuardResult> = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  let returnVal: Observable<GuardResult> = scheduled(
    [router.parseUrl('/login')],
    asyncScheduler
  );
  const http = inject(HttpClient);
  const authToken = cookieService.get('userToken');
  if (!authToken) {
    router.navigate(['login']);
    return returnVal;
  }

  return http.post('http://localhost:4200/api/auth/Check/', {}, {}).pipe(
    map(() => {
      return true;
    }),
    catchError(() => {
      router.navigate(['login']);
      cookieService.delete('userToken');
      return scheduled([false], asyncScheduler);
    })
  );
  
};
