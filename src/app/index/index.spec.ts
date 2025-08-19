import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Index } from './index';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('Index', () => {
  let component: Index;
  let fixture: ComponentFixture<Index>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Index],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Index);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a link to redirect you to to a page to add a booking', () => {
    const firstLink = fixture.debugElement.query(By.css('.link_1'));
    expect(firstLink.nativeElement.href).toBe('http://localhost:9876/book')
  });
  it('should have a link to redirect you to to a page to view your bookings', () => {
    const firstLink = fixture.debugElement.query(By.css('.link_2'));
    expect(firstLink.nativeElement.href).toBe('http://localhost:9876/bookings')
  });
});
