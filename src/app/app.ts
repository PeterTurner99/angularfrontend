import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar, TopbarLink } from './topbar/topbar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Topbar, TopbarLink],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  protected title = 'Frontend ';
  listOfLinks = [
    {
      href: '',
      label: 'Dashboard',
      sublinks: [],
    },

    {
      href: 'login',
      label: 'login',
      class: '',
      sublinks: [
        {
          label: 'View Profile',
          href: 'view_profile',
          class: '',
        },
        {
          label: 'Logout',
          href: 'logout',
          class: '',
        },
      ],
      topbar_class: 'ml-auto',
    },
  ];
}
