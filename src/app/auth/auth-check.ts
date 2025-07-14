import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthCheck {
  private subject = new Subject<boolean>()
  sendUpdate(authed: boolean){
    this.subject.next(authed)
  }
  getUpdate(){
    return this.subject.asObservable();
  }
  
}
