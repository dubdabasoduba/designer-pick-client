/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AcquisitionsService, AlertService} from '../../../../_services';
import {ActivatedRoute} from '@angular/router';
import {Acquisitions, Sponsors} from '../../../../_models';
import {AppCommons} from '../../../../_helpers/app.commons';
import {appConstants} from '../../../../_helpers/app.constants';

@Component({
	selector: 'app-display-acquisition',
	templateUrl: './single-acquisition.component.html',
	styleUrls: ['./single-acquisition.component.css']
})
export class AcquisitionDisplayComponent implements OnInit {
	loading = false;
	public acquisition: any;
	private acquisitionId: string;


	constructor(
		private acquisitionService: AcquisitionsService,
		private alertService: AlertService,
		private route: ActivatedRoute) {
	}

	private static acquisitionModel(investors: any, acquisition: any, id: string) {
		const specificAcquisition = new Acquisitions();
		specificAcquisition.buyers = investors;
		specificAcquisition.id = id;
		specificAcquisition.name = acquisition.name;
		specificAcquisition.amount = AppCommons.shortenNumber(acquisition.amount, 2);
		specificAcquisition.acquisition_date = AppCommons.formatDisplayDate(new Date(acquisition.acquisition_date));
		specificAcquisition.entity = acquisition.entity.name;
		specificAcquisition.entityId = acquisition.entity._id;
		specificAcquisition.entityIconImage = acquisition.entity.iconImage || appConstants.defaultImageIcon;
		specificAcquisition.numberOfBuyers = acquisition.buyers.length;

		return specificAcquisition;
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.acquisitionId = params['id'];
		});

		if (this.acquisitionId !== null) {
			this.getFunding();
		}
	}

	private getFunding() {
		this.loading = true;
		this.acquisitionService.getAcquisition(this.acquisitionId).subscribe(
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
			const investor = investment.buyers;
			const investors = [];
			if (investor.length > 0) {
				for (let i = 0; i < investor.length; i++) {
					const buyer = new Sponsors();
					if (investor[i].entity_sponsor === null && investor[i].person_sponsor !== null) {
						buyer.id = investor[i].person_sponsor._id;
						buyer.name = investor[i].person_sponsor.name;
						buyer.entityIconImage = investor[i].person_sponsor.iconImage || appConstants.defaultImageIcon;
						buyer.type = true;
					} else if (investor[i].entity_sponsor !== null && investor[i].person_sponsor === null) {
						buyer.id = investor[i].entity_sponsor._id;
						buyer.name = investor[i].entity_sponsor.name;
						buyer.entityIconImage = investor[i].entity_sponsor.iconImage || appConstants.defaultImageIcon;

						buyer.type = false;
					}

					buyer.amount = AppCommons.shortenNumber(investor[i].amount, 2);
					buyer.investmentDate = AppCommons.formatDisplayDate(new Date(investor[i].dateOfInvestment));
					buyer.equity = investor[i].equity_given;
					investors.push(buyer);
				}
			}
			this.acquisition = AcquisitionDisplayComponent.acquisitionModel(investors, investment, this.acquisitionId);
		}
	}

}
