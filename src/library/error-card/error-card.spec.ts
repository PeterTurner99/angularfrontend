import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCard } from './error-card';
import { By } from '@angular/platform-browser';

describe('ErrorCard', () => {
  let component: ErrorCard;
  let fixture: ComponentFixture<ErrorCard>;
  let errorsArray  = [['Error test']]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain error message when given in correct format', ()=> {
    fixture.componentRef.setInput('errors', errorsArray );
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.queryAll(By.css('li'));
    expect( elemSearch.length).toBeTruthy()
  })
  it('should contain error message when given in correct format with contents "Error test', ()=> {
    fixture.componentRef.setInput('errors', errorsArray );
    fixture.detectChanges();
    let elemSearch = fixture.debugElement.query(By.css('li'));
    expect( elemSearch.nativeElement.textContent).toBe('Error test')
  })
});
