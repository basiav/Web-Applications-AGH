import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDishFormComponent } from './add-dish-form.component';

describe('AddDishFormComponent', () => {
  let component: AddDishFormComponent;
  let fixture: ComponentFixture<AddDishFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDishFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
