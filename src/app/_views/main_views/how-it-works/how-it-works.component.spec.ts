/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {HowItWorksComponent} from './how-it-works.component';

describe('ResultComponent', () => {
	let component: HowItWorksComponent;
	let fixture: ComponentFixture<HowItWorksComponent>;
	
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
				declarations: [HowItWorksComponent]
			})
			.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(HowItWorksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
