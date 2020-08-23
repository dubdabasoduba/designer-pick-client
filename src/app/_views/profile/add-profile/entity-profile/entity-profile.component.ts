/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, AuthenticationService, CountriesService, EntitiesService, IndustryService, PersonsService} from '../../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {appConstants} from '../../../../_helpers/app.constants';
import {Entity} from '../../../../_models';
import {AppCommons} from '../../../../_helpers/app.commons';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-entity-profile',
	templateUrl: './entity-profile.component.html',
	styleUrls: ['./entity-profile.component.css']
})
export class EntityProfileComponent implements OnInit {
	loading = false;
	public entityId: string;
	public entityName: string;
	public model: any = {};
	public countries: any;
	public industries: any;
	private entity: any;
	private oldEmail: string;
	private responseModel = new ResponseModel();

	constructor(
		private countriesService: CountriesService,
		private authenticationService: AuthenticationService,
		private industriesService: IndustryService,
		private entitiesService: EntitiesService,
		private personService: PersonsService,
		private alertService: AlertService,
		private commons: AppCommons,
		private router: Router,
		private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.entityId = params[appConstants.id];
		});
		this.getCountries();
		this.getIndustries();
		this.setEmptyModel();
		if (!AppCommons.isStringEmpty(this.entityId)) {
			if (this.entityId !== this.authenticationService.getCurrentUser().entityId) {
				this.router.navigate(['/entity-profile']);
			}
			this.getEntity();
		}
	}

	/**
	 * @desc checks for missing fields and saves the entity
	 * @author dubdabasoduba
	 */
	addEditCompany() {
		if (AppCommons.isStringEmpty(this.model.name)) {
			this.alertService.error('Entity name cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.industry)) {
			this.alertService.error('Industry of operation cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.country)) {
			this.alertService.error('Country of operation cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.email)) {
			this.alertService.error('Email Address cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.phonenumber)) {
			this.alertService.error('Phone number cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.headquarters)) {
			this.alertService.error('Headquarters cannot be empty');
		} else {
			if (!AppCommons.isStringEmpty(this.entityId)) {
				this.updateEntity();
			} else {
				this.addEntity();
			}
		}
	}

	/**
	 * @desc Gets the entity if an update is required
	 * @author dubdabasoduba
	 */
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

	/**
	 * @desc Get the countries in the systems
	 * @author dubdabasoduba
	 */
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

	/**
	 * @desc Gets the industries in the systems
	 * @author dubdabasoduba
	 */
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

	/**
	 * @desc creates and empty entity model
	 * @author dubdabasoduba
	 */
	private setEmptyModel() {
		this.model.id = appConstants.emptyEntry;
		this.model.name = appConstants.emptyEntry;
		this.model.industry = appConstants.emptyEntry;
		this.model.country = appConstants.emptyEntry;
		this.model.headquarters = appConstants.emptyEntry;
		this.model.email = appConstants.emptyEntry;
		this.model.phonenumber = appConstants.emptyEntry;
		this.model.isActive = appConstants.emptyEntry;
		this.model.description = appConstants.emptyEntry;
		this.model.pitch_video = appConstants.emptyEntry;
		this.model.avatar = appConstants.emptyEntry;
		this.model.entity_type = appConstants.emptyEntry;
		this.model.dateFounded = appConstants.emptyEntry;
	}

	/**
	 *  @desc Updates the current entity object
	 *  @author dubdabasoduba
	 */
	private updateEntity() {
		this.loading = true;
		this.entitiesService.updateEntity(this.updateEntityObject()).subscribe(
			data => {
				this.alertService.success('Entity was updated successfully');
				this.loading = false;
				this.router.navigate(['/entity-profile']);
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Creates the entity from the entity object
	 * @author dubdabasoduba
	 */
	private addEntity() {
		this.loading = true;
		this.entitiesService.addEntity(this.createEntityObject()).subscribe(
			data => {
				this.alertService.success('Entity was added successfully');
				this.setEmptyModel();
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Creates an entity object for the save purposes
	 * @author dubdabasoduba
	 */
	private createEntityObject() {
		const entity = new Entity();
		entity.name = this.model.name;
		entity.description = this.model.description;
		entity.founded = this.model.dateFounded;
		entity.headquarter = this.model.headquarters;
		entity.pitch_video = this.model.pitch_video;
		entity.type = this.model.entity_type;
		entity.contacts = [this.commons.createContactObject(this.model)];
		entity.categories = [this.commons.createIndustryObject(this.model)];
		entity.status = this.model.isActive;
		return entity;
	}

	/**
	 * @desc Updates the fetched entity with the new values
	 * @author dubdabasoduba
	 */
	private updateEntityObject() {
		if (!AppCommons.isStringEmpty(this.entityId)) {
			this.entity.name = this.model.name;
			this.entity.description = this.model.description;
			this.entity.founded = this.model.dateFounded;
			this.entity.headquarter = this.model.headquarters;
			this.entity.pitch_video = this.model.pitch_video;
			this.entity.companyType = this.model.entity_type;
			this.entity.contacts = this.commons.updateContactObject(this.model, this.entity.contacts);
			this.entity.categories = this.entity.categories.length > 0 ? this.commons.updateIndustryObject(this.model,
				this.entity.categories) : [this.commons.createIndustryObject(this.model)];
			this.entity.status = this.model.isActive;
			this.entity.old_email = this.oldEmail;
			this.entity.user = this.authenticationService.getCurrentUser().entityId;
			return this.entity;
		}
	}

	/**
	 * @desc Populate the model object to prepare for the entity update
	 * @param entity
	 * @author dubdabasoduba
	 */
	private updateModelObject(entity: any) {
		this.entity = entity;
		this.entityName = entity.name;
		this.model.id = entity._id;
		this.model.name = entity.name;
		this.model.industry = this.commons.getDefaultIndustry(entity.categories);
		this.model.country = this.commons.getDefaultCountry(entity.contacts);
		this.model.headquarters = entity.headquarter;
		this.model.email = this.commons.getDefaultEmail(entity.contacts);
		this.oldEmail = this.commons.getDefaultEmail(entity.contacts);
		this.model.phonenumber = this.commons.getDefaultPhonenumber(entity.contacts);
		this.model.isActive = entity.status;
		this.model.description = entity.description;
		this.model.pitch_video = entity.pitch_video;
		this.model.avatar = appConstants.emptyEntry;
		this.model.entity_type = entity.type ? '1' : '0';
		this.model.dateFounded = AppCommons.formatEditDateDisplay(new Date(entity.founded));
	}
}
