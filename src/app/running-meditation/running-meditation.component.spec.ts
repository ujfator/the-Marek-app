import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningMeditationComponent } from './running-meditation.component';

describe('RunningMeditationComponent', () => {
  let component: RunningMeditationComponent;
  let fixture: ComponentFixture<RunningMeditationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningMeditationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningMeditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
