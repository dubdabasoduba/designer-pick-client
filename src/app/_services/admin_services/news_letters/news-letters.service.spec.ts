/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {TestBed} from '@angular/core/testing';

import {NewsLettersSubscriptionsService} from './news-letters-subscriptions.service';

describe('ApiKeysService', () => {
	let service: NewsLettersSubscriptionsService;
	
	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(NewsLettersSubscriptionsService);
	});
	
	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
