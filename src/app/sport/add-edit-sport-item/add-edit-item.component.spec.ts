import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditSportItemComponent } from './add-edit-item.component';
import { MAT_DIALOG_DATA } from '@angular/material';

describe('AddEditSportItemComponent', () => {
  let component: AddEditSportItemComponent;
  let fixture: ComponentFixture<AddEditSportItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSportItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSportItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
