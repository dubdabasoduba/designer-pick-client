/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../../_services';
import {ResponseModel} from '../../../_models/response.model';

@Component({
    selector: 'app-funding',
    templateUrl: './designers-dashboard.component.html',
    styleUrls: ['./designers-dashboard.component.css']
})
export class DesignersDashboardComponent implements OnInit {
    loading = false;
    public fundings = [];
    private investments = [];
    private responseModel = new ResponseModel();

    constructor(
        private alertService: AlertService) {
    }

    ngOnInit() {
        //this.getRecentFunding();
    }

    /*getRecentFunding() {
        this.loading = true;
        this.fundingService.getFundings(0, 0, true).subscribe(
            data => {
                // @ts-ignore
                this.responseModel = data;
                this.createRecentFunding(this.responseModel.results);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private createRecentFunding(investments: any) {
        investments.forEach((investment) => {
            const funding = new Funding();
            const sponsors = investment.sponsors;
            const entity = investment.entity;
            const funding_type = investment.funding_type;

            if (investment.name !== null && entity !== null && funding_type !== null) {
                funding.id = investment._id;
                funding.name = investment.name;
                funding.amount = investment.amount > 0 ? AppCommons.shortenNumber(investment.amount,
                    2) : appConstants.notDisclosed;
                funding.funding_date = AppCommons.formatDisplayDate(new Date(investment.funding_date));
                funding.funding_type = funding_type.name;
                funding.funding_typeId = funding_type._id;
                funding.entityId = entity._id;
                funding.entity = entity.name;
                funding.entityIconImage = entity.iconImage || appConstants.defaultImageIcon;
                funding.numberOfSponsors = sponsors.length > 0 ? sponsors.length : appConstants.zeroSponsor;
                this.investments.push(funding);
            }
        });
        this.fundings = this.investments;
    }*/
}
