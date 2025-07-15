import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';

type ProfileData = {
  email: string;
  username: string;
  max_bookings_at_once: number;
};

@Component({
  selector: 'app-view-profile',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.less',
})
export class ViewProfile {
  profile_data_getter: Observable<ProfileData>;
  constructor() {
    this.profile_data_getter =
      this.http.get<ProfileData>(`/api/auth/profile/`);
  }
  private http = inject(HttpClient);
}
