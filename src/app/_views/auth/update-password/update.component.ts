/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertService, AuthenticationService} from '../../../_services';
import {appConstants} from '../../../_helpers/app.constants';

@Component({
    selector: 'app-update-password',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
    model: any = {};
    userId: string;
    resetCode: string;
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private alertService: AlertService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
                this.userId = params['userId'];
                this.resetCode = params['token'];
            }
        );
    }

    updatePassword() {
        this.loading = true;
        this.authenticationService.updatePasswordAfterReset(this.userId, this.resetCode, this.model.password,
            this.model.confirmPassword)
            .subscribe(
                data => {
                    this.alertService.success(appConstants.passwordResetSuccessful, false);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }
}
