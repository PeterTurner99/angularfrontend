import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedCard } from './submitted-card';
import { By } from '@angular/platform-browser';

describe('SubmittedCard', () => {
  let component: SubmittedCard;
  let fixture: ComponentFixture<SubmittedCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmittedCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmittedCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be shown when passed true', ()=> {
    fixture.componentRef.setInput('submitted', true );
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('div'));
    expect( elemSearch.nativeElement.hidden).toBeFalse()
  })
  it('should be hidden when passed false', ()=> {
    fixture.componentRef.setInput('submitted', false );
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('div'));
    expect( elemSearch.nativeElement.hidden).toBeTrue()
  })
});
