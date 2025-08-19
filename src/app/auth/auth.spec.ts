import { TestBed } from '@angular/core/testing';

import { Auth, authInterceptor } from './auth';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { ProviderToken } from '@angular/core';
describe('Auth', () => {
  let service: Auth;
  
  let cookieService: CookieService;
  let httpTesting: HttpTestingController;
  let httpClient: HttpClient
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(Auth);
    cookieService = TestBed.inject(CookieService);
    httpTesting = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
    cookieService.delete('userToken')
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should add a token to request headers if there is a token', () => {
    cookieService.set('userToken', 'testtoken')
    httpClient.get('').subscribe()
    const req = httpTesting.expectOne('');
    expect(req.request.headers.get('Authorization')).toEqual(
      `Token ${cookieService.get('userToken')}`
    );
    req.flush({});
    httpTesting.verify();
  });
  it('should not add a token to request headers if there is a authorization header already', () => {
    cookieService.set('userToken', 'testtoken')
    httpClient.get('', {headers: {'Authorization': 'testHeader'}}).subscribe()
    const req = httpTesting.expectOne('');
    expect(req.request.headers.get('Authorization')).toEqual(
      `testHeader`
    );
    req.flush({});
    httpTesting.verify();
  });
  it('should not add a token to request headers if there is a authorization header already', () => {
    httpClient.get('', {headers: {'Authorization': 'testHeader'}}).subscribe()
    const req = httpTesting.expectOne('');
    expect(req.request.headers.get('Authorization')).toBeFalsy
    req.flush({});
    httpTesting.verify();
  });
});
