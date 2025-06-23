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

import { Router } from '@angular/router';
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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './book.html',
  styleUrl: './book.less',
})
export class Book {
  private http = inject(HttpClient);
  private router = inject(Router);
  submitted = false
  bookingFormGroup = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    title: new FormControl('', [Validators.required]),
  });
  onSubmit() {
    var data = JSON.stringify(this.bookingFormGroup.getRawValue());
    console.log(data);
    this.http
      .post('http://localhost:4200/api/walk/book/', data, {headers:{'Content-Type':'application/json'}})
      .subscribe((data) => {
        console.log(data);
        this.submitted = true
      });
  }
}
