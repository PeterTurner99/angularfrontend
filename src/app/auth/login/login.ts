import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthCheck } from '../auth-check';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PasswordField } from '../../../library/password-field/password-field';
declare global {
  interface Window {
    onGoogleSignIn: (response: any) => void;
  }
}

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterLink,
    PasswordField,
  ],
  templateUrl: './login.html',
  styleUrl: './login.less',
})
export class Login {
  ngOnInit(): void {
    this.http
      .get<{'result':boolean}>('http://localhost:4200/api/auth/flags/?flag_name=google_login')
      .subscribe((data) => {
        if (!data.result){
            return false
        }
        this.showOtherLogins = true
        const body = <HTMLDivElement>document.body;
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        
        body.appendChild(script);
        window.onGoogleSignIn = (response: {}) => {
          console.log(response, this.http);
          this.http
            .post<{ token: string }>(
              'http://localhost:4200/api/auth/social/google/',
              response,
              {
                responseType: 'json',
              }
            )
            .subscribe({
              next: (config) => {
                console.log(config);
                let token = config.token;
                this.cookieService.set('userToken', token, {
                  secure: true,
                  sameSite: 'Strict',
                });
                this.authCheck.sendUpdate(true);
                this.router.navigate(['/']);
              },
              error: (error) => {
                this.showError = true;
                this.errors = Object.values(error.error);
              },
            });
        };
        return true
      });
  }

  private http = inject(HttpClient);
  cookieService = inject(CookieService);
  private router = inject(Router);
  private authCheck = inject(AuthCheck);
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  showOtherLogins = false
  showError = false;
  errors = [''];
  login = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  onGoogleSignIn(response: {}) {
    console.log(response, this.http);
    this.http
      .post<{ token: string }>(
        'http://localhost:4200/api/auth/social/google/',
        response,
        {
          responseType: 'json',
        }
      )
      .subscribe({
        next: (config) => {
          console.log(config);
          let token = config.token;
          this.cookieService.set('userToken', token, {
            secure: true,
            sameSite: 'Strict',
          });
          this.authCheck.sendUpdate(true);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.showError = true;
          this.errors = Object.values(error.error);
        },
      });
  }
  onSubmit() {
    var form_values = this.login.value;
    var username = form_values.username!;
    var password = form_values.password!;
    var data = JSON.stringify({ username: username, password: password });
    this.http
      .post<{ token: string }>(
        'http://localhost:4200/api/auth/login/',
        {},
        {
          responseType: 'json',
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          },
        }
      )
      .subscribe({
        next: (config) => {
          console.log(config);
          let token = config.token;
          this.cookieService.set('userToken', token, {
            secure: true,
            sameSite: 'Strict',
          });
          this.authCheck.sendUpdate(true);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.showError = true;
          this.errors = Object.values(error.error);
        },
      });
  }
}
