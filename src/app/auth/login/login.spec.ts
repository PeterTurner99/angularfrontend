import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { asyncScheduler, scheduled, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
class errorWithMessage extends Error {
  error: string[][] | undefined;
}
function setTimeoutPromise(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  describe('default settings', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Login],
        providers: [
          provideRouter([]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(Login);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should not submit if the form is not valid', () => {
      const submitButton = fixture.debugElement.query(By.css('.submitButton'));
      const spyFnc = spyOn(component, 'onSubmit');
      submitButton.nativeElement.click();
      expect(spyFnc).not.toHaveBeenCalled;
    });

    it('should bind the username to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.username'));
      const formControlElement = component.login.get('username')!;
      //
      const testValue = 'username';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('username should be invalid if empty', () => {
      const formControlElement = component.login.get('username')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('username should be valid if given string', () => {
      const formControlElement = component.login.get('username')!;
      formControlElement.setValue('test');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should bind the password to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.password'));
      const formControlElement = component.login.get('password')!;
      //
      const testValue = 'password1';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('password1 should be invalid if empty', () => {
      const formControlElement = component.login.get('password')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('password should be invalid if given string shorter than 5 characters length', () => {
      const formControlElement = component.login.get('password')!;
      formControlElement.setValue('test');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('password should be valid if given string 5 characters length or longer', () => {
      const formControlElement = component.login.get('password')!;
      formControlElement.setValue('test123');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });
    it('should submit if the form is valid', () => {
      const submitButton = fixture.debugElement.query(By.css('.submitButton'));
      const spyFnc = spyOn(component, 'onSubmit');
      component.login.get('username')!.setValue('test');
      component.login.get('password')!.setValue('test123');
      fixture.detectChanges();
      submitButton.nativeElement.click();
      expect(spyFnc).toHaveBeenCalled;
    });
  });
  describe('default settings with http response', () => {
    let cookieService: CookieService;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Login],
        providers: [
          provideRouter([]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }).compileComponents();
      const httpWithPostData = {
        post: () => {
          return scheduled([{ token: 'fakeAuthToken' }], asyncScheduler);
        },
        get: () => {
          return scheduled([false], asyncScheduler);
        },
      };
      TestBed.overrideProvider(HttpClient, { useValue: httpWithPostData });
      cookieService = TestBed.inject(CookieService);
      fixture = TestBed.createComponent(Login);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set the token returned', async() => {
      component.login.get('username')!.setValue('test');
      component.login.get('password')!.setValue('test123');
      fixture.detectChanges();
      fixture.debugElement.query(By.css('.submitButton')).nativeElement.click();
      fixture.detectChanges();

      await setTimeoutPromise(200);
      expect(cookieService.get('userToken')).toBe('fakeAuthToken');
    });
  });
  describe('default settings with error http response', () => {
    let cookieService: CookieService;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Login],
        providers: [
          provideRouter([]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }).compileComponents();
      const httpWithPostData = {
        post: () => {
          const err = new errorWithMessage('test');
          err.error = [['test error']];
          return throwError(() => err);
        },
        get: () => {
          return scheduled([false], asyncScheduler);
        },
      };
      TestBed.overrideProvider(HttpClient, { useValue: httpWithPostData });
      cookieService = TestBed.inject(CookieService);
      fixture = TestBed.createComponent(Login);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should delete the token if response is an error', () => {
      cookieService.set('userToken', 'testValue');
      component.login.get('username')!.setValue('test');
      component.login.get('password')!.setValue('test123');
      fixture.detectChanges();
      fixture.debugElement.query(By.css('.submitButton')).nativeElement.click();
      expect(cookieService.get('userToken')).toBe('');
    });
  });
});
