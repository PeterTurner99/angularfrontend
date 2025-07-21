import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfile } from './view-profile';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ViewProfile', () => {
  let component: ViewProfile;
  let fixture: ComponentFixture<ViewProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProfile],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
