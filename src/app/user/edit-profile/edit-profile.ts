import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorCard } from '../../../library/error-card/error-card';
import { SubmittedCard } from '../../../library/submitted-card/submitted-card';
import { Router } from '@angular/router';
type ProfileData = {
  email: string;
  username: string;
  max_bookings_at_once: number;
};

@Component({
  selector: 'app-edit-profile',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ErrorCard,
    SubmittedCard,
  ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.less',
})
export class EditProfile {
  constructor() {
    this.http.get<ProfileData>(`/api/auth/profile/`).subscribe({
      next: (data) => {
        this.edit_profile_form.setValue({
          username: data['username'],
          email: data['email'],
          max_bookings_at_once: data['max_bookings_at_once'],
        });
      },
    });
  }
  submitted = false;
  showError = false;
  errors = [['']];
  private http = inject(HttpClient);
  private router = inject(Router);

  edit_profile_form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    max_bookings_at_once: new FormControl(5, [Validators.required]),
  });

  onSubmit() {
    var processed_data = JSON.stringify(this.edit_profile_form.getRawValue());
    this.http
      .post<ProfileData>(
        `http://localhost:4200/api/auth/profile/`,
        processed_data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.submitted = true;
          this.edit_profile_form.setValue({
            username: data['username'],
            email: data['email'],
            max_bookings_at_once: data['max_bookings_at_once'],
          });
          setTimeout(() => {
            this.submitted = false;
          }, 5000);
        },
        error: (error) => {
          this.showError = true;
          this.errors = Object.values(error.error);
        },
      });
  }

  redirect() {
    this.router.navigate(['/view_profile/']);
  }
}
