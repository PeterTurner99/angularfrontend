import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorCard } from '../../library/error-card/error-card';
import { Router } from '@angular/router';
import { SubmittedCard } from "../../library/submitted-card/submitted-card";
@Component({
  selector: 'app-book',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTimepickerModule,
    MatInputModule,
    MatFormFieldModule,
    ErrorCard,
    SubmittedCard
],
  providers: [provideNativeDateAdapter()],
  templateUrl: './book.html',
  styleUrl: './book.less',
})
export class Book {
  private http = inject(HttpClient);
  private router = inject(Router);
  date = new Date();
  showError = false;
  errors = [['']];
  submitted = false;
  bookingFormGroup = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', ),
    endDate: new FormControl('', [Validators.required]),
    endTime: new FormControl('', ),
    description: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    booked_email: new FormControl('', [Validators.email, Validators.required]),
    booked_name: new FormControl('', [Validators.required]),
  });
  onSubmit() {
    var data: {
      startDate: string | null;
      startTime?: string | null;
      endDate: string | null;
      endTime?: string | null;
      description: string | null;
      title: string | null;
      booked_email: string | null;
      booked_name: string | null;
    } = this.bookingFormGroup.getRawValue();
    var end_date = data['endDate'];
    var end_time = data['endTime'];
    var start_date = data['startDate'];
    var start_time = data['startTime'];
    delete data.endTime;
    delete data.startTime;
    data['endDate'] = new Date(
      Date.parse(
        new Date(Date.parse(end_date!)).toDateString() +
          ' ' +
          new Date(Date.parse(end_time!)).toTimeString()
      )
    ).toISOString();
    data['startDate'] = new Date(
      Date.parse(
        new Date(Date.parse(start_date!)).toDateString() +
          ' ' +
          new Date(Date.parse(start_time!)).toTimeString()
      )
    ).toISOString();

    var processed_data = JSON.stringify({
      data,
    });
    console.log(data);
    this.http
      .post(`http://localhost:4200/api/walk/book/`, processed_data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.submitted = true;
          setTimeout(() => {
            this.router.navigate(['bookings/']);
          }, 5000);
        },
        error: (error) => {
          this.showError = true;
          this.errors = Object.values(error.error);
        },
      });
  }
  onAgainSubmit() {
    var data: {
      startDate: string | null;
      startTime?: string | null;
      endDate: string | null;
      endTime?: string | null;
      description: string | null;
      title: string | null;
      booked_email: string | null;
      booked_name: string | null;
    } = this.bookingFormGroup.getRawValue();
    var end_date = data['endDate'];
    var end_time = data['endTime'];
    var start_date = data['startDate'];
    var start_time = data['startTime'];
    delete data.endTime;
    delete data.startTime;
    var test_date =
      new Date(Date.parse(end_date!)).toDateString() +
      ' ' +
      new Date(Date.parse(end_time!)).toTimeString();
    console.log(test_date);
    data['endDate'] = new Date(
      Date.parse(
        new Date(Date.parse(end_date!)).toDateString() +
          ' ' +
          new Date(Date.parse(end_time!)).toTimeString()
      )
    ).toISOString();
    data['startDate'] = new Date(
      Date.parse(
        new Date(Date.parse(start_date!)).toDateString() +
          ' ' +
          new Date(Date.parse(start_time!)).toTimeString()
      )
    ).toISOString();

    var processed_data = JSON.stringify({
      data,
    });
    console.log(data);
    this.http
      .post(`http://localhost:4200/api/walk/book/`, processed_data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({ next: (data) => {
        console.log(data);
        this.submitted = true;
        setTimeout(() => {
          this.submitted = false;
          //   this.bookingFormGroup.reset();
        }, 2000);
      },
     error: (error) => {
          this.showError = true;
          this.errors = Object.values(error.error);
        }
    });
  }
}
