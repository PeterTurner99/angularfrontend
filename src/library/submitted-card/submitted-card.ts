import { Component, input } from '@angular/core';

@Component({
  selector: 'submitted-card',
  imports: [],
  templateUrl: './submitted-card.html',
  styleUrl: './submitted-card.less'
})
export class SubmittedCard {
    submitted = input(false)
}
