/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, AuthenticationService} from '../../../../_services';
import {AuthenticatedUserModel, ContestModel} from "../../../../_models";
import {appConstants} from "../../../../_helpers";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-acquisitions',
    templateUrl: './clients-dashboard.component.html',
    styleUrls: ['./clients-dashboard.component.css']
})
export class ClientsDashboardComponent implements OnInit {
    loading = false;
    lbsUser: AuthenticatedUserModel;
    public userId: string;

    constructor(
        private alertService: AlertService, private authenticationService: AuthenticationService,
        private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.lbsUser = this.authenticationService.getCurrentUser();
        this.route.params.subscribe(params => {
            this.userId = params[appConstants.id];
        });
    }
}
