import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientLiveContestsComponent} from './client-live-contests.component';

describe('ClientLiveContestsComponent', () => {
	let component: ClientLiveContestsComponent;
	let fixture: ComponentFixture<ClientLiveContestsComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [ClientLiveContestsComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(ClientLiveContestsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});