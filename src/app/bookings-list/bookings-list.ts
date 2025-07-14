import { HttpClient, httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { Calendar } from './../../library/calendar/calendar';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

type DateRecordHolder = Record<
  string,
  {
    title: string;
    description: string;
    start: string;
    end: string;
    id: number;
  }[][]
>;

@Component({
  selector: 'app-bookings-list',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    Calendar,
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './bookings-list.html',
  styleUrl: './bookings-list.less',
})
export class BookingsList {
  constructor() {
    this.bookingList = this.http.get<DateRecordHolder>(
      `/api/walk/book/week/?${this.date.toISOString()}`
    );
  }
  private http = inject(HttpClient);
  date = new Date();
  bookingList: Observable<DateRecordHolder>;

  updateList() {
    var data = JSON.stringify(this.filterGroup.getRawValue());
    this.bookingList = this.http.post<DateRecordHolder>(
      `http://localhost:4200/api/walk/book/week/?date=${this.date.toISOString()}`,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  filterGroup = new FormGroup({
    emailFilter: new FormControl(''),
    titleFilter: new FormControl(''),
  });

  dateChange(changeAmount: number) {
    this.date = new Date(this.date.getTime() + 86400000 * changeAmount);
    var data = JSON.stringify(this.filterGroup.getRawValue());
    this.bookingList = this.http.post<DateRecordHolder>(
      `http://localhost:4200/api/walk/book/week/?date=${this.date.toISOString()}`,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  onDateChange() {
    var data = JSON.stringify(this.filterGroup.getRawValue());
    this.bookingList = this.http.post<DateRecordHolder>(
      `http://localhost:4200/api/walk/book/week/?date=${this.date.toISOString()}`,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
