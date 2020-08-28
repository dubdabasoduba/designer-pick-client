/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertService, AuthenticationService, EntitiesService, PersonsService} from '../../../../_services';
import {appConstants} from '../../../../_helpers/app.constants';
import {Entity} from '../../../../_models';
import {AppCommons} from '../../../../_helpers/app.commons';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-subsidiaries',
	templateUrl: './subsidiaries.component.html',
	styleUrls: ['./subsidiaries.component.css']
})
export class SubsidiariesComponent implements OnInit {
	loading = false;
	public entities: any;
	public entityName: string;
	organisations: any = [];
	entityId: string;
	subsidiaryId: string;
	model: any = {};
	private entity: any;
	private responseModel = new ResponseModel();

	constructor(
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
		private personService: PersonsService,
		private entityService: EntitiesService) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.entityId = params[appConstants.id];
		});

		this.route.queryParams.subscribe(params => {
			this.subsidiaryId = params.job;
		});

		if (this.entityId != null) {
			this.getEntity(true);
		}

		if (this.subsidiaryId != null && this.entityId != null) {
			this.getEntity(false);
		}
		this.getEntities();
		this.setEmptyModel();
	}

	addEditSubsidiary() {
		this.loading = false;
		if (this.model.entity == appConstants.emptyEntry || this.model.entity == undefined) {
			this.alertService.error(appConstants.entityError);
		} else if (this.model.entity == this.entityId) {
			this.alertService.error(appConstants.subsidiaryError);
		} else {
			const entity = AppCommons.createEntityObject(this.entity, this.entityId);
			entity.user = this.authenticationService.getCurrentUser().uuid;
			entity.subsidiaries = this.createChildCompany(this.entity.subsidiaries);
			this.updateEntity(entity, false);
		}
	}

	removeSubsidiary(organisations: Entity) {
		this.loading = true;
		const entity = AppCommons.createEntityObject(this.entity, this.entityId);
		entity.user = this.authenticationService.getCurrentUser().uuid;
		for (let i = 0; i < entity.subsidiaries.length; i++) {
			if (entity.subsidiaries[i].entity._id == organisations.id) {
				entity.subsidiaries.splice(i, 1);
			}
		}
		this.updateEntity(entity, true);
	}

	editSubsidiary(organisation: Entity) {
		this.subsidiaryId = organisation.subsidiaryId;
		this.model.id = organisation._id;
		this.model.entity = organisation.id;
	}

	private getEntity(trigger: boolean) {
		this.loading = true;
		this.entityService.getEntityById(this.entityId).subscribe(
			data => {
				this.updateSubsidiaryModels(trigger, data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private updateSubsidiaryModels(trigger: boolean, data: any) {
		if (trigger) {
			this.createSubsidiaryModel(data);
			this.entity = data;
			this.entityName = this.entity.name;
		} else {
			this.populateSubsidiaryModel(data);
		}
	}

	/**
	 * @decs Create the subsidiary designers-dashboard model
	 * @param data {@link Array}
	 * @author dubdabasoduba
	 */
	private createSubsidiaryModel(data: any) {
		if (data !== null) {
			const subsidiaries = data.subsidiaries;
			for (let i = 0; i < subsidiaries.length; i++) {
				const entity = new Entity();
				entity.subsidiaryId = subsidiaries[i]._id;
				entity.id = subsidiaries[i].entity._id;
				entity.name = subsidiaries[i].entity.name;
				entity.iconImage =
					AppCommons.isStringEmpty(
						subsidiaries[i].entity.iconImage) ? appConstants.defaultImageIcon : entity.iconImage;
				entity.founded = !AppCommons.isStringEmpty(subsidiaries[i].entity.founded) ? AppCommons.formatDisplayDate(
					new Date(Date.parse(subsidiaries[i].entity.founded))) : appConstants.notDisclosed;
				this.organisations.push(entity);
			}
		}
	}

	/**
	 * @desc Creates the empty model
	 * @author dubdabasoduba
	 */
	private setEmptyModel() {
		this.model.id = appConstants.emptyEntry;
		this.model.entity = appConstants.emptyEntry;
	}

	private populateSubsidiaryModel(organisation: any) {
		const entity = AppCommons.createEntityObject(organisation, this.entityId);
		for (let i = 0; i < entity.subsidiaries.length; i++) {
			if (entity.subsidiaries[i]._id == this.subsidiaryId) {
				this.model.id = entity.subsidiaries[i]._id;
				this.model.entity = entity.subsidiaries[i].organistaion._id;
			}
		}
	}

	private getEntities() {
		this.loading = true;
		this.entityService.getEntities(false).subscribe(
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

	private updateEntity(entity: Entity, type: boolean) {
		this.loading = true;
		this.entityService.updateEntity(entity).subscribe(
			data => {
				if (!type) {
					this.alertService.success('The company subsidiary was added');
				}
				this.organisations = [];
				this.getEntity(true);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createChildCompany(organisations: any[] | any) {
		if (organisations.length <= 0) {
			this.createChildObject(organisations);
		} else {
			if (!AppCommons.isStringEmpty(this.subsidiaryId)) {
				for (let i = 0; i < organisations.length; i++) {
					if (this.subsidiaryId == organisations[i]._id) {
						organisations[i].entity = this.model.entity;
					}
				}
			} else {
				this.createChildObject(organisations);
			}
		}

		return organisations;
	}

	private createChildObject(organisations: any) {
		const organisation = {entity: ''};
		organisation.entity = this.model.entity;
		organisations.push(organisation);
		return organisations;
	}
}
