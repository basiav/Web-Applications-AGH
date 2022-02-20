import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionMenuComponent } from './expansion-menu.component';

describe('ExpansionMenuComponent', () => {
  let component: ExpansionMenuComponent;
  let fixture: ComponentFixture<ExpansionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
