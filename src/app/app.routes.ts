import { Routes } from '@angular/router';
import {Test} from './test/test'
import {Index} from './index/index'
import {Login} from './auth/login/login'
import {authGuard} from './auth-guard'
import {Book} from './book/book'
import { BookingsList } from './bookings-list/bookings-list';
export const routes: Routes = [
    {
        path: 'test',
        component: Test,
        canActivate: [authGuard]
    },
    {
        path: '',
        component: Index
        
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'book',
        component: Book
    },
    {
        path: 'bookings',
        component: BookingsList
    }
];
