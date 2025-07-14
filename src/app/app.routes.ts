import { Routes } from '@angular/router';
import { Test } from './test/test';
import { Index } from './index/index';
import { Login } from './auth/login/login';
import { authGuard } from './auth-guard';
import { Book } from './book/book';
import {Register} from './auth/register/register'
import { BookingsList } from './bookings-list/bookings-list';
import { Logout } from './auth/logout/logout';
export const routes: Routes = [
  {
    path: 'test',
    component: Test,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: Index,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'book',
    component: Book,
    canActivate: [authGuard],
  },
  {
    path: 'bookings',
    component: BookingsList,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'logout',
    component: Logout,
    canActivate: [authGuard]
  }
];
