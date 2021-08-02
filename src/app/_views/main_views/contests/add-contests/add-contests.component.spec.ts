import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddContestsComponent} from './add-contests.component';

describe('AddContestsComponent', () => {
	let component: AddContestsComponent;
	let fixture: ComponentFixture<AddContestsComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [AddContestsComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(AddContestsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
