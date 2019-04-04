import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBodyMindComponent } from './add-edit-body-mind.component';

describe('AddEditBodyMindComponent', () => {
  let component: AddEditBodyMindComponent;
  let fixture: ComponentFixture<AddEditBodyMindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBodyMindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBodyMindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
