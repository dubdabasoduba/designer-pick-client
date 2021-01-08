import {TestBed} from '@angular/core/testing';

import {LogoUsesService} from './logo-uses.service';

describe('LogoUsesService', () => {
    let service: LogoUsesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LogoUsesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
