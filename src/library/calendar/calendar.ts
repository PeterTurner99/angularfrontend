import { Component, computed, input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

type DateRecord = Record<
  string,
  {
    title: string;
    description: string;
    start: string;
    end: string;
  }[][]
>;

@Component({
  selector: 'app-calendar',
  imports: [MatGridListModule, MatCardModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.less',
})
export class Calendar {
  hours = [...Array(24).keys()];
  data = input.required<DateRecord>();

  data_keys = computed(() => Object.keys(this.data()));
  data_processed_keys = computed(() => {
    let keys = Object.keys(this.data());
    let processed_keys = keys.map((value) => {
      let date: Date = new Date(Date.parse(value));
      return date.getDate();
    });
    return processed_keys;
  });
}
