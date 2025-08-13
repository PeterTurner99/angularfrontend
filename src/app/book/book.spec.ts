import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { Book } from './book';
import { provideRouter, Router } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader, HarnessPredicate } from '@angular/cdk/testing';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MatTimepickerInputHarness } from '@angular/material/timepicker/testing';
import { asyncScheduler, scheduled, throwError } from 'rxjs';
class errorWithMessage extends Error {
  error: string[][] | undefined;
}
function setTimeoutPromise(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
describe('Book', () => {
  let component: Book;
  let fixture: ComponentFixture<Book>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Book],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  describe('default settings', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(Book);
      component = fixture.componentInstance;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should not submit if no data in inputs with the first submit button pressed', () => {
      let button = fixture.debugElement.query(By.css('.submit_1'));
      const submitFnc = spyOn(component, 'onSubmit');
      button.nativeElement.click();
      expect(submitFnc).not.toHaveBeenCalled();
    });
    it('should not submit if no data in inputs with the second submit button pressed', () => {
      let button = fixture.debugElement.query(By.css('.submit_2'));
      const submitFnc = spyOn(component, 'onAgainSubmit');
      button.nativeElement.click();
      expect(submitFnc).not.toHaveBeenCalled();
    });

    it('should bind the start date to its formgroup formcontrol', async () => {
      const harnessPredicate = new HarnessPredicate(MatDatepickerInputHarness, {
        selector: '.startDate',
      });
      const value = new Date().toDateString();
      const input = await loader.getHarness(harnessPredicate);
      await input.setValue(value);
      fixture.detectChanges();
      //
      expect(await input.getValue()).toEqual(value);
    });
    it('start date should be invalid if empty', async () => {
      const formControlElement = component.bookingFormGroup.get('startDate')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('start date should be valid if given string', async () => {
      const formControlElement = component.bookingFormGroup.get('startDate')!;
      const harnessPredicate = new HarnessPredicate(MatDatepickerInputHarness, {
        selector: '.startDate',
      });
      const value = new Date().toDateString();
      const input = await loader.getHarness(harnessPredicate);
      await input.setValue(value);
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should bind the start time to its formgroup formcontrol', async () => {
      const harnessPredicate = new HarnessPredicate(MatTimepickerInputHarness, {
        selector: '.startTime',
      });
      const value = new Date().toTimeString();
      const input = await loader.getHarness(harnessPredicate);
      await input.setValue(value);
      fixture.detectChanges();
      //
      expect(await input.getValue()).toEqual(value);
    });

    it('should bind the end date to its formgroup formcontrol', async () => {
      const harnessPredicate = new HarnessPredicate(MatDatepickerInputHarness, {
        selector: '.endDate',
      });
      const value = new Date().toDateString();
      const input = await loader.getHarness(harnessPredicate);
      await input.setValue(value);
      fixture.detectChanges();
      //
      expect(await input.getValue()).toEqual(value);
    });
    it('end date should be invalid if empty', async () => {
      const formControlElement = component.bookingFormGroup.get('endDate')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('end date should be valid if given string', async () => {
      const formControlElement = component.bookingFormGroup.get('endDate')!;
      const harnessPredicate = new HarnessPredicate(MatDatepickerInputHarness, {
        selector: '.endDate',
      });
      const value = new Date().toDateString();
      const input = await loader.getHarness(harnessPredicate);
      await input.setValue(value);
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should bind the end time to its formgroup formcontrol', async () => {
      const harnessPredicate = new HarnessPredicate(MatTimepickerInputHarness, {
        selector: '.endTime',
      });
      const value = new Date().toTimeString();
      const input = await loader.getHarness(harnessPredicate);
      await input.setValue(value);
      fixture.detectChanges();
      //
      expect(await input.getValue()).toEqual(value);
    });

    it('should bind the description to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.description'));
      const formControlElement = component.bookingFormGroup.get('description')!;
      //
      const testValue = 'description';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('description should be valid if empty', () => {
      const formControlElement = component.bookingFormGroup.get('description')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });
    it('username should be valid if given string', () => {
      const formControlElement = component.bookingFormGroup.get('description')!;
      formControlElement.setValue('description');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should bind the title to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.title'));
      const formControlElement = component.bookingFormGroup.get('title')!;
      //
      const testValue = 'title';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('title should be invalid if empty', () => {
      const formControlElement = component.bookingFormGroup.get('title')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('title should be valid if given string', () => {
      const formControlElement = component.bookingFormGroup.get('title')!;
      formControlElement.setValue('title');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should bind the booking email to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.booked_email'));
      const formControlElement =
        component.bookingFormGroup.get('booked_email')!;
      //
      const testValue = 'booked_name@email.com';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('booking email should be invalid if empty', () => {
      const formControlElement =
        component.bookingFormGroup.get('booked_email')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('booking email should be invalid if given string of wrong format', () => {
      const formControlElement =
        component.bookingFormGroup.get('booked_email')!;
      formControlElement.setValue('title');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('booking email should be valid if given string of correct format', () => {
      const formControlElement =
        component.bookingFormGroup.get('booked_email')!;
      formControlElement.setValue('booked_name@email.com');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should bind the booking name to its formgroup formcontrol', () => {
      const inputElement = fixture.debugElement.query(By.css('.booked_name'));
      const formControlElement = component.bookingFormGroup.get('booked_name')!;
      //
      const testValue = 'name';
      formControlElement.setValue(testValue);
      fixture.detectChanges();
      //
      expect(inputElement.nativeElement.value).toEqual(testValue);
    });
    it('booking name should be invalid if empty', () => {
      const formControlElement = component.bookingFormGroup.get('booked_name')!;
      fixture.detectChanges();
      expect(formControlElement.valid).toBeFalsy();
    });
    it('booking name should be valid if given string', () => {
      const formControlElement = component.bookingFormGroup.get('booked_name')!;
      formControlElement.setValue('name');
      fixture.detectChanges();
      expect(formControlElement.valid).toBeTruthy();
    });

    it('should submit if data in inputs with the first submit button pressed', waitForAsync(async () => {
      let button = fixture.debugElement.query(By.css('.submit_1'));
      const submitFnc = spyOn(component, 'onSubmit');
      component.bookingFormGroup.get('booked_name')!.setValue('name');
      component.bookingFormGroup
        .get('booked_email')!
        .setValue('booked_name@email.com');
      component.bookingFormGroup.get('description')!.setValue('description');
      component.bookingFormGroup.get('title')!.setValue('title');
      const harnessPredicateEndDate = new HarnessPredicate(
        MatDatepickerInputHarness,
        {
          selector: '.endDate',
        }
      );
      const harnessPredicateStartDate = new HarnessPredicate(
        MatDatepickerInputHarness,
        {
          selector: '.startDate',
        }
      );

      const value = new Date().toDateString();
      const inputEndDate = await loader.getHarness(harnessPredicateEndDate);
      await inputEndDate.setValue(value);
      const inputStartDate = await loader.getHarness(harnessPredicateStartDate);
      await inputStartDate.setValue(value);
      await setTimeoutPromise(200);
      fixture.detectChanges();
      button.nativeElement.click();
      expect(submitFnc).toHaveBeenCalled();
    }));
    it('should submit if data in inputs with the second submit button pressed', waitForAsync(async () => {
      let button = fixture.debugElement.query(By.css('.submit_2'));
      const submitFnc = spyOn(component, 'onAgainSubmit');

      component.bookingFormGroup.get('booked_name')!.setValue('name');
      component.bookingFormGroup
        .get('booked_email')!
        .setValue('booked_name@email.com');
      component.bookingFormGroup.get('description')!.setValue('description');
      component.bookingFormGroup.get('title')!.setValue('title');
      const harnessPredicateEndDate = new HarnessPredicate(
        MatDatepickerInputHarness,
        {
          selector: '.endDate',
        }
      );
      const harnessPredicateStartDate = new HarnessPredicate(
        MatDatepickerInputHarness,
        {
          selector: '.startDate',
        }
      );
      const value = new Date().toDateString();
      const inputEndDate = await loader.getHarness(harnessPredicateEndDate);
      await inputEndDate.setValue(value);
      const inputStartDate = await loader.getHarness(harnessPredicateStartDate);
      await inputStartDate.setValue(value);
      await setTimeoutPromise(200);
      fixture.detectChanges();

      button.nativeElement.click();
      expect(submitFnc).toHaveBeenCalled();
    }));
  });

  describe('default settings with error returned on submit', () => {
    beforeEach(async () => {
      const httpError = {
        post: () => {
          const err = new errorWithMessage('test');
          err.error = [['test error']];
          return throwError(() => err);
        },
      };
      TestBed.overrideProvider(HttpClient, { useValue: httpError });
      fixture = TestBed.createComponent(Book);
      loader = TestbedHarnessEnvironment.loader(fixture);
      const harnessPredicateEndDate = new HarnessPredicate(
        MatDatepickerInputHarness,
        {
          selector: '.endDate',
        }
      );
      const harnessPredicateStartDate = new HarnessPredicate(
        MatDatepickerInputHarness,
        {
          selector: '.startDate',
        }
      );
      const harnessPredicatestartTime = new HarnessPredicate(
        MatTimepickerInputHarness,
        {
          selector: '.startTime',
        }
      );
      const harnessPredicateEndTime = new HarnessPredicate(
        MatTimepickerInputHarness,
        {
          selector: '.endTime',
        }
      );
      const inputStartDate = await loader.getHarness(harnessPredicateStartDate);
      await inputStartDate.setValue('1/1/2020');

      loader = TestbedHarnessEnvironment.loader(fixture);
      const inputEndDate = await loader.getHarness(harnessPredicateEndDate);
      await inputEndDate.setValue('1/2/2020');

      loader = TestbedHarnessEnvironment.loader(fixture);
      const inputStartTime = await loader.getHarness(harnessPredicatestartTime);
      await inputStartTime.setValue('3:21 PM');

      loader = TestbedHarnessEnvironment.loader(fixture);
      const inputEndTime = await loader.getHarness(harnessPredicateEndTime);
      await inputEndTime.setValue('3:21 PM');

      await setTimeoutPromise(200);
      component = fixture.componentInstance;
      fixture.detectChanges();
      component.bookingFormGroup.get('booked_name')!.setValue('name');
      component.bookingFormGroup
        .get('booked_email')!
        .setValue('booked_name@email.com');
      component.bookingFormGroup.get('description')!.setValue('description');
      component.bookingFormGroup.get('title')!.setValue('title');
      fixture.detectChanges();
    });
    it('should submit with submit button', () => {
      let button = fixture.debugElement.query(By.css('.submit_1'));
      const submitFnc = spyOn(component, 'onSubmit');
      fixture.detectChanges();

      button.nativeElement.click();
      expect(submitFnc).toHaveBeenCalled();
    });
    it('should submit with submit button and then show errors given', async () => {
      let button = fixture.debugElement.query(By.css('.submit_1'));
      const submitFnc = spyOn(component, 'onSubmit');
      fixture.detectChanges();

      button.nativeElement.click();
      expect(submitFnc).toHaveBeenCalled();
      await setTimeoutPromise(200);
      fixture.detectChanges();
      let errorItem = fixture.debugElement.queryAll(By.css('.error-list-item'));
      expect(errorItem.length).toBe(1);
    });
    it('should submit with submit button and then show errors given with text content "test error"', () => {
      let button = fixture.debugElement.query(By.css('.submit_1'));

      fixture.detectChanges();

      button.nativeElement.click();

      fixture.detectChanges();
      let errorItem = fixture.debugElement.query(By.css('.error-list-item'));
      expect(errorItem.nativeElement.textContent).toBe('test error');
    });

    it('should submit with submit again button', () => {
      let button = fixture.debugElement.query(By.css('.submit_2'));
      const submitFnc = spyOn(component, 'onAgainSubmit');
      fixture.detectChanges();

      button.nativeElement.click();

      expect(submitFnc).toHaveBeenCalled();
    });
    it('should submit with submit again button and then show errors given', () => {
      let button = fixture.debugElement.query(By.css('.submit_2'));
      const submitFnc = spyOn(component, 'onAgainSubmit');
      fixture.detectChanges();

      button.nativeElement.click();
      expect(submitFnc).toHaveBeenCalled();
      fixture.detectChanges();
      let errorItem = fixture.debugElement.queryAll(By.css('.error-list-item'));
      expect(errorItem.length).toBe(1);
    });
    it('should submit with submit again button and then show errors given with text content "test error"', async () => {
      let button = fixture.debugElement.query(By.css('.submit_2'));
      fixture.detectChanges();

      button.nativeElement.click();
      await setTimeoutPromise(200);
      fixture.detectChanges();

      let errorItem = fixture.debugElement.query(By.css('.error-list-item'));
      expect(errorItem.nativeElement.textContent).toBe('test error');
    });
  });
  describe('default settings with success returned on submit', () => {
    beforeEach(async () => {
      const httpPost = {
        post: () => {
          return scheduled([], asyncScheduler);;
        },
      };
      TestBed.overrideProvider(HttpClient, { useValue: httpPost });
      fixture = TestBed.createComponent(Book);
      loader = TestbedHarnessEnvironment.loader(fixture);
      const harnessPredicateEndDate = new HarnessPredicate(
        MatDatepickerInputHarness,
        {
          selector: '.endDate',
        }
      );
      const harnessPredicateStartDate = new HarnessPredicate(
        MatDatepickerInputHarness,
        {
          selector: '.startDate',
        }
      );
      const harnessPredicatestartTime = new HarnessPredicate(
        MatTimepickerInputHarness,
        {
          selector: '.startTime',
        }
      );
      const harnessPredicateEndTime = new HarnessPredicate(
        MatTimepickerInputHarness,
        {
          selector: '.endTime',
        }
      );
      const inputStartDate = await loader.getHarness(harnessPredicateStartDate);
      await inputStartDate.setValue('1/1/2020');

      loader = TestbedHarnessEnvironment.loader(fixture);
      const inputEndDate = await loader.getHarness(harnessPredicateEndDate);
      await inputEndDate.setValue('1/2/2020');

      loader = TestbedHarnessEnvironment.loader(fixture);
      const inputStartTime = await loader.getHarness(harnessPredicatestartTime);
      await inputStartTime.setValue('3:21 PM');

      loader = TestbedHarnessEnvironment.loader(fixture);
      const inputEndTime = await loader.getHarness(harnessPredicateEndTime);
      await inputEndTime.setValue('3:21 PM');

      await setTimeoutPromise(200);
      component = fixture.componentInstance;
      fixture.detectChanges();
      component.bookingFormGroup.get('booked_name')!.setValue('name');
      component.bookingFormGroup
        .get('booked_email')!
        .setValue('booked_name@email.com');
      component.bookingFormGroup.get('description')!.setValue('description');
      component.bookingFormGroup.get('title')!.setValue('title');
      fixture.detectChanges();
    });
    it('should submit with submit button', () => {
      let button = fixture.debugElement.query(By.css('.submit_1'));
      const submitFnc = spyOn(component, 'onSubmit');
      fixture.detectChanges();

      button.nativeElement.click();
      expect(submitFnc).toHaveBeenCalled();
    });
    


    it('should submit with submit again button', () => {
      let button = fixture.debugElement.query(By.css('.submit_2'));
      const submitFnc = spyOn(component, 'onAgainSubmit');
      fixture.detectChanges();

      button.nativeElement.click();
      expect(submitFnc).toHaveBeenCalled();
    });

  });
});
