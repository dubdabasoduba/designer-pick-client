/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
	AlertService,
	AuthenticationService,
	EntitiesService,
	FundingService,
	FundingTypesService
} from '../../../../_services';
import {Funding, Sponsors, User} from '../../../../_models';
import {AppCommons} from '../../../../_helpers/app.commons';
import {appConstants} from '../../../../_helpers/app.constants';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-add-edit-funding',
	templateUrl: './add-edit-funding.component.html',
	styleUrls: ['./add-edit-funding.component.css']
})
export class AddEditFundingComponent implements OnInit {
	fundingId: string;
	loading = false;
	series: [];
	entities = [];
	fundingName: string;
	model: any = {};
	sponsors = [];
	lbsUser: User;
	private entity: string;
	private funders = [];
	private funding: any;
	private _id = 'id';
	private responseModel = new ResponseModel();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private fundingService: FundingService,
		private fundingTypesService: FundingTypesService,
		private entitiesService: EntitiesService,
		private authService: AuthenticationService) {
	}

	ngOnInit() {
		this.loading = false;
		this.fundingTypes();
		this.getEntities();
		this.route.params.subscribe(params => {
			this.fundingId = params[this._id];
		});

		this.route.queryParams.subscribe(params => {
			this.entity = params.entity;
		});

		if (this.fundingId != null && this.fundingId != undefined) {
			this.getFunding();
		} else {
			this.setEmptyModel();
		}
		this.lbsUser = this.authService.getCurrentUser();
	}

	addEditFunding() {
		this.loading = true;
		const funding = new Funding();
		if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
			this.alertService.error(appConstants.fundingNameError);
		} else if (this.model.series == appConstants.emptyEntry || this.model.series == undefined) {
			this.alertService.error(appConstants.fundingSeriesError);
		} else if (this.model.announcement == appConstants.emptyEntry || this.model.announcement == undefined) {
			this.alertService.error(appConstants.fundingDateAnnouncementError);
		} else if (this.model.status == appConstants.emptyEntry || this.model.status == undefined) {
			this.alertService.error(appConstants.statusError);
		} else {
			funding.name = this.model.name;
			funding.entity = this.entity;
			funding.funding_type = this.model.series;
			funding.funding_date = this.model.announcement;
			funding.status = this.model.status;
			if (this.fundingId != null && this.fundingId != undefined) {
				funding._id = this.fundingId;
				funding.date_added = this.model.dateAdded;
				this.updateFunding(funding);
			} else {
				funding.sponsors = [];
				funding.amount = '0';
				this.addFunding(funding);
			}
		}
	}

	removeSponsor(sponsor: Sponsors) {
		this.loading = true;
		for (let i = 0; i < this.funders.length; i++) {
			if (this.funders[i]._id == sponsor.id) {
				if (this.funders.length == 1) {
					this.alertService.error(appConstants.oneSponsorFoundError);
					this.loading = false;
				} else {
					this.funders.splice(i, 1);
					const funding = new Funding();
					funding._id = this.fundingId;
					funding.sponsors = this.funders;
					funding.amount = AppCommons.createAmount(this.funders).toString();
					funding.date_updated = new Date();
					funding.updated_by = this.lbsUser.entityId;
					funding.funding_date = this.funding.funding_date;
					funding.date_added = this.funding.date_added;
					funding.name = this.funding.name;
					funding.entity = this.funding.entity._id;
					funding.funding_type = this.funding.funding_type._id;
					funding.status = this.funding.status;
					this.updateFunding(funding);
				}
			}
		}
	}

	private addFunding(funding: Funding) {
		this.loading = true;
		this.fundingService.addFunding(funding).subscribe(
			data => {
				this.router.navigateByUrl(appConstants.addEditFundingUrl + data._id, {skipLocationChange: true});
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private updateFunding(funding: Funding) {
		this.loading = true;
		this.fundingService.updateFunding(funding).subscribe(
			data => {
				this.router.navigateByUrl(appConstants.addEditFundingUrl + data._id, {skipLocationChange: true});
				this.getFunding();
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getFunding() {
		this.loading = true;
		this.fundingService.getFunding(this.fundingId).subscribe(
			data => {
				this.createModel(data);
				this.createSponsors(data);
				this.funding = data;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private fundingTypes() {
		this.loading = true;
		this.fundingTypesService.getFundingTypes(false).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.series = this.responseModel.results;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getEntities() {
		this.loading = true;
		this.entitiesService.getEntities(false).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.entities = AppCommons.createEntities(this.responseModel.results);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createModel(funding: any) {
		this.fundingName = funding.name;
		this.model.id = funding._id;
		this.model.name = funding.name;
		this.model.series = funding.funding_type._id;
		this.model.entity = funding.entity._id;
		this.model.announcement = AppCommons.formatEditDateDisplay(new Date(funding.funding_date));
		this.model.status = funding.status == true ? 1 : 0;
		this.model.dateAdded = funding.date_added;
	}

	private setEmptyModel() {
		this.model.id = appConstants.emptyEntry;
		this.model.name = appConstants.emptyEntry;
		this.model.series = appConstants.emptyEntry;
		this.model.entity = appConstants.emptyEntry;
		this.model.announcement = appConstants.emptyEntry;
		this.model.status = appConstants.emptyEntry;
	}

	private createSponsors(funding: any) {
		if (funding != null) {
			this.fundingName = funding.name;
			this.funders = funding.sponsors;
			for (let i = 0; i < funding.sponsors.length; i++) {
				const sponsor = new Sponsors();
				if (funding.sponsors[i].person_sponsor != null && funding.sponsors[i].entity_sponsor == null) {
					sponsor.type = true;
					sponsor.name = funding.sponsors[i].person_sponsor.name;
					sponsor.sponsorId = funding.sponsors[i].person_sponsor._id;
					sponsor.entityIconImage = funding.sponsors[i].person_sponsor.iconImage || appConstants.defaultImageIcon;
				} else if (funding.sponsors[i].person_sponsor == null && funding.sponsors[i].entity_sponsor != null) {
					sponsor.type = false;
					sponsor.name = funding.sponsors[i].entity_sponsor.name;
					sponsor.sponsorId = funding.sponsors[i].entity_sponsor._id;
					sponsor.entityIconImage = funding.sponsors[i].entity_sponsor.iconImage || appConstants.defaultImageIcon;
				}
				sponsor.id = funding.sponsors[i]._id;
				if (funding.sponsors[i].isLargest) {
					sponsor.isLargest = appConstants.yes;
				} else {
					sponsor.isLargest = appConstants.no;
				}
				sponsor.equity = funding.sponsors[i].equity_given;
				sponsor.amount = AppCommons.shortenNumber(funding.sponsors[i].amount, 2);
				sponsor.investmentDate = AppCommons.formatDisplayDate(new Date(funding.sponsors[i].dateOfInvestment));
				this.sponsors.push(sponsor);
			}
		}
	}
}
