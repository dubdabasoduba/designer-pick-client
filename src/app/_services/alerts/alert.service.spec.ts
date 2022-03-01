/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

/* tslint:disable:no-unused-variable */

/* tslint:disable:no-unused-variable */
import {inject, TestBed} from '@angular/core/testing';
import {AlertService} from './alert.service';

describe('AlertService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AlertService]
		});
	});
	
	it('should ...', inject([AlertService], (service: AlertService) => {
		expect(service).toBeTruthy();
	}));
});
