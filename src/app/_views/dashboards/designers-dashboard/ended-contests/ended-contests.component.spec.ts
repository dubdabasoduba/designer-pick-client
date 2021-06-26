import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndedContestsComponent } from './ended-contests.component';

describe('EndedContestsComponent', () => {
  let component: EndedContestsComponent;
  let fixture: ComponentFixture<EndedContestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndedContestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndedContestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
