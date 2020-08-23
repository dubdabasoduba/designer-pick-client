/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, AuthenticationService, CountriesService, EntitiesService, IndustryService, PersonsService} from '../../../_services';
import {AppCommons} from '../../../_helpers/app.commons';
import {ActivatedRoute, Router} from '@angular/router';
import {appConstants} from '../../../_helpers/app.constants';
import {ResponseModel} from '../../../_models/response.model';

@Component({
	selector: 'app-update-user',
	templateUrl: './update-user.component.html',
	styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
	loading = false;
	public entityId: string;
	public entityType: string;
	public model: any = {};
	public countries: any;
	public industries: any;
	private entity: any;
	private oldEmail: string;
	private entityTrue = 'true';
	private returnUrl: string;
	private responseModel = new ResponseModel();

	constructor(
		private countriesService: CountriesService,
		private authenticationService: AuthenticationService,
		private industriesService: IndustryService,
		private entitiesService: EntitiesService,
		private personService: PersonsService,
		private commons: AppCommons,
		private alertService: AlertService,
		private router: Router,
		private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.loading = false;
		this.route.params.subscribe(params => {
			this.entityId = params[appConstants.id];
		});

		this.route.queryParams.subscribe(params => {
			this.entityType = params.type;
		});

		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

		this.getCountries();
		this.getIndustries();
		this.setEmptyModel();

		if (!AppCommons.isStringEmpty(this.entityId)) {
			if (this.entityType === this.entityTrue) {
				this.getPerson();
			} else {
				this.getEntity();
			}
		}
	}

	updateModelObject(entity: any) {
		this.entity = entity;
		this.model.id = entity._id;
		this.model.name = entity.name;
		this.model.region = this.commons.getDefaultCountry(entity.contacts);
		this.model.email = this.commons.getDefaultEmail(entity.contacts);
		this.oldEmail = this.commons.getDefaultEmail(entity.contacts);
		this.model.phonenumber = this.commons.getDefaultPhonenumber(entity.contacts);
		this.model.description = entity.description;
		this.model.avatar = appConstants.emptyEntry;
		if (this.entityType === this.entityTrue) {
			this.model.industry = this.commons.getDefaultIndustry(entity.industry);
			this.model.dob = AppCommons.formatEditDateDisplay(new Date(entity.dob));
			this.model.gender = entity.gender;
		} else {
			this.model.industry = this.commons.getDefaultIndustry(entity.categories);
			this.model.headquarters = entity.headquarter;
			this.model.isActive = entity.status;
			this.model.pitch_video = entity.pitch_video;
			this.model.entity_type = entity.type ? '1' : '0';
			this.model.dateFounded = AppCommons.formatEditDateDisplay(new Date(entity.founded));
		}
	}

	editEntity() {
		if (AppCommons.isStringEmpty(this.model.name)) {
			this.alertService.error('Entity name cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.industry)) {
			this.alertService.error('Industry of operation cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.region)) {
			this.alertService.error('Country of operation cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.email)) {
			this.alertService.error('Email Address cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.phonenumber)) {
			this.alertService.error('Phone number cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.headquarters)) {
			this.alertService.error('Headquarters cannot be empty');
		} else {
			this.updateEntity();
		}
	}

	editPerson() {
		if (AppCommons.isStringEmpty(this.model.name)) {
			this.alertService.error('Person name cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.industry)) {
			this.alertService.error('Industry of operation cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.region)) {
			this.alertService.error('Country of operation cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.email)) {
			this.alertService.error('Email Address cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.phonenumber)) {
			this.alertService.error('Phone number cannot be empty');
		} else if (!AppCommons.isStringEmpty(this.model.gender) &&
			(this.model.gender < 0 || this.model.gender > 3)) {
			this.alertService.error('Please select gender from the list provided');
		} else {
			this.updatePerson();
		}
	}

	private getCountries() {
		this.loading = true;
		this.countriesService.getCountries(false).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.countries = this.responseModel.results;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getIndustries() {
		this.loading = true;
		this.industriesService.getIndustries(false).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.industries = this.responseModel.results;
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
		this.model.industry = appConstants.emptyEntry;
		this.model.region = appConstants.emptyEntry;
		this.model.headquarters = appConstants.emptyEntry;
		this.model.email = appConstants.emptyEntry;
		this.model.phonenumber = appConstants.emptyEntry;
		this.model.isActive = appConstants.emptyEntry;
		this.model.description = appConstants.emptyEntry;
		this.model.pitch_video = appConstants.emptyEntry;
		this.model.avatar = appConstants.emptyEntry;
		this.model.entity_type = appConstants.emptyEntry;
		this.model.dateFounded = appConstants.emptyEntry;
		this.model.gender = appConstants.emptyEntry;
	}

	private getPerson() {
		this.loading = true;
		this.personService.getPersonById(this.entityId).subscribe(
			data => {
				this.updateModelObject(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getEntity() {
		this.loading = true;
		this.entitiesService.getEntityById(this.entityId).subscribe(
			data => {
				this.updateModelObject(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private updatePerson() {
		this.loading = true;
		this.personService.updatePerson(this.updateEntityObject()).subscribe(
			data => {
				this.authenticationService.setForceUpdateState(false);
				this.loading = false;
				this.router.navigateByUrl(this.returnUrl);
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private updateEntity() {
		this.loading = true;
		this.entitiesService.updateEntity(this.updateEntityObject()).subscribe(
			data => {
				this.authenticationService.setForceUpdateState(false);
				this.loading = false;
				this.router.navigateByUrl(this.returnUrl);
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private updateEntityObject() {
		if (!AppCommons.isStringEmpty(this.entityId)) {
			this.entity.name = this.model.name;
			this.entity.description = this.model.description;
			this.entity.contacts = this.commons.updateContactObject(this.model, this.entity.contacts);
			this.entity.old_email = this.oldEmail;
			this.entity.user = this.authenticationService.getCurrentUser().entityId;
			this.entity.forceUpdate = false;
			if (this.entityType === this.entityTrue) {
				this.entity.industry = this.entity.industry.length > 0 ? this.commons.updateIndustryObject(this.model,
					this.entity.industry) : [this.commons.createIndustryObject(this.model)];
				this.entity.dob = this.model.dob;
				this.entity.gender = this.model.gender;
			} else {
				this.entity.founded = this.model.dateFounded;
				this.entity.headquarter = this.model.headquarters;
				this.entity.pitch_video = this.model.pitch_video;
				this.entity.companyType = this.model.entity_type;
				this.entity.categories = this.entity.categories.length > 0 ? this.commons.updateIndustryObject(this.model,
					this.entity.categories) : [this.commons.createIndustryObject(this.model)];
				this.entity.status = this.model.isActive;
			}

			return this.entity;
		}
	}
}
