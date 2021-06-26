/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../../../_services';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
    selector: 'app-acquisitions',
    templateUrl: './clients-dashboard.component.html',
    styleUrls: ['./clients-dashboard.component.css']
})
export class ClientsDashboardComponent implements OnInit {
    loading = false;
    public acquisitions = [];
    private investments = [];
    private responseModel = new ResponseModel();

    constructor(
        private alertService: AlertService) {
    }

    ngOnInit() {
        //this.getRecentAcquisitions();
    }
}
