import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditWorkflowItemComponent } from './add-edit-workflow-item.component';
import { MAT_DIALOG_DATA } from '@angular/material';

describe('AddEditWorkflowItemComponent', () => {
  let component: AddEditWorkflowItemComponent;
  let fixture: ComponentFixture<AddEditWorkflowItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditWorkflowItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWorkflowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
