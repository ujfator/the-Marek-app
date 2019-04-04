import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMindComponent } from './body-mind.component';

describe('BodyMindComponent', () => {
  let component: BodyMindComponent;
  let fixture: ComponentFixture<BodyMindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyMindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyMindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
