import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { BookingsList } from './bookings-list';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { asyncScheduler, scheduled } from 'rxjs';
function setTimeoutPromise(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
describe('BookingsList', () => {
  let component: BookingsList;
  let fixture: ComponentFixture<BookingsList>;
  let loader: HarnessLoader;
  describe('Without data', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BookingsList],
        providers: [
          provideRouter([]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(BookingsList);
      component = fixture.componentInstance;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should have a date object equal to current date', () => {
      expect(component.date.toDateString()).toEqual(new Date().toDateString());
    });
    it('should have a button to increase the date by a week', () => {
      let increaseButton = fixture.debugElement.query(
        By.css('.increaseByWeek')
      );
      increaseButton.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let new_component_date = component.date.toDateString();
      let next_week = new Date(new Date().getTime() + 86400000 * 7);
      expect(next_week.toDateString()).toEqual(new_component_date);
    });
    it('should have a button to increase the date by a week and call the backend to check for bookings using the new date', () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      let increaseButton = fixture.debugElement.query(
        By.css('.increaseByWeek')
      );
      increaseButton.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let new_component_date = component.date.toISOString();
      let called_url = httpSpy.calls.argsFor(0)[0];
      let next_week = new Date(new Date().getTime() + 86400000 * 7);
      expect(next_week.toDateString()).toEqual(component.date.toDateString());

      expect(called_url).toEqual(
        `http://localhost:4200/api/walk/book/week/?date=${new_component_date}`
      );
    });
    it('should have a button to decrease the date by a week', () => {
      let increaseButton = fixture.debugElement.query(
        By.css('.decreaseByWeek')
      );
      increaseButton.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let new_component_date = component.date.toDateString();
      let last_week = new Date(new Date().getTime() - 86400000 * 7);
      expect(last_week.toDateString()).toEqual(new_component_date);
    });
    it('should have a button to decrease the date by a week and call the backend to check for bookings using the new date', () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      let increaseButton = fixture.debugElement.query(
        By.css('.decreaseByWeek')
      );
      increaseButton.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let new_component_date = component.date.toISOString();
      let called_url = httpSpy.calls.argsFor(0)[0];
      let last_week = new Date(new Date().getTime() - 86400000 * 7);
      expect(called_url).toEqual(
        `http://localhost:4200/api/walk/book/week/?date=${new_component_date}`
      );
      expect(last_week.toDateString()).toEqual(component.date.toDateString());
    });
    it('should call updateList when the email filter is changed', () => {
      const updateSpy = spyOn(component, 'updateList');
      var get_email_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.emailFilter')
      ).nativeElement;
      get_email_field.value = 'test';
      get_email_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(updateSpy.calls.count()).toBe(1);
    });
    it('should call updateList and send a http post request containing the update in the body when the email filter is changed', () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      var get_email_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.emailFilter')
      ).nativeElement;
      get_email_field.value = 'test';
      get_email_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      var httpBody = JSON.parse(httpSpy.calls.argsFor(0)[1]);
      expect(httpBody.emailFilter).toBe('test');
    });

    it('should call updateList when the title filter is changed', () => {
      const updateSpy = spyOn(component, 'updateList');
      var get_title_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.titleFilter')
      ).nativeElement;
      get_title_field.value = 'test';
      get_title_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(updateSpy.calls.count()).toBe(1);
    });
    it('should call updateList and send a http post request containing the update in the body when the email filter is changed', () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      var get_title_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.titleFilter')
      ).nativeElement;
      get_title_field.value = 'test';
      get_title_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      var httpBody = JSON.parse(httpSpy.calls.argsFor(0)[1]);
      expect(httpBody.titleFilter).toBe('test');
    });
    it('should call updateList twice when both the filters are changed', () => {
      const updateSpy = spyOn(component, 'updateList');
      var get_title_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.titleFilter')
      ).nativeElement;
      get_title_field.value = 'test';
      get_title_field.dispatchEvent(new Event('input'));
      var get_email_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.emailFilter')
      ).nativeElement;
      get_email_field.value = 'test';
      get_email_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(updateSpy.calls.count()).toBe(2);
    });
    it('should call updateList with both pieces of data when both the filters are changed ', () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      var get_title_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.titleFilter')
      ).nativeElement;
      get_title_field.value = 'test_title';
      var get_email_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.emailFilter')
      ).nativeElement;
      get_email_field.value = 'test_email';
      get_title_field.dispatchEvent(new Event('input'));
      get_email_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      var httpBody = JSON.parse(httpSpy.calls.argsFor(1)[1]);
      expect(httpBody.emailFilter).toBe('test_email');
      expect(httpBody.titleFilter).toBe('test_title');
    });
    it('should load datepicker harness', async () => {
      const inputs = await loader.getAllHarnesses(MatDatepickerInputHarness);
      expect(inputs.length).toBe(1);
    });
    it('should get whether the input has an associated calendar', async () => {
      const input = await loader.getHarness(MatDatepickerInputHarness);
      expect(await input.hasCalendar()).toBeTrue();
    });
    it('should set the input value', async () => {
      const input = await loader.getHarness(MatDatepickerInputHarness);
      await input.setValue('1/1/2020');
      expect(await input.getValue()).toBe('1/1/2020');
    });

    it('should be able to open and close a calendar in popup mode', async () => {
      const input = await loader.getHarness(MatDatepickerInputHarness);
      expect(await input.isCalendarOpen()).toBe(false);
      await input.openCalendar();
      expect(await input.isCalendarOpen()).toBe(true);
      await input.closeCalendar();
      expect(await input.isCalendarOpen()).toBe(false);
    });
    it('should call onDateChange on date change', async () => {
      const updateSpy = spyOn(component, 'onDateChange');
      const input = await loader.getHarness(MatDatepickerInputHarness);
      await input.setValue('1/1/2020');
      fixture.detectChanges();
      expect(updateSpy.calls.count()).toBe(1);
    });

    it('should set the date of the component when clicked', async () => {
      const input = await loader.getHarness(MatDatepickerInputHarness);
      await input.setValue('1/1/2020');
      fixture.detectChanges();
      expect(component.date).toEqual(new Date('1/1/2020'));
    });

    it('should use the filter inputs when calling an update with the new date', async () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      var get_title_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.titleFilter')
      ).nativeElement;
      get_title_field.value = 'test_title';
      get_title_field.dispatchEvent(new Event('input'));
      const input = await loader.getHarness(MatDatepickerInputHarness);
      await input.setValue('1/1/2020');
      fixture.detectChanges();
      var httpBody = JSON.parse(httpSpy.calls.argsFor(1)[1]);
      expect(httpBody.titleFilter).toBe('test_title');
    });

    it('should be empty without data', () => {
      let elemSearch = fixture.debugElement.queryAll(By.css('.data-card'));
      expect(elemSearch.length).toBeFalsy();
    });
  });

  describe('With http data', () => {
    let one_set_data = {
      '2025-07-23T10:08:15.729481+00:00': [
        [
          {
            title: 'title test',
            description: 'description test',
            start: '123',
            end: '1324',
            id: 1,
            booked_email: 'test@email.com',
            booked_name: 'test name',
          },
        ],
      ],
    };
    beforeEach(async () => {
      const httpWithPostData = {
        post: () => {
          return scheduled([one_set_data], asyncScheduler);
        },
        get: () => {
          return scheduled([one_set_data], asyncScheduler);
        },
      };
      await TestBed.configureTestingModule({
        imports: [BookingsList],
        providers: [
          provideRouter([]),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }).compileComponents();
      TestBed.overrideProvider(HttpClient, { useValue: httpWithPostData });

      fixture = TestBed.createComponent(BookingsList);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await setTimeoutPromise(1000);
    loader = TestbedHarnessEnvironment.loader(fixture);

    });
    it('should have one element when given one data element', async () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.queryAll(By.css('.data-card'));
      expect(elemSearch.length).toBe(1);
    });
    it('should have one calendar card title element', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.queryAll(
        By.css('.calendar-card-title')
      );
      expect(elemSearch.length).toBe(1);
    });
    it('should have one calendar card contents element with contents of "title test', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(
        By.css('.calendar-card-title')
      );
      expect(elemSearch.nativeElement.textContent).toBe('title test');
    });

    it('should have one calendar card content element', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.queryAll(
        By.css('.calendar-card-contents')
      );
      expect(elemSearch.length).toBe(1);
    });
    it('should have one calendar card content element with contents of "description test', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(
        By.css('.calendar-card-contents')
      );
      expect(elemSearch.nativeElement.textContent).toBe('description test');
    });
    it('Should open popup when card is clicked', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.data-card'));
      elemSearch.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let dialogSearch = fixture.debugElement.parent!.queryAll(
        By.css('.Popup-title')
      );
      expect(dialogSearch.length).toBe(1);
    });
    it('should have popup open with title', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.data-card'));
      elemSearch.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let dialogSearch = fixture.debugElement.parent!.query(
        By.css('.Popup-title')
      );
      let dialogTitle = dialogSearch.queryAll(By.css('.popup-title-text'));

      expect(dialogTitle.length).toBe(1);
    });
    it('should have popup open with title with content "title test"', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.data-card'));
      elemSearch.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let dialogSearch = fixture.debugElement.parent!.query(
        By.css('.Popup-title')
      );
      let dialogTitle = dialogSearch.query(By.css('.popup-title-text'));

      expect(dialogTitle.nativeElement.textContent).toBe('title test');
    });

    it('should have popup open with content part', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.data-card'));
      elemSearch.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let dialogSearch = fixture.debugElement.parent!.queryAll(
        By.css('.popup-content')
      );
      expect(dialogSearch.length).toBe(1);
    });

    it('should have popup open with description', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.data-card'));
      elemSearch.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let dialogSearch = fixture.debugElement.parent!.query(
        By.css('.popup-content')
      );
      let dialogDescription = dialogSearch.queryAll(
        By.css('.popup-description')
      );

      expect(dialogDescription.length).toBe(1);
    });
    it('should have popup open with description with content "description test"', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.data-card'));
      elemSearch.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let dialogSearch = fixture.debugElement.parent!.query(
        By.css('.popup-content')
      );
      let dialogDescription = dialogSearch.query(By.css('.popup-description'));

      expect(dialogDescription.nativeElement.textContent).toBe(
        'description test'
      );
    });

    it('should have have the email shown if available', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.data-card'));
      elemSearch.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let dialogSearch = fixture.debugElement.parent!.query(
        By.css('.popup-content')
      );
      let dialogDescription = dialogSearch.queryAll(By.css('.popup-email'));

      expect(dialogDescription.length).toBe(1);
    });

    it('should have have the email shown and equal to given "test@email.com"', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.data-card'));
      elemSearch.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let dialogSearch = fixture.debugElement.parent!.query(
        By.css('.popup-content')
      );
      let dialogDescription = dialogSearch.query(By.css('.popup-email'));

      expect(dialogDescription.nativeElement.textContent).toBe(
        'test@email.com'
      );
    });

    it('should have have the name shown if available', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.data-card'));
      elemSearch.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let dialogSearch = fixture.debugElement.parent!.query(
        By.css('.popup-content')
      );
      let dialogDescription = dialogSearch.queryAll(By.css('.popup-name'));

      expect(dialogDescription.length).toBe(1);
    });

    it('should have have the name shown and equal to given "test name"', () => {
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.data-card'));
      elemSearch.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let dialogSearch = fixture.debugElement.parent!.query(
        By.css('.popup-content')
      );
      let dialogDescription = dialogSearch.query(By.css('.popup-name'));

      expect(dialogDescription.nativeElement.textContent).toBe('test name');
    });
    it('should have a date object equal to current date', () => {
      expect(component.date.toDateString()).toEqual(new Date().toDateString());
    });
    it('should have a button to increase the date by a week', () => {
      let increaseButton = fixture.debugElement.query(
        By.css('.increaseByWeek')
      );
      increaseButton.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let new_component_date = component.date.toDateString();
      let next_week = new Date(new Date().getTime() + 86400000 * 7);
      expect(next_week.toDateString()).toEqual(new_component_date);
    });
    it('should have a button to increase the date by a week and call the backend to check for bookings using the new date', () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      let increaseButton = fixture.debugElement.query(
        By.css('.increaseByWeek')
      );
      increaseButton.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let new_component_date = component.date.toISOString();
      let called_url = httpSpy.calls.argsFor(0)[0];
      let next_week = new Date(new Date().getTime() + 86400000 * 7);
      expect(next_week.toDateString()).toEqual(component.date.toDateString());

      expect(called_url).toEqual(
        `http://localhost:4200/api/walk/book/week/?date=${new_component_date}`
      );
    });
    it('should have a button to decrease the date by a week', () => {
      let increaseButton = fixture.debugElement.query(
        By.css('.decreaseByWeek')
      );
      increaseButton.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let new_component_date = component.date.toDateString();
      let last_week = new Date(new Date().getTime() - 86400000 * 7);
      expect(last_week.toDateString()).toEqual(new_component_date);
    });
    it('should have a button to decrease the date by a week and call the backend to check for bookings using the new date', () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      let increaseButton = fixture.debugElement.query(
        By.css('.decreaseByWeek')
      );
      increaseButton.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();
      let new_component_date = component.date.toISOString();
      let called_url = httpSpy.calls.argsFor(0)[0];
      let last_week = new Date(new Date().getTime() - 86400000 * 7);
      expect(called_url).toEqual(
        `http://localhost:4200/api/walk/book/week/?date=${new_component_date}`
      );
      expect(last_week.toDateString()).toEqual(component.date.toDateString());
    });
    it('should call updateList when the email filter is changed', () => {
      const updateSpy = spyOn(component, 'updateList');
      var get_email_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.emailFilter')
      ).nativeElement;
      get_email_field.value = 'test';
      get_email_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(updateSpy.calls.count()).toBe(1);
    });
    it('should call updateList and send a http post request containing the update in the body when the email filter is changed', () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      var get_email_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.emailFilter')
      ).nativeElement;
      get_email_field.value = 'test';
      get_email_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      var httpBody = JSON.parse(httpSpy.calls.argsFor(0)[1]);
      expect(httpBody.emailFilter).toBe('test');
    });

    it('should call updateList when the title filter is changed', () => {
      const updateSpy = spyOn(component, 'updateList');
      var get_title_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.titleFilter')
      ).nativeElement;
      get_title_field.value = 'test';
      get_title_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(updateSpy.calls.count()).toBe(1);
    });
    it('should call updateList and send a http post request containing the update in the body when the email filter is changed', () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      var get_title_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.titleFilter')
      ).nativeElement;
      get_title_field.value = 'test';
      get_title_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      var httpBody = JSON.parse(httpSpy.calls.argsFor(0)[1]);
      expect(httpBody.titleFilter).toBe('test');
    });
    it('should call updateList twice when both the filters are changed', () => {
      const updateSpy = spyOn(component, 'updateList');
      var get_title_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.titleFilter')
      ).nativeElement;
      get_title_field.value = 'test';
      get_title_field.dispatchEvent(new Event('input'));
      var get_email_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.emailFilter')
      ).nativeElement;
      get_email_field.value = 'test';
      get_email_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(updateSpy.calls.count()).toBe(2);
    });
    it('should call updateList with both pieces of data when both the filters are changed ', () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      var get_title_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.titleFilter')
      ).nativeElement;
      get_title_field.value = 'test_title';
      var get_email_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.emailFilter')
      ).nativeElement;
      get_email_field.value = 'test_email';
      get_title_field.dispatchEvent(new Event('input'));
      get_email_field.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      var httpBody = JSON.parse(httpSpy.calls.argsFor(1)[1]);
      expect(httpBody.emailFilter).toBe('test_email');
      expect(httpBody.titleFilter).toBe('test_title');
    });
    it('should load datepicker harness', async () => {
      const inputs = await loader.getAllHarnesses(MatDatepickerInputHarness);
      expect(inputs.length).toBe(1);
    });
    it('should get whether the input has an associated calendar', async () => {
      const input = await loader.getHarness(MatDatepickerInputHarness);
      expect(await input.hasCalendar()).toBeTrue();
    });
    it('should set the input value', async () => {
      const input = await loader.getHarness(MatDatepickerInputHarness);
      await input.setValue('1/1/2020');
      expect(await input.getValue()).toBe('1/1/2020');
    });

    it('should be able to open and close a calendar in popup mode', async () => {
      const input = await loader.getHarness(MatDatepickerInputHarness);
      expect(await input.isCalendarOpen()).toBe(false);
      await input.openCalendar();
      expect(await input.isCalendarOpen()).toBe(true);
      await input.closeCalendar();
      expect(await input.isCalendarOpen()).toBe(false);
    });
    it('should call onDateChange on date change', async () => {
      const updateSpy = spyOn(component, 'onDateChange');
      const input = await loader.getHarness(MatDatepickerInputHarness);
      await input.setValue('1/1/2020');
      fixture.detectChanges();
      expect(updateSpy.calls.count()).toBe(1);
    });

    it('should set the date of the component when clicked', async () => {
      const input = await loader.getHarness(MatDatepickerInputHarness);
      await input.setValue('1/1/2020');
      fixture.detectChanges();
      expect(component.date).toEqual(new Date('1/1/2020'));
    });

    it('should use the filter inputs when calling an update with the new date', async () => {
      const httpClient = TestBed.inject(HttpClient);
      const httpSpy = spyOn(httpClient, 'post');
      var get_title_field: HTMLInputElement = fixture.debugElement.query(
        By.css('.titleFilter')
      ).nativeElement;
      get_title_field.value = 'test_title';
      get_title_field.dispatchEvent(new Event('input'));
      const input = await loader.getHarness(MatDatepickerInputHarness);
      await input.setValue('1/1/2020');
      fixture.detectChanges();
      var httpBody = JSON.parse(httpSpy.calls.argsFor(1)[1]);
      expect(httpBody.titleFilter).toBe('test_title');
    });

  });
});
