import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { asyncScheduler, scheduled, throwError } from 'rxjs';
class errorWithMessage extends Error {
  error: string[][] | undefined;
}
function setTimeoutPromise(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
const httpError = {
  post: () => {
    const err = new errorWithMessage('test');
    err.error = [['test error']];
    return throwError(() => err);
  },
};
describe('Register', () => {
  describe('default settings', () => {
    let component: Register;
    let fixture: ComponentFixture<Register>;
    let cookieService: CookieService;
    let httpTesting: HttpTestingController;
    let httpClient: HttpClient;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Register],
        providers: [
          provideRouter([]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(Register);
      component = fixture.componentInstance;
      fixture.detectChanges();
      cookieService = TestBed.inject(CookieService);
      httpTesting = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      cookieService.delete('userToken');
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should bind the username to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.username'));
      const formControlElement = component.register.get('username')!;
      //
      const testValue = 'username';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('username should be invalid if empty', () => {
      const formControlElement = component.register.get('username')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('username should be valid if given string', () => {
      const formControlElement = component.register.get('username')!;
      formControlElement.setValue('test');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should bind the password1 to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.password1'));
      const formControlElement = component.register.get('password1')!;
      //
      const testValue = 'password1';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('password1 should be invalid if empty', () => {
      const formControlElement = component.register.get('password1')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('password1 should be invalid if given string shorter than 5 characters length', () => {
      const formControlElement = component.register.get('password1')!;
      formControlElement.setValue('test');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('password1 should be valid if given string 5 characters length or longer', () => {
      const formControlElement = component.register.get('password1')!;
      formControlElement.setValue('test123');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should bind the password2 to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.password2'));
      const formControlElement = component.register.get('password2')!;
      //
      const testValue = 'password2';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('password2 should be invalid if empty', () => {
      const formControlElement = component.register.get('password2')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('password2 should be invalid if given string shorter than 5 characters length', () => {
      const formControlElement = component.register.get('password2')!;
      formControlElement.setValue('test');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('password2 should be valid if given string 5 characters length or longer', () => {
      const formControlElement = component.register.get('password2')!;
      formControlElement.setValue('test123');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should bind the email to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.email'));
      const formControlElement = component.register.get('email')!;
      //
      const testValue = 'email';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('email should be invalid if empty', () => {
      const formControlElement = component.register.get('email')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('email should be invalid if given string is not an email format', () => {
      const formControlElement = component.register.get('email')!;
      formControlElement.setValue('test');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('email should be valid if given string in email format', () => {
      const formControlElement = component.register.get('email')!;
      formControlElement.setValue('test123@email.com');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });
    it('should not submit if not all fields are valid', () => {
      const submitButton = fixture.debugElement.query(By.css('.submit'));
      const submitFnc = spyOn(component, 'onSubmit');

      submitButton.nativeElement.click();
      fixture.detectChanges();
      expect(submitFnc).not.toHaveBeenCalled();
    });
    it('Should submit if all fields are valid', () => {
      component.register.get('email')!.setValue('test123@email.com');
      component.register.get('password2')!.setValue('password1');
      component.register.get('password1')!.setValue('password2');
      component.register.get('username')!.setValue('username');
      const submitButton = fixture.debugElement.query(By.css('.submit'));
      const submitFnc = spyOn(component, 'onSubmit');
      fixture.detectChanges();

      submitButton.nativeElement.click();
      expect(submitFnc).toHaveBeenCalled();
    });
    it('should send the data in the body of the request', async () => {
      component.register.get('email')!.setValue('test123@email.com');
      component.register.get('password2')!.setValue('password2');
      component.register.get('password1')!.setValue('password1');
      component.register.get('username')!.setValue('username');
      fixture.detectChanges();
      const submitButton = fixture.debugElement.query(By.css('.submit'));
      submitButton.nativeElement.click();

      const req = httpTesting.expectOne(
        'http://localhost:4200/api/auth/register/'
      );
      let body = JSON.parse(req.request.body);
      expect(body.email).toBe('test123@email.com');
      expect(body.password2).toBe('password2');
      expect(body.password1).toBe('password1');
      expect(body.username).toBe('username');
    });
  });

  describe('default settings with successful post response holding auth token', () => {
    let component: Register;
    let fixture: ComponentFixture<Register>;
    let cookieService: CookieService;
    let httpTesting: HttpTestingController;
    let httpClient: HttpClient;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Register],
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
      };
      TestBed.overrideProvider(HttpClient, { useValue: httpWithPostData });

      fixture = TestBed.createComponent(Register);

      component = fixture.componentInstance;
      fixture.detectChanges();
      cookieService = TestBed.inject(CookieService);
      httpTesting = TestBed.inject(HttpTestingController);
      httpClient = TestBed.inject(HttpClient);
      cookieService.delete('userToken');
    });

    it('should set a cookie with the response from the post request', async () => {
      const submitButton = fixture.debugElement.query(By.css('.submit'));

      component.register.get('email')!.setValue('test123@email.com');
      component.register.get('password2')!.setValue('password1');
      component.register.get('password1')!.setValue('password2');
      component.register.get('username')!.setValue('username');
      fixture.detectChanges();

      submitButton.nativeElement.click();
      await setTimeoutPromise(200);
      fixture.detectChanges();
      expect(cookieService.get('userToken')).toBe('fakeAuthToken');
    });
  });
});
