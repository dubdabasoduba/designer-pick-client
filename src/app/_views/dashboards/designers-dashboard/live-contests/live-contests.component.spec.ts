import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveContestsComponent } from './live-contests.component';

describe('LiveContestsComponent', () => {
  let component: LiveContestsComponent;
  let fixture: ComponentFixture<LiveContestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveContestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveContestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
