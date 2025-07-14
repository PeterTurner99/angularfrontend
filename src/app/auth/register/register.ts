import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { PasswordField } from '../../../library/password-field/password-field';
import { ErrorCard } from '../../../library/error-card/error-card';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    PasswordField,
    ErrorCard
  ],
  templateUrl: './register.html',
  styleUrl: './register.less',
})
export class Register {
  register = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  private http = inject(HttpClient);
  showError = false;
  errors = [['']];
  cookieService = inject(CookieService);
  private router = inject(Router);
  onSubmit() {
    var form_values = this.register.getRawValue();
    var data = JSON.stringify(form_values);
    console.log(data);
    this.http
      .post<{ token: string }>(
        'http://localhost:4200/api/auth/register/',
        data,
        {
          responseType: 'json',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'none',
          },
        }
      )
      .subscribe(
        {
          next: (config) => {
            let token = config.token;
            this.cookieService.set('userToken', token, {
              secure: true,
              sameSite: 'Strict',
            });
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.showError = true;
            this.errors = Object.values(error.error);
          },
        }
      );
  }
}
