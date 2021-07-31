import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WonContestsComponent} from './won-contests.component';

describe('WonContestsComponent', () => {
	let component: WonContestsComponent;
	let fixture: ComponentFixture<WonContestsComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [WonContestsComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(WonContestsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
