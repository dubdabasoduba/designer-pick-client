/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthenticationService} from '../../../_services';
import {appConstants} from '../../../_helpers/app.constants';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.css']
})
export class VerifyEmailComponent implements OnInit {
    model: any = {};
    userId: string;
    verificationCode: string;
    loading = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userId = params['userId'];
            this.verificationCode = params['token'];
        });

        if (this.userId != null && this.verificationCode != null) {
            this.verifyAccount();
        }
    }

    verifyAccount() {
        this.loading = true;
        this.authenticationService.verifyAccount(this.userId, this.verificationCode)
            .subscribe(
                data => {
                    this.alertService.success(data, false);
                    this.loading = false;
                    this.router.navigateByUrl(appConstants.authSIgnInUrl);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.router.navigateByUrl(appConstants.authSIgnInUrl);
                }
            );
    }
}
