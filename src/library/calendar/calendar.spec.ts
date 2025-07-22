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
  let one_set_data = [
    [
      {
        title: 'title test',
        description: 'description test',
        start: '123',
        end: '1324',
        id: 1,
      },
    ],
  ];
  let empty_data = [[]];
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
//   it('should have one elemenmt when given one data element', () => {
//     fixture.componentRef.setInput('data', one_set_data);
//     fixture.detectChanges();
//     let elemSearch = fixture.debugElement.queryAll(By.css('.data-card'));
//     expect(elemSearch.length).toBe(1);
//   });
});
