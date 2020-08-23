/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, FundingService} from '../../../../_services';
import {ActivatedRoute} from '@angular/router';
import {Funding, Sponsors} from '../../../../_models';
import {appConstants} from '../../../../_helpers/app.constants';
import {AppCommons} from '../../../../_helpers/app.commons';

@Component({
	selector: 'app-funding-display',
	templateUrl: './single-funding.component.html',
	styleUrls: ['./single-funding.component.css']
})
export class FundingDisplayComponent implements OnInit {
	loading = false;
	public funding: any;
	model: any = {};
	private fundingId: string;
	private _id = 'id';

	constructor(
		private fundingService: FundingService,
		private alertService: AlertService,
		private route: ActivatedRoute) {
	}

	private static fundingModel(investment: any, investors: any, id: string) {
		const specificFunding = new Funding();
		specificFunding.id = id;
		specificFunding.name = investment.name;
		specificFunding.amount = AppCommons.shortenNumber(investment.amount, 2);
		specificFunding.funding_date = AppCommons.formatDisplayDate(new Date(investment.funding_date));
		specificFunding.entity = investment.entity.name;
		specificFunding.entityIconImage = investment.entity.iconImage || appConstants.defaultImageIcon;
		specificFunding.entityId = investment.entity._id;
		specificFunding.funding_type = investment.funding_type.name;
		specificFunding.funding_typeId = investment.funding_type._id;
		specificFunding.numberOfSponsors = investment.sponsors.length;
		specificFunding.sponsors = investors;
		return specificFunding;
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.fundingId = params[this._id];
		});

		if (this.fundingId !== null) {
			this.getFunding();
		}
	}

	private getFunding() {
		this.loading = true;
		this.fundingService.getFunding(this.fundingId).subscribe(
			data => {
				this.createFundingDisplay(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createFundingDisplay(investment: any) {
		if (investment !== null) {
			const investor = investment.sponsors;
			const investors = [];
			if (investor.length > 0) {
				for (let i = 0; i < investor.length; i++) {
					const sponsor = new Sponsors();
					if (investor[i].entity_sponsor === null && investor[i].person_sponsor !== null) {
						sponsor.id = investor[i].person_sponsor._id;
						sponsor.name = investor[i].person_sponsor.name;
						sponsor.entityIconImage = investor[i].person_sponsor.iconImage || appConstants.defaultImageIcon;
						sponsor.type = true;
					} else if (investor[i].entity_sponsor !== null && investor[i].person_sponsor === null) {
						sponsor.id = investor[i].entity_sponsor._id;
						sponsor.name = investor[i].entity_sponsor.name;
						sponsor.entityIconImage = investor[i].entity_sponsor.iconImage || appConstants.defaultImageIcon;
						sponsor.type = false;
					}
					sponsor.amount = AppCommons.shortenNumber(investor[i].amount, 2);
					sponsor.investmentDate = AppCommons.formatDisplayDate(new Date(investor[i].dateOfInvestment));
					sponsor.equity = investor[i].equity_given;
					if (investor[i].isLargest) {
						sponsor.isLargest = appConstants.yes;
					} else {
						sponsor.isLargest = appConstants.no;
					}

					investors.push(sponsor);
				}

			}

			this.funding = FundingDisplayComponent.fundingModel(investment, investors, this.fundingId);
		}
	}
}
