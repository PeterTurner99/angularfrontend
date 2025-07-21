import { Component, computed, inject, input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
type DateRecordHolder = Record<
  string,
  {
    title: string;
    description: string;
    start: string;
    end: string;
    id: number;
  }[][]
>;
type HourRecord = {
  title: string;
  description: string;
  start: string;
  end: string;
  id: number;
};

@Component({
  selector: 'app-calendar',
  imports: [MatGridListModule, MatCardModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.less',
})
export class Calendar {
  hours = [...Array(24).keys()];
  data = input.required<DateRecordHolder>();
  readonly dialog = inject(MatDialog);
  data_keys = computed(() => Object.keys(this.data()));
  data_processed_keys = computed(() => {
    let keys = Object.keys(this.data());
    let processed_keys = keys.map((value) => {
      let date: Date = new Date(Date.parse(value));
      return date.getDate();
    });
    return processed_keys;
  });
  openDialog(item: HourRecord) {
    this.dialog.open(CalendarDialog, {
      data: item,
    });
  }
}

@Component({
  selector: 'calendar-dialog',
  templateUrl: './calendar-dialog.html',
  imports: [MatButtonModule, MatDialogClose, MatDialogTitle, MatDialogContent],
  styleUrl: './calendar-dialog.less',
})
export class CalendarDialog {
  data = inject(MAT_DIALOG_DATA);
  start_date: Date = new Date(Date.parse(this.data.start));
  end_date: Date = new Date(Date.parse(this.data.end));
  start_date_string = this.start_date.toLocaleDateString();
  end_date_string = this.end_date.toLocaleDateString();
  start_time = this.start_date.toLocaleTimeString();
  end_time = this.end_date.toLocaleTimeString();
}
