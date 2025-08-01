import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { Topbar, TopbarLink } from './topbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AuthCheck } from '../auth/auth-check';
import { asyncScheduler, scheduled } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

describe('Topbar', () => {
  let component: Topbar;
  let fixture: ComponentFixture<Topbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Topbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Topbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: 'app-test', template: '' })
class testStubComponent {}

describe('TopbarLink', () => {
  let component: TopbarLink;
  let fixture: ComponentFixture<TopbarLink>;

  beforeEach(async () => {});

  describe('No sublinks', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TopbarLink, testStubComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {},
            },
          },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(TopbarLink);

      fixture.componentRef.setInput('label', 'label');
      fixture.componentRef.setInput('href', '/test');
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should have the label given', () => {
      let elemSearch = fixture.debugElement.query(By.css('.mainLink'));
      expect(elemSearch.nativeElement.textContent).toBe('label');
    });
    it('should have the correct router link given', () => {
      let elemSearch = fixture.debugElement.query(By.css('.mainLink'));
      expect(elemSearch.nativeElement.href).toBe('http://localhost:9876/test');
    });
    it('should redirect when link is clicked', fakeAsync(() => {
      let elemSearch = fixture.debugElement.query(By.css('.mainLink'));
      elemSearch.nativeElement.click();
      let linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
      let routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
      TestBed.inject(Router).resetConfig([{ path: '**', children: [] }]);
      elemSearch.triggerEventHandler('click', { button: 0 });
      tick();
      fixture.detectChanges();
      expect(TestBed.inject(Router).url).toBe('/test');
    }));
  });
  describe('With sublinks', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TopbarLink, testStubComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {},
            },
          },
          {
            provide: CookieService,
            useValue: {
              get: () => {
                return 'test string';
              },
            },
          },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(TopbarLink);

      fixture.componentRef.setInput('label', 'label');
      fixture.componentRef.setInput('href', '/');
      fixture.componentRef.setInput('sublinks', [
        { label: 'sublabel', href: '/test', class: 'class' },
      ]);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should have the label given', () => {
      let elemSearch = fixture.debugElement.query(By.css('.mainLink'));
      expect(elemSearch.nativeElement.textContent).toBe('label');
    });
    it('should have the correct router link given', () => {
      let elemSearch = fixture.debugElement.query(By.css('.mainLink'));
      expect(elemSearch.nativeElement.href).toBe('http://localhost:9876/');
    });
    it('should redirect when link is clicked', fakeAsync(() => {
      let elemSearch = fixture.debugElement.query(By.css('.mainLink'));
      elemSearch.nativeElement.click();
      let linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
      let routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
      TestBed.inject(Router).resetConfig([{ path: '**', children: [] }]);
      elemSearch.triggerEventHandler('click', { button: 0 });
      tick();
      fixture.detectChanges();
      expect(TestBed.inject(Router).url).toBe('/');
    }));
    it('should have sublink button when given sublinks', () => {
      let elemSearch = fixture.debugElement.queryAll(
        By.css('.icon-button-fix')
      );
      expect(elemSearch.length).toBe(1);
    });
    it('should contain one sublink when given the data for one sublink', () => {
      let elemButton = fixture.debugElement.query(By.css('.icon-button-fix'));
      elemButton.nativeElement.click();
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.queryAll(By.css('.subLink'));
      expect(elemSearch.length).toBe(1);
    });
    
    it('should contain one sublink which should redirect correctly when given the data for one sublink',fakeAsync( () => {
      let elemButton = fixture.debugElement.query(By.css('.icon-button-fix'));
      elemButton.nativeElement.click();
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.subLink'));
      let linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
      let routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
      TestBed.inject(Router).resetConfig([{ path: '**', children: [] }]);
      elemSearch.triggerEventHandler('click', { button: 0 });
      tick();
      fixture.detectChanges();
      expect(TestBed.inject(Router).url).toBe('/test');
    }));
    
    it('should contain one sublink with correct label when given the data for one sublink', () => {
      let elemButton = fixture.debugElement.query(By.css('.icon-button-fix'));
      elemButton.nativeElement.click();
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.subLink'));
      expect(elemSearch.nativeElement.textContent).toBe('sublabel');
    });
    it('should contain one sublink with correct href given the data for one sublink', () => {
      let elemButton = fixture.debugElement.query(By.css('.icon-button-fix'));
      elemButton.nativeElement.click();
      fixture.detectChanges();
      let elemSearch = fixture.debugElement.query(By.css('.subLink'));
      expect(elemSearch.nativeElement.href).toBe('http://localhost:9876/test');
    });
  });
});
