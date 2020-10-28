/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

/* tslint:disable:no-unused-variable */

/* tslint:disable:no-unused-variable */
import {inject, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';

describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService]
        });
    });

    it('should ...', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));
});
