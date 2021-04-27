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
