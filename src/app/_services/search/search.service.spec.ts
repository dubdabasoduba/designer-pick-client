/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {TestBed} from '@angular/core/testing';

import {SearchService} from './search.service';

describe('SearchService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));
	
	it('should be created', () => {
		const service: SearchService = TestBed.get(SearchService);
		expect(service).toBeTruthy();
	});
});
