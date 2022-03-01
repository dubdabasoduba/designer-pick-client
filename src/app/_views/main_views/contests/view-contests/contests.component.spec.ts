/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ContestsComponent} from './contests.component';

describe('EntitiesComponent', () => {
	let component: ContestsComponent;
	let fixture: ComponentFixture<ContestsComponent>;
	
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
				declarations: [ContestsComponent]
			})
			.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(ContestsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
