/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, PagerService} from '../../../../_services';
import {PageModel} from '../../../../_models';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
    selector: 'app-entities',
    templateUrl: './contests.component.html',
    styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {
    loading = false;
    public organisations = [];
    pager = new PageModel();
    pagedItems: any[];
    private responseModel = new ResponseModel();

    constructor(
        private pagerService: PagerService,
        private alertService: AlertService) {
    }

    ngOnInit() {

    }

}
