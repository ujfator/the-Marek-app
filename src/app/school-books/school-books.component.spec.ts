import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolBooksComponent } from './school-books.component';

describe('SchoolBooksComponent', () => {
  let component: SchoolBooksComponent;
  let fixture: ComponentFixture<SchoolBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
