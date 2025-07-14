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
    },

    {
      href: 'login',
      label: 'login',
    },
  ];
}
