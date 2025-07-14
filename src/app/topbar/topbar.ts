import { Component, inject, input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { AuthCheck } from '../auth/auth-check';
@Component({
  selector: 'topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.less',
})
export class Topbar {}

@Component({
  selector: 'TopbarLink',
  imports: [RouterLink, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './TopbarLinks.html',
  styleUrl: './topbar.less',
})
export class TopbarLink {
  constructor() {
    const cookieService = inject(CookieService);
    const authToken = cookieService.get('userToken');
    if (authToken) {
      this.show_sublinks = true;
    }
    this.authCheckSubscription = this.authCheck
      .getUpdate()
      .subscribe((update) => {
        this.show_sublinks = update;
      });
  }
  label = input.required();
  private authCheckSubscription;
  authCheck = inject(AuthCheck);
  href = input.required();
  class = input();
  icon = input('');
  sublinks = input<{ label: string; href: string; class: string }[]>([]);
  show_sublinks = false;

  ngOnDestroy() {
    this.authCheckSubscription.unsubscribe();
  }
}
