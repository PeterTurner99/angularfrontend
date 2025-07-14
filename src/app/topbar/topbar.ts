import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.less',
})
export class Topbar {}

@Component({
  selector: 'TopbarLink',
  imports: [RouterLink],
  templateUrl: './TopbarLinks.html',
  styleUrl: './topbar.less',
})
export class TopbarLink {
  label = input.required();
  href = input.required();
  class = input();
}
