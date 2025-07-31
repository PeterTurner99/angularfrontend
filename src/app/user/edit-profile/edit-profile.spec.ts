import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import { EditProfile } from './edit-profile';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { asyncScheduler, scheduled, throwError } from 'rxjs';
class errorWithMessage extends Error {
  error: string[][] | undefined;
}
function setTimeoutPromise(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

describe('EditProfile', () => {
  let component: EditProfile;
  let fixture: ComponentFixture<EditProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfile],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });
  describe('default settings', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(EditProfile);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should not submit if no data in inputs', () => {
      let button = fixture.debugElement.query(By.css('.submit-button'));
      const submitFnc = spyOn(component, 'onSubmit');
      button.nativeElement.click();
      expect(submitFnc).not.toHaveBeenCalled();
    });
    it('should submit if all inputs are valid', () => {
      let button = fixture.debugElement.query(By.css('.submit-button'));
      const submitFnc = spyOn(component, 'onSubmit');
      component.edit_profile_form.get('username')!.setValue('username');
      component.edit_profile_form.get('email')!.setValue('username@mail.com');
      component.edit_profile_form.get('max_bookings_at_once')!.setValue(5);
      fixture.detectChanges();
      button.nativeElement.click();
      expect(submitFnc).toHaveBeenCalled();
    });

    it('should bind the username to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.username'));
      const formControlElement = component.edit_profile_form.get('username')!;
      //
      const testValue = 'username';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('username should be invalid if empty', () => {
      const formControlElement = component.edit_profile_form.get('username')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('username should be valid if given string', () => {
      const formControlElement = component.edit_profile_form.get('username')!;
      formControlElement.setValue('test');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should bind the email to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.email'));
      const formControlElement = component.edit_profile_form.get('email')!;
      //
      const testValue = 'email';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('email should be valid if empty', () => {
      const formControlElement = component.edit_profile_form.get('email')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });
    it('email should be invalid if given string of wrong format', () => {
      const formControlElement = component.edit_profile_form.get('email')!;
      formControlElement.setValue('test');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('email should be valid if given string of correct format', () => {
      const formControlElement = component.edit_profile_form.get('email')!;
      formControlElement.setValue('test@email.com');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should bind the bookings to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.max_bookings'));
      const formControlElement = component.edit_profile_form.get(
        'max_bookings_at_once'
      )!;
      //
      const testValue = 5;
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue.toString());
    });

    it('bookings should be valid if given number', () => {
      const formControlElement = component.edit_profile_form.get(
        'max_bookings_at_once'
      )!;
      formControlElement.setValue(5);
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });
  });
  it('should set the values given in response after submitting', fakeAsync(async () => {
    let newEmail = 'new email';
    let newUsername = 'new username';
    let new_bookings = 15;
    const httpPass = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
      post: () => {
        return scheduled(
          [
            {
              email: newEmail,
              username: newUsername,
              max_bookings_at_once: new_bookings,
            },
          ],
          asyncScheduler
        );
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpPass });
    fixture = TestBed.createComponent(EditProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.submit-button'));
    component.edit_profile_form.get('username')!.setValue('username');
    component.edit_profile_form.get('email')!.setValue('username@mail.com');
    component.edit_profile_form.get('max_bookings_at_once')!.setValue(5);
    fixture.detectChanges();
    button.nativeElement.click();
    await setTimeoutPromise(100);
    fixture.detectChanges();

    expect(component.edit_profile_form.get('email')!.value).toBe(newEmail);
    expect(component.edit_profile_form.get('username')!.value).toBe(
      newUsername
    );
    expect(component.edit_profile_form.get('max_bookings_at_once')!.value).toBe(
      new_bookings
    );
  }));

  it('should show an error if returned after submitting', () => {
    const httpError = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
      post: () => {
        const err = new errorWithMessage('test');
        err.error = [['test error']];
        return throwError(() => err);
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpError });
    fixture = TestBed.createComponent(EditProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.submit-button'));
    component.edit_profile_form.get('username')!.setValue('username');
    component.edit_profile_form.get('email')!.setValue('username@mail.com');
    component.edit_profile_form.get('max_bookings_at_once')!.setValue(5);
    fixture.detectChanges();
    button.nativeElement.click();
    fixture.detectChanges();
    let errorCard = fixture.debugElement.query(By.css('.error-card'));
    let errorListItem = errorCard.queryAll(By.css('.error-list-item'));
    expect(errorListItem.length).toBe(1);
  });

  it('should show the correct amounts of errors if returned after submitting', () => {
    const httpError = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
      post: () => {
        const err = new errorWithMessage('test');
        err.error = [['test error'], ['test error 2', 'test eroror 3']];
        return throwError(() => err);
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpError });
    fixture = TestBed.createComponent(EditProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.submit-button'));
    component.edit_profile_form.get('username')!.setValue('username');
    component.edit_profile_form.get('email')!.setValue('username@mail.com');
    component.edit_profile_form.get('max_bookings_at_once')!.setValue(5);
    fixture.detectChanges();
    button.nativeElement.click();
    fixture.detectChanges();
    let errorCard = fixture.debugElement.query(By.css('.error-card'));
    let errorListItem = errorCard.queryAll(By.css('.error-list-item'));
    expect(errorListItem.length).toBe(3);
  });

  it('should show the specific error as "test error" when given', () => {
    const httpError = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
      post: () => {
        const err = new errorWithMessage('test');
        err.error = [['test error']];
        return throwError(() => err);
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpError });
    fixture = TestBed.createComponent(EditProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.submit-button'));
    component.edit_profile_form.get('username')!.setValue('username');
    component.edit_profile_form.get('email')!.setValue('username@mail.com');
    component.edit_profile_form.get('max_bookings_at_once')!.setValue(5);
    fixture.detectChanges();
    button.nativeElement.click();
    fixture.detectChanges();
    let errorCard = fixture.debugElement.query(By.css('.error-card'));
    let errorListItem = errorCard.query(By.css('.error-list-item'));
    expect(errorListItem.nativeElement.textContent).toBe('test error');
  });

  it('should show the correct errors order if returned after submitting', () => {
    const httpError = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
      post: () => {
        const err = new errorWithMessage('test');
        err.error = [['test error'], ['test error 2', 'test error 3']];
        return throwError(() => err);
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpError });
    fixture = TestBed.createComponent(EditProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.submit-button'));
    component.edit_profile_form.get('username')!.setValue('username');
    component.edit_profile_form.get('email')!.setValue('username@mail.com');
    component.edit_profile_form.get('max_bookings_at_once')!.setValue(5);
    fixture.detectChanges();
    button.nativeElement.click();
    fixture.detectChanges();
    let errorCard = fixture.debugElement.query(By.css('.error-card'));
    let errorListItem = errorCard.queryAll(By.css('.error-list-item'));
    expect(errorListItem[0].nativeElement.textContent).toBe('test error');
    expect(errorListItem[1].nativeElement.textContent).toBe('test error 2');
    expect(errorListItem[2].nativeElement.textContent).toBe('test error 3');
  });
});
