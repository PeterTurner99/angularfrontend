import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import { Calendar } from './calendar';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('Calendar', () => {
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;
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
  let one_set_data_no_name = {
    '2025-07-23T10:08:15.729481+00:00': [
      [
        {
          title: 'title test',
          description: 'description test',
          start: '123',
          end: '1324',
          id: 1,
          booked_email: 'test@email.com',
        },
      ],
    ],
  };
  let empty_data = { '2025-07-23T10:08:15.729481+00:00': [[]] };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calendar],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', empty_data);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be empty without data', () => {
    let elemSearch = fixture.debugElement.queryAll(By.css('.data-card'));
    expect(elemSearch.length).toBeFalsy();
  });
  it('should have one element when given one data element', () => {
    fixture.componentRef.setInput('data', one_set_data);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.queryAll(By.css('.data-card'));
    expect(elemSearch.length).toBe(1);
  });
  it('should have one calendar card title element', () => {
    fixture.componentRef.setInput('data', one_set_data);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.queryAll(
      By.css('.calendar-card-title')
    );
    expect(elemSearch.length).toBe(1);
  });
  it('should have one calendar card contents element with contents of "title test', () => {
    fixture.componentRef.setInput('data', one_set_data);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('.calendar-card-title'));
    expect(elemSearch.nativeElement.textContent).toBe('title test');
  });

  it('should have one calendar card content element', () => {
    fixture.componentRef.setInput('data', one_set_data);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.queryAll(
      By.css('.calendar-card-contents')
    );
    expect(elemSearch.length).toBe(1);
  });
  it('should have one calendar card content element with contents of "description test', () => {
    fixture.componentRef.setInput('data', one_set_data);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(
      By.css('.calendar-card-contents')
    );
    expect(elemSearch.nativeElement.textContent).toBe('description test');
  });
  it('Should open popup when card is clicked', () => {
    fixture.componentRef.setInput('data', one_set_data);
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
    fixture.componentRef.setInput('data', one_set_data);
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
    fixture.componentRef.setInput('data', one_set_data);
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
    fixture.componentRef.setInput('data', one_set_data);
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
    fixture.componentRef.setInput('data', one_set_data);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('.data-card'));
    elemSearch.triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    let dialogSearch = fixture.debugElement.parent!.query(
      By.css('.popup-content')
    );
    let dialogDescription = dialogSearch.queryAll(By.css('.popup-description'));

    expect(dialogDescription.length).toBe(1);
  });
  it('should have popup open with description with content "description test"', () => {
    fixture.componentRef.setInput('data', one_set_data);
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
    fixture.componentRef.setInput('data', one_set_data);
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
    fixture.componentRef.setInput('data', one_set_data);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('.data-card'));
    elemSearch.triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    let dialogSearch = fixture.debugElement.parent!.query(
      By.css('.popup-content')
    );
    let dialogDescription = dialogSearch.query(By.css('.popup-email'));

    expect(dialogDescription.nativeElement.textContent).toBe("test@email.com");
  });
  
  
  it('should have have the name shown if available', () => {
    fixture.componentRef.setInput('data', one_set_data);
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
    fixture.componentRef.setInput('data', one_set_data);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('.data-card'));
    elemSearch.triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    let dialogSearch = fixture.debugElement.parent!.query(
      By.css('.popup-content')
    );
    let dialogDescription = dialogSearch.query(By.css('.popup-name'));

    expect(dialogDescription.nativeElement.textContent).toBe("test name");
  });
  
  it('should have have the not render name section if nopt given', () => {
    fixture.componentRef.setInput('data', one_set_data_no_name);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('.data-card'));
    elemSearch.triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    let dialogSearch = fixture.debugElement.parent!.query(
      By.css('.popup-content')
    );
    let dialogDescription = dialogSearch.queryAll(By.css('.popup-name'));

    expect(dialogDescription.length).toBe(0);
  });
});
