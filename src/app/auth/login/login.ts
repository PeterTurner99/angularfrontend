import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    
  ],
  templateUrl: './login.html',
  styleUrl: './login.less',
})
export class Login {
  private http = inject(HttpClient);
  cookieService = inject(CookieService);
  private router = inject(Router);
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  onSubmit() {
    var form_values = this.login.value;
    var username = form_values.username!;
    var password = form_values.password!;
    var data = JSON.stringify({ username: username, password: password });
    this.http
      .post<{ token: string }>('http://localhost:4200/api/auth/login/', {}, {
        responseType: 'json',
        headers: { Authorization: `Basic ${btoa(`${username}:${password}`)}` },
      })
      .subscribe((config) => {
        console.log(config);
        let token = config.token;
        this.cookieService.set('userToken', token,{secure:true,sameSite:'Strict'});
        this.router.navigate(['/']);
      });
  }
}
