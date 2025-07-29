import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';

import { ViewProfile } from './view-profile';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { asyncScheduler, scheduled } from 'rxjs';
function setTimeoutPromise(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

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
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show spinner before being given data', () => {
    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.queryAll(By.css('.spinner'));
    expect(elemSearch.length).toBe(1);
  });
  it('Should show data when given', waitForAsync(async () => {
    const httpPass = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpPass });
    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await setTimeoutPromise(1000);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.queryAll(By.css('.spinner'));
    expect(elemSearch.length).toBe(0);
  }));

  it('Should show email when data is given', waitForAsync(async () => {
    const httpPass = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpPass });
    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await setTimeoutPromise(1000);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.queryAll(By.css('.email'));
    expect(elemSearch.length).toBe(1);
  }));

  it('Should show email as "string email" when data is given', waitForAsync(async () => {
    const httpPass = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string email',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpPass });
    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await setTimeoutPromise(1000);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('.email'));
    expect(elemSearch.nativeElement.textContent).toBe('string email');
  }));

  it('Should show email as "Not set yet" when data is given', waitForAsync(async () => {
    const httpPass = {
      get: () => {
        return scheduled(
          [
            {
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpPass });
    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await setTimeoutPromise(1000);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('.email'));
    expect(elemSearch.nativeElement.textContent).toBe('Not set yet');
  }));

  it('Should show username when data is given', waitForAsync(async () => {
    const httpPass = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpPass });
    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await setTimeoutPromise(1000);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.queryAll(By.css('.username'));
    expect(elemSearch.length).toBe(1);
  }));

  it('Should show username as "string" when data is given', waitForAsync(async () => {
    const httpPass = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string email',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpPass });
    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await setTimeoutPromise(1000);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('.username'));
    expect(elemSearch.nativeElement.textContent).toBe('string');
  }));

  it('Should show username as "Not set yet" when data missing username is given', waitForAsync(async () => {
    const httpPass = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string email',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpPass });
    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await setTimeoutPromise(1000);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('.username'));
    expect(elemSearch.nativeElement.textContent).toBe('Not set yet');
  }));

  it('Should show max bookings when data is given', waitForAsync(async () => {
    const httpPass = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpPass });
    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await setTimeoutPromise(1000);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.queryAll(By.css('.bookings'));
    expect(elemSearch.length).toBe(1);
  }));

  it('Should show bookings as 5 when data is given', waitForAsync(async () => {
    const httpPass = {
      get: () => {
        return scheduled(
          [
            {
              email: 'string',
              username: 'string',
              max_bookings_at_once: 5,
            },
          ],
          asyncScheduler
        );
      },
    };
    TestBed.overrideProvider(HttpClient, { useValue: httpPass });
    fixture = TestBed.createComponent(ViewProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await setTimeoutPromise(1000);
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('.bookings'));
    expect(elemSearch.nativeElement.textContent).toBe('5');
  }));
});
