/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {TestBed} from '@angular/core/testing';

import {ProfileService} from './profile.service';

describe('ProfileService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));
	
	it('should be created', () => {
		const service: ProfileService = TestBed.get(ProfileService);
		expect(service).toBeTruthy();
	});
});
