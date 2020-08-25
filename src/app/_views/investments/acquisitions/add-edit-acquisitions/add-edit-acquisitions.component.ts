/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AcquisitionsService, AlertService, AuthenticationService, EntitiesService} from '../../../../_services';
import {appConstants} from '../../../../_helpers/app.constants';
import {AppCommons} from '../../../../_helpers/app.commons';
import {Acquisitions, Sponsors, User} from '../../../../_models';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-add-edit-acquisitions',
	templateUrl: './add-edit-acquisitions.component.html',
	styleUrls: ['./add-edit-acquisitions.component.css']
})
export class AddEditAcquisitionsComponent implements OnInit {
	acquisitionId: string;
	loading: boolean;
	entities = [];
	acquisitionName: string;
	model: any = {};
	buyers = [];
	lbsUser: User;
	private entity: string;
	private funders = [];
	private acquisition: any;
	private responseModel = new ResponseModel();


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private acquisitionsService: AcquisitionsService,
		private entitiesService: EntitiesService,
		private authService: AuthenticationService) {
	}

	ngOnInit() {
		this.loading = false;
		this.getEntities();
		this.route.params.subscribe(params => {
			this.acquisitionId = params['id'];
		});

		this.route.queryParams.subscribe(params => {
			this.entity = params.entity;
		});

		if (this.acquisitionId != null && this.acquisitionId != undefined) {
			this.getAcquisitions();
		} else {
			this.setEmptyModel();
		}

		this.lbsUser = this.authService.getCurrentUser();
	}

	removeBuyer(buyer: Sponsors) {
		this.loading = true;
		for (let i = 0; i < this.funders.length; i++) {
			if (this.funders[i]._id == buyer.id) {
				if (this.funders.length == 1) {
					this.alertService.error(appConstants.oneBuyerFoundError);
					this.loading = false;
				} else {
					this.funders.splice(i, 1);
					const acquisition = new Acquisitions();
					acquisition._id = this.acquisitionId;
					acquisition.buyers = this.funders;
					acquisition.amount = AppCommons.createAmount(this.funders).toString();
					acquisition.date_updated = new Date();
					acquisition.updated_by = this.lbsUser.uuid;
					acquisition.acquisition_date = this.acquisition.acquisition_date;
					acquisition.date_added = this.acquisition.date_added;
					acquisition.name = this.acquisition.name;
					acquisition.entity = this.acquisition.entity._id;
					this.updateAcquisition(acquisition);
				}
			}
		}
	}

	addEditAcquisition() {
		this.loading = true;
		const acquisition = new Acquisitions();
		if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
			this.alertService.error(appConstants.acquisitionNameError);
		} else if (this.model.announcement == appConstants.emptyEntry || this.model.announcement == undefined) {
			this.alertService.error(appConstants.acquisitionDateAnnouncementError);
		} else if (this.model.status == appConstants.emptyEntry || this.model.status == undefined) {
			this.alertService.error(appConstants.statusError);
		} else {
			acquisition.name = this.model.name;
			acquisition.entity = this.entity;
			acquisition.acquisition_date = this.model.announcement;
			acquisition.status = this.model.status;
			if (this.acquisitionId != null && this.acquisitionId != undefined) {
				acquisition._id = this.acquisitionId;
				acquisition.date_added = this.model.dateAdded;
				this.updateAcquisition(acquisition);
			} else {
				acquisition.buyers = [];
				acquisition.amount = '0';
				this.addAcquisition(acquisition);
			}
		}
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

	private getAcquisitions() {
		this.loading = true;
		this.acquisitionsService.getAcquisition(this.acquisitionId).subscribe(
			data => {
				this.createModel(data);
				this.createBuyers(data);
				this.acquisition = data;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private setEmptyModel() {
		this.model.id = appConstants.emptyEntry;
		this.model.name = appConstants.emptyEntry;
		this.model.entity = appConstants.emptyEntry;
		this.model.announcement = appConstants.emptyEntry;
		this.model.status = appConstants.emptyEntry;
	}

	private addAcquisition(acquisitions: Acquisitions) {
		this.loading = true;
		this.acquisitionsService.addAcquisition(acquisitions).subscribe(
			data => {
				this.router.navigateByUrl(appConstants.addEditAcquisitionUrl + data._id, {skipLocationChange: true});
				this.loading = false;
			},
			error => {
				this.alertService.error(error.error);
				this.loading = false;
			}
		);
	}

	private updateAcquisition(acquisitions: Acquisitions) {
		this.loading = true;
		this.acquisitionsService.updateAcquisition(acquisitions).subscribe(
			data => {
				this.router.navigateByUrl(appConstants.addEditAcquisitionUrl + data._id, {skipLocationChange: true});
				this.loading = false;
			},
			error => {
				this.alertService.error(error.error);
				this.loading = false;
			}
		);
	}

	private createModel(acquisition: any) {
		this.acquisitionName = acquisition.name;
		this.model.id = acquisition._id;
		this.model.name = acquisition.name;
		this.model.entity = acquisition.entity._id;
		this.model.announcement = AppCommons.formatEditDateDisplay(new Date(acquisition.acquisition_date));
		this.model.status = acquisition.status == true ? 1 : 0;
		this.model.dateAdded = acquisition.date_added;
	}

	private createBuyers(acquisition: any) {
		if (acquisition != null) {
			this.acquisitionName = acquisition.name;
			this.funders = acquisition.buyers;
			for (let i = 0; i < acquisition.buyers.length; i++) {
				const sponsor = new Sponsors();
				if (acquisition.buyers[i].person_sponsor != null && acquisition.buyers[i].entity_sponsor == null) {
					sponsor.type = true;
					sponsor.name = acquisition.buyers[i].person_sponsor.name;
					sponsor.sponsorId = acquisition.buyers[i].person_sponsor._id;
					sponsor.entityIconImage =
						acquisition.buyers[i].person_sponsor.iconImage || appConstants.defaultImageIcon;
				} else if (acquisition.buyers[i].person_sponsor == null && acquisition.buyers[i].entity_sponsor != null) {
					sponsor.type = false;
					sponsor.name = acquisition.buyers[i].entity_sponsor.name;
					sponsor.sponsorId = acquisition.buyers[i].entity_sponsor._id;
					sponsor.entityIconImage =
						acquisition.buyers[i].entity_sponsor.iconImage || appConstants.defaultImageIcon;
				}
				sponsor.id = acquisition.buyers[i]._id;
				if (acquisition.buyers[i].isLargest == true) {
					sponsor.isLargest = appConstants.yes;
				} else {
					sponsor.isLargest = appConstants.no;
				}
				sponsor.equity = acquisition.buyers[i].equity_given;
				sponsor.amount = AppCommons.shortenNumber(acquisition.buyers[i].amount, 2);
				sponsor.investmentDate = AppCommons.formatDisplayDate(new Date(acquisition.buyers[i].dateOfInvestment));
				this.buyers.push(sponsor);
			}
		}
	}
}
