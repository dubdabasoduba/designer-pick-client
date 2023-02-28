import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientDraftContestsComponent} from './client-draft-contests.component';

describe('ClientDraftContestsComponent', () => {
	let component: ClientDraftContestsComponent;
	let fixture: ComponentFixture<ClientDraftContestsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientDraftContestsComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ClientDraftContestsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
