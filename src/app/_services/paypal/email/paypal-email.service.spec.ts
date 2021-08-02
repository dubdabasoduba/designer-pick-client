import {TestBed} from '@angular/core/testing';

import {PaypalEmailService} from './paypal-email.service';

describe('PaypalService', () => {
	let service: PaypalEmailService;
	
	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PaypalEmailService);
	});
	
	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
