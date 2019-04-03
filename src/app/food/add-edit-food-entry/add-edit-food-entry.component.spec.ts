import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFoodEntryComponent } from './add-edit-food-entry.component';

describe('AddEditFoodEntryComponent', () => {
  let component: AddEditFoodEntryComponent;
  let fixture: ComponentFixture<AddEditFoodEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditFoodEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFoodEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
