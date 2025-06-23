import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
  import { Calendar } from './../../library/calendar/calendar';
type DateRecord = Record<
    string, {
      title: string;
      description: string;
      start: string;
      end: string;
    }[][]>;
@Component({
  selector: 'app-bookings-list',
  imports: [MatCardModule, MatDividerModule, MatProgressSpinnerModule, Calendar],
templateUrl: './bookings-list.html',
  styleUrl: './bookings-list.less'
})
export class BookingsList {
    date = new Date()
    booking_list = httpResource<DateRecord>(() =>( {
        url: '/api/walk/book/week/',
        method: 'GET',
        reportProgress: true,
    
    })
    )
}
