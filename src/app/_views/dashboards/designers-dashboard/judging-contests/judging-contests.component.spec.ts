/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JudgingContestsComponent} from './judging-contests.component';

describe('JudgingContestsComponent', () => {
	let component: JudgingContestsComponent;
	let fixture: ComponentFixture<JudgingContestsComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [JudgingContestsComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(JudgingContestsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
