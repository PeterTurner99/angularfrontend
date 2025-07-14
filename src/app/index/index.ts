import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-index',
  imports: [MatCardModule, MatGridListModule, MatDividerModule, RouterLink],
  templateUrl: './index.html',
  styleUrl: './index.less',
})
export class Index {
  protected title = 'test ';
}
