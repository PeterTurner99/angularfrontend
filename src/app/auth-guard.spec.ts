import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { authGuard } from './auth-guard';
import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { asyncScheduler, Observable, scheduled, throwError } from 'rxjs';

describe('authGuard', () => {
  const mockRouter = jasmine.createSpyObj('Router', [
    'createUrlTree',
    'parseUrl',
    'navigate',
  ]);
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
          },
        },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });
  beforeEach(() => {
    mockRouter.createUrlTree.calls.reset();
    mockRouter.navigate.calls.reset();
  });
  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
  it('should redirect to login if no auth token passed', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    let cookieService = TestBed.inject(CookieService);
    cookieService.delete('userToken');
    const guardResponse = TestBed.runInInjectionContext(() => {
      return authGuard(activatedRoute.snapshot, {} as RouterStateSnapshot);
    });
    console.log(guardResponse, mockRouter.createUrlTree);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
  it('should return true if an auth token is passed', (done: DoneFn) => {
    const httpPass = {
      post: () => {
        return scheduled([false], asyncScheduler);
      },
    };
    // Override HttpClient provider with mock
    TestBed.overrideProvider(HttpClient, { useValue: httpPass });
    const activatedRoute = TestBed.inject(ActivatedRoute);
    let cookieService = TestBed.inject(CookieService);
    cookieService.set('userToken', 'test');
    const guardResponse: Observable<GuardResult> =
      TestBed.runInInjectionContext(() => {
        return authGuard(activatedRoute.snapshot, {} as RouterStateSnapshot);
      });
    console.log(guardResponse, mockRouter.createUrlTree);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    guardResponse.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });
  it('should return redirect if auth check is failed', (done: DoneFn) => {
    const httpError = {
      post: () => {
        const err = new Error('test');
        return throwError(() => err);
      },
    };
    // Override HttpClient provider with mock
    TestBed.overrideProvider(HttpClient, { useValue: httpError });
    const activatedRoute = TestBed.inject(ActivatedRoute);
    let cookieService = TestBed.inject(CookieService);
    cookieService.set('userToken', 'test');
    const guardResponse = TestBed.runInInjectionContext(() => {
      return authGuard(activatedRoute.snapshot, {} as RouterStateSnapshot);
    });

    guardResponse.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });
});
