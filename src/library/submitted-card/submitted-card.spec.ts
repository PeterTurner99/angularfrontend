import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedCard } from './submitted-card';

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
});
