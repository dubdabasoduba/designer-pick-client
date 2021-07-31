import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientEndedContestsComponent} from './client-ended-contests.component';

describe('ClientEndedContestsComponent', () => {
	let component: ClientEndedContestsComponent;
	let fixture: ComponentFixture<ClientEndedContestsComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [ClientEndedContestsComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(ClientEndedContestsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
