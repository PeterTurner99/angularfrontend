import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthCheck } from '../auth-check';

@Component({
  selector: 'app-logout',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './logout.html',
  styleUrl: './logout.less',
})
export class Logout {
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private authCheck = inject(AuthCheck)
  logout() {
    this.cookieService.delete('userToken');
    this.authCheck.sendUpdate(false);
    this.router.navigate(['/']);
  }
}
