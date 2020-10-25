/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AcquisitionsService, AlertService, EntitiesService, PersonsService} from '../../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {AppCommons} from '../../../../_helpers/app.commons';
import {appConstants} from '../../../../_helpers/app.constants';
import {Acquisitions} from '../../../../_models';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-buyers',
	templateUrl: './buyers.component.html',
	styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {
	acquisitionId: string;
	buyerId: string;
	loading = false;
	buyersList = [];
	entities = [];
	people = [];
	model: any = {};
	buyers = [];
	acquisitionName: string;
	private acquisition: any;
	private responseModel = new ResponseModel();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private acquisitionService: AcquisitionsService,
		private personService: PersonsService,
		private entitiesService: EntitiesService) {

	}

	ngOnInit() {
		this.loading = false;
		this.route.queryParams.subscribe(params => {
			this.buyerId = params.buyer;
			this.acquisitionId = params.acquisition;
		});

		if (this.acquisitionId != null && this.acquisitionId != undefined) {
			this.getAcquisition();
		} else {
			this.setEmptyModel();
		}
		if (this.buyerId == null || this.buyerId == undefined) {
			this.setEmptyModel();
		}
	}

	addEditBuyers() {
		this.loading = false;
		const acquisition = new Acquisitions();
		if (this.model.entity == appConstants.emptyEntry || this.model.entity == undefined) {
			this.alertService.error(appConstants.buyerRequiredError);
		} else if (this.model.announcement == appConstants.emptyEntry || this.model.announcement == undefined) {
			this.alertService.error(appConstants.acquisitionDateAnnouncementError);
		} else if (this.model.amount == appConstants.emptyEntry || this.model.amount == undefined) {
			this.alertService.error(appConstants.buyerAmountRequiredError);
		} else if (this.model.entity == this.acquisition.entity._id) {
			this.alertService.error(appConstants.sameEntityBuyerError);
		} else {
			acquisition.name = this.acquisition.name;
			acquisition.entity = this.acquisition.entity._id;
			acquisition.acquisition_date = this.acquisition.acquisition_date;
			acquisition.status = this.acquisition.status;
			acquisition.buyers = this.createBuyer(this.acquisition.buyers);
			acquisition.amount = this.calculateBuyoutAmount(acquisition.buyers).toString();
			acquisition._id = this.acquisitionId;
			acquisition.date_added = this.acquisition.date_added;
			this.updateAcquisition(acquisition);
		}
	}

	getBuyers() {
		if (this.model.buyerType == appConstants.person) {
			this.getPeople();
		} else {
			this.getEntities();
		}
	}

	private updateAcquisition(acquisitions: Acquisitions) {
		this.loading = true;
		this.acquisitionService.updateAcquisition(acquisitions).subscribe(
			data => {
				this.router.navigateByUrl(appConstants.addEditAcquisitionUrl + data._id, {skipLocationChange: true});
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
				this.buyersList = this.entities;
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
				this.buyersList = this.people;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getAcquisition() {
		this.loading = true;
		this.acquisitionService.getAcquisition(this.acquisitionId).subscribe(
			data => {
				this.createBuyerModel(data);
				this.acquisition = data;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createBuyerModel(acquisition: any) {
		this.acquisitionName = acquisition.name;
		for (let i = 0; i < acquisition.buyers.length; i++) {
			if (this.buyerId == acquisition.buyers[i]._id) {
				this.populateBuyerModel(acquisition.buyers[i]);
			}
		}
	}

	private populateBuyerModel(buyers: any) {
		if (buyers.person_sponsor == null) {
			this.model.buyerType = appConstants.entity;
			this.getEntities();
		} else {
			this.model.buyerType = appConstants.person;
			this.getPeople();
		}
		this.model.amount = buyers.amount;
		this.model.equity = buyers.equity_given;
		this.model.entity = buyers.person_sponsor == null ? buyers.entity_sponsor._id : buyers.person_sponsor._id;
		this.model.announcement = AppCommons.formatEditDateDisplay(new Date(buyers.dateOfInvestment));
	}

	private setEmptyModel() {
		this.model.buyerType = appConstants.emptyEntry;
		this.model.amount = appConstants.emptyEntry;
		this.model.equity = appConstants.emptyEntry;
		this.model.entity = appConstants.emptyEntry;
	}

	private createBuyer(buyers: any) {
		if (buyers.length <= 0) {
			this.createBuyerObject(buyers);
		} else {
			if (this.buyerId != null || this.buyerId != undefined) {
				for (let i = 0; i < buyers.length; i++) {
					if (this.buyerId == buyers[i]._id) {
						if (this.model.buyerType == appConstants.person) {
							buyers[i].person_sponsor = this.model.entity;
							buyers[i].entity_sponsor = null;
						} else {
							buyers[i].entity_sponsor = this.model.entity;
							buyers[i].person_sponsor = null;
						}
						buyers[i].amount = this.model.amount;
						buyers[i].dateOfInvestment = this.model.announcement;
					}
				}
			} else {
				this.createBuyerObject(buyers);
			}
		}

		return buyers;
	}

	private createBuyerObject(buyers: any[] | any) {
		const buyer = {person_sponsor: '', entity_sponsor: '', amount: '', dateOfInvestment: ''};
		if (this.model.buyerType == appConstants.person) {
			buyer.person_sponsor = this.model.entity;
			buyer.entity_sponsor = null;
		} else {
			buyer.entity_sponsor = this.model.entity;
			buyer.person_sponsor = null;
		}
		buyer.amount = this.model.amount;
		buyer.dateOfInvestment = this.model.announcement;
		buyers.push(buyer);
	}

	private calculateBuyoutAmount(buyers: any) {
		let totalAmount = 0;
		if (buyers.length <= 0) {
			totalAmount += this.model.amount;
		} else {
			for (let i = 0; i < buyers.length; i++) {
				if (this.buyerId == buyers[i]._id) {
					totalAmount += this.model.amount;
				} else {
					totalAmount += buyers[i].amount;
				}
			}
		}

		return totalAmount;
	}
}
