import {TestBed} from '@angular/core/testing';

import {LogoBriefsService} from './logo-briefs.service';

describe('LogoBriefsService', () => {
	let service: LogoBriefsService;
	
	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(LogoBriefsService);
	});
	
	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
