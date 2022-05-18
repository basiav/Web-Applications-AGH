import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyChoiceComponent } from './currency-choice.component';

describe('CurrencyChoiceComponent', () => {
  let component: CurrencyChoiceComponent;
  let fixture: ComponentFixture<CurrencyChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
