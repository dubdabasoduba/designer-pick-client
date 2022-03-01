/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsLettersSubscriptionsComponent} from './news-letters--subscriptions.component';

describe('NewsLettersComponent', () => {
	let component: NewsLettersSubscriptionsComponent;
	let fixture: ComponentFixture<NewsLettersSubscriptionsComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [NewsLettersSubscriptionsComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(NewsLettersSubscriptionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
