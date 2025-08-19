import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logout } from './logout';
import { By } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

describe('Logout', () => {
  let component: Logout;
  let fixture: ComponentFixture<Logout>;
  let cookieService: CookieService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logout);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cookieService = TestBed.inject(CookieService);
    cookieService.delete('userToken');
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call logout on button press', () => {
    const logoutButton = fixture.debugElement.query(By.css('.logoutButton'))
    const submitFnc = spyOn(component, 'logout');
    logoutButton.nativeElement.click()
    expect(submitFnc).toHaveBeenCalled()
    
  })
  it('should delete the login token when the button is pressed', () => {
    cookieService.set('userToken','tempToken')
    const logoutButton = fixture.debugElement.query(By.css('.logoutButton'))
    logoutButton.nativeElement.click()
    expect(cookieService.get('userToken')).toBe('')
    cookieService.delete('userToken')    
  })
  
});
