import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewSingleContestComponent} from './view-single-contest.component';

describe('ViewSingleContestComponent', () => {
	let component: ViewSingleContestComponent;
	let fixture: ComponentFixture<ViewSingleContestComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ViewSingleContestComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ViewSingleContestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
