import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsList } from './bookings-list';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('BookingsList', () => {
  let component: BookingsList;
  let fixture: ComponentFixture<BookingsList>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
