/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, EntitiesService, FundingService, PersonsService} from '../../../../_services';
import {AppCommons} from '../../../../_helpers/app.commons';
import {appConstants} from '../../../../_helpers/app.constants';
import {Funding} from '../../../../_models';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-sponsors',
	templateUrl: './sponsors.component.html',
	styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {
	fundingId: string;
	sponsorId: string;
	loading = false;
	sponsorsList = [];
	entities = [];
	people = [];
	model: any = {};
	sponsors = [];
	fundingName: string;
	private funding: any;
	private responseModel = new ResponseModel();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private fundingService: FundingService,
		private personService: PersonsService,
		private entitiesService: EntitiesService) {
	}

	ngOnInit() {
		this.loading = false;
		this.route.queryParams.subscribe(params => {
			this.sponsorId = params.sponsor;
			this.fundingId = params.funding;
		});

		if (this.fundingId != null && this.fundingId != undefined) {
			this.getFunding();
		} else {
			this.setEmptyModel();
		}
		if (this.sponsorId == null || this.sponsorId == undefined) {
			this.setEmptyModel();
		}
	}

	addEditSponsors() {
		this.loading = false;
		const funding = new Funding();
		if (this.model.entity == appConstants.emptyEntry || this.model.entity == undefined) {
			this.alertService.error(appConstants.sponsorRequiredError);
		} else if (this.model.announcement == appConstants.emptyEntry || this.model.announcement == undefined) {
			this.alertService.error(appConstants.fundingDateAnnouncementError);
		} else if (this.model.amount == appConstants.emptyEntry || this.model.amount == undefined) {
			this.alertService.error(appConstants.sponsorAmountRequiredError);
		} else if (this.model.entity == this.funding.entity._id) {
			this.alertService.error(appConstants.sameEntitySponsorError);
		} else {
			funding.name = this.funding.name;
			funding.entity = this.funding.entity._id;
			funding.funding_date = this.funding.funding_date;
			funding.funding_type = this.funding.funding_type._id;
			funding.status = this.funding.status;
			funding.sponsors = this.createSponsor(this.funding.sponsors);
			funding.amount = this.calculateFundingAmount(funding.sponsors).toString();
			funding._id = this.fundingId;
			funding.date_added = this.funding.date_added;
			this.updateFunding(funding);
		}
	}

	getSponsors() {
		const type = this.model.sponsorType;
		if (type === appConstants.entity) {
			this.getEntities();
		} else {
			this.getPeople();
		}
	}

	private updateFunding(funding: Funding) {
		this.loading = true;
		this.fundingService.updateFunding(funding).subscribe(
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

	private getEntities() {
		this.loading = true;
		this.entitiesService.getEntities(false).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.entities = AppCommons.createSponsorsList(this.responseModel.results);
				this.sponsorsList = this.entities;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getPeople() {
		this.loading = true;
		this.personService.getPeople().subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.people = AppCommons.createSponsorsList(this.responseModel.results);
				this.sponsorsList = this.people;
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
				this.createSponsorModel(data);
				this.funding = data;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createSponsorModel(funding: any) {
		this.fundingName = funding.name;
		for (let i = 0; i < funding.sponsors.length; i++) {
			if (this.sponsorId == funding.sponsors[i]._id) {
				this.populateSponsorModel(funding.sponsors[i]);
			}
		}
	}


	private populateSponsorModel(sponsor: any) {
		if (sponsor.person_sponsor == null) {
			this.model.sponsorType = appConstants.entity;
			this.getEntities();
		} else {
			this.model.sponsorType = appConstants.person;
			this.getPeople();
		}
		this.model.amount = sponsor.amount;
		this.model.equity = sponsor.equity_given;
		this.model.isLargest = sponsor.isLargest;
		this.model.entity = sponsor.person_sponsor == null ? sponsor.entity_sponsor._id : sponsor.person_sponsor._id;
		this.model.announcement = AppCommons.formatEditDateDisplay(new Date(sponsor.dateOfInvestment));
	}

	private setEmptyModel() {
		this.model.sponsorType = appConstants.emptyEntry;
		this.model.amount = appConstants.emptyEntry;
		this.model.equity = appConstants.emptyEntry;
		this.model.isLargest = appConstants.emptyEntry;
		this.model.entity = appConstants.emptyEntry;
	}

	private createSponsor(sponsors: any[] | any) {
		if (this.model.equity == appConstants.emptyEntry || this.model.equity == undefined) {
			this.model.equity = 0;
		}
		if (this.model.isLargest == appConstants.emptyEntry || this.model.isLargest == undefined) {
			this.model.isLargest = false;
		}
		if (sponsors.length <= 0) {
			this.createSponsorObject(sponsors);
		} else {
			if (this.sponsorId != null) {
				for (let i = 0; i < sponsors.length; i++) {
					if (this.sponsorId == sponsors[i]._id) {
						if (this.model.sponsorType == appConstants.person) {
							sponsors[i].person_sponsor = this.model.entity;
							sponsors[i].entity_sponsor = null;
						} else {
							sponsors[i].entity_sponsor = this.model.entity;
							sponsors[i].person_sponsor = null;
						}
						sponsors[i].amount = this.model.amount;
						sponsors[i].dateOfInvestment = this.model.announcement;
						sponsors[i].equity_given = this.model.equity;
						sponsors[i].isLargest = this.model.isLargest;
					}
				}
			} else {
				this.createSponsorObject(sponsors);
			}
		}

		return sponsors;
	}

	private createSponsorObject(sponsors: any[] | any) {
		const sponsor = {
			person_sponsor: '',
			entity_sponsor: '',
			amount: '',
			dateOfInvestment: '',
			equity_given: '',
			isLargest: ''
		};
		if (this.model.sponsorType == appConstants.person) {
			sponsor.person_sponsor = this.model.entity;
			sponsor.entity_sponsor = null;
		} else {
			sponsor.entity_sponsor = this.model.entity;
			sponsor.person_sponsor = null;
		}
		sponsor.amount = this.model.amount;
		sponsor.dateOfInvestment = this.model.announcement;
		sponsor.equity_given = this.model.equity;
		sponsor.isLargest = this.model.isLargest;
		sponsors.push(sponsor);
	}

	private calculateFundingAmount(sponsors: any | any[]) {
		let totalAmount = 0;
		if (sponsors.length <= 0) {
			totalAmount += this.model.amount;
		} else {
			for (let i = 0; i < sponsors.length; i++) {
				if (this.sponsorId == sponsors[i]._id) {
					totalAmount += this.model.amount;
				} else {
					totalAmount += sponsors[i].amount;
				}
			}
		}

		return totalAmount;
	}
}
