import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContestStagesComponent} from './contest-stages.component';

describe('ContestStagesComponent', () => {
	let component: ContestStagesComponent;
	let fixture: ComponentFixture<ContestStagesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ContestStagesComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ContestStagesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
