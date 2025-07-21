import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Index } from './index';
import { provideRouter } from '@angular/router';

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
});
