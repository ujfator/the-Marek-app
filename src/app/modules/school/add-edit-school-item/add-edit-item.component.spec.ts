import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditFoodItemComponent } from './add-edit-item.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('AddEditFoodItemComponent', () => {
  let component: AddEditFoodItemComponent;
  let fixture: ComponentFixture<AddEditFoodItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditFoodItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFoodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
