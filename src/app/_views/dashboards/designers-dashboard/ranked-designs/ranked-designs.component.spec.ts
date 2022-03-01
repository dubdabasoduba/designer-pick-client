/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RankedDesignsComponent} from './ranked-designs.component';

describe('RankedDesignsComponent', () => {
	let component: RankedDesignsComponent;
	let fixture: ComponentFixture<RankedDesignsComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [RankedDesignsComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(RankedDesignsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
