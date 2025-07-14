import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'error-card',
  imports: [MatCardModule],
  templateUrl: './error-card.html',
  styleUrl: './error-card.less'
})
export class ErrorCard {
    errors = input<string[][]>()
}
