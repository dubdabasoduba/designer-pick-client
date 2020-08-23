/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {Founders} from '../../../../_models';
import {ActivatedRoute} from '@angular/router';
import {AlertService, EntitiesService, FoundersService, PersonsService} from '../../../../_services';
import {appConstants} from '../../../../_helpers/app.constants';
import {AppCommons} from '../../../../_helpers/app.commons';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-founders',
	templateUrl: './founders.component.html',
	styleUrls: ['./founders.component.css']
})
export class FoundersComponent implements OnInit {
	loading = false;
	entities: any = [];
	public entityName: string;
	public founders: any = [];
	entityId: string;
	founderId: string = null;
	model: any = {};
	private entity: any = [];
	private responseModel = new ResponseModel();

	constructor(
		private route: ActivatedRoute,
		private alertService: AlertService,
		private commons: AppCommons,
		private foundersService: FoundersService,
		private personService: PersonsService,
		private entityService: EntitiesService) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.entityId = params[appConstants.id];
		});
		this.founders = [];
		this.refreshFounders(false);
		if (this.founderId != null && this.entityId != null) {
			this.getEntity();
		}
		this.getEntities();
		this.getPeople();
		this.setEmptyModel();
	}

	/**
	 * @desc Creates the edit founders object
	 * @param founder {@link Founders}
	 * @author dubdabasoduba
	 */
	editFounder(founder: Founders) {
		this.founderId = founder._id;
		this.model.entity =
			founder.type ? founder.entityId + '_' + appConstants.person : founder.entityId + '_' + appConstants.entity;
		this.model.status = founder.status ? '1' : '0';
		this.model.date_added = founder.date_added;
	}

	/**
	 * @desc Removes the founder
	 * @param founder {@link Founders}
	 * @author dubdabasoduba
	 */
	removeFounder(founder: Founders) {
		this.loading = true;
		this.foundersService.deleteFounders(founder).subscribe(
			data => {
				this.alertService.success('Founders has been removed');
				// this.refreshFounders(true);
				this.ngOnInit();
				this.loading = false;
			}, error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Performs the empty checks & initial data formatting to enable data save or update
	 * @author dubdabasoduba
	 */
	addEditFounder() {
		this.loading = false;
		if (this.model.entity == appConstants.emptyEntry || this.model.entity == undefined) {
			this.alertService.error(appConstants.entityError);
		} else if (this.model.entity == this.entityId) {
			this.alertService.error(appConstants.founderError);
		} else {
			const entity = this.model.entity.split('_');
			if (entity.length > 1) {
				const founderUuid = entity[0];
				const type = entity[1];

				const founder = new Founders();
				if (type === appConstants.person) {
					founder.founders.person = founderUuid;
					founder.founders.entity = null;
				} else {
					founder.founders.entity = founderUuid;
					founder.founders.person = null;
				}
				founder.entity = this.entityId;
				founder.status = this.model.status;

				if (AppCommons.isStringEmpty(this.founderId)) {
					this.addFounder(founder, false);
				} else {
					founder._id = this.founderId;
					founder.date_added = this.model.date_added;
					this.updateFounder(founder, false);
				}
			}
		}
	}

	/**
	 * @desc Executes a call to get the entity and its founders
	 * @param type {@link Boolean}
	 * @author dubdabasoduba
	 */
	private refreshFounders(type: boolean) {
		if (this.entityId != null) {
			if (type) {
				this.founders = null;
			}
			this.getEntity();
			this.getFounders(false);
		}
	}

	/**
	 * @desc Get the portal entities
	 * @author dubdabasoduba
	 */
	private getEntities() {
		this.loading = true;
		this.entityService.getEntities(false).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.concatEntities(this.responseModel.results, appConstants.entity);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Get the portal in the portal
	 * @author dubdabasoduba
	 */
	private getPeople() {
		this.loading = true;
		this.personService.getPeople(false).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.concatEntities(this.responseModel.results, appConstants.person);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Creates the empty founders model
	 * @author dubdabasoduba
	 */
	private setEmptyModel() {
		this.model.entity = appConstants.emptyEntry;
		this.model.status = appConstants.emptyEntry;
	}

	/**
	 * @desc Gets the entity in questions
	 * @author dudbabasoduba
	 */
	private getEntity() {
		this.loading = true;
		this.entityService.getEntityById(this.entityId).subscribe(
			data => {
				this.createEntityObject(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Gets the founders base on the entity
	 * @param trigger {@link Boolean}
	 * @author dubdabasoduba
	 */
	private getFounders(trigger: boolean) {
		this.loading = true;
		this.foundersService.getEntityFounders(this.entityId).subscribe(
			data => {
				this.createFoundersDisplay(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Updates the founder
	 * @param founder {@link Founders}
	 * @param type {@link Boolean}
	 * @author dubdabasoduba
	 */
	private updateFounder(founder: Founders, type: boolean) {
		this.loading = true;
		this.foundersService.updateFounders(founder).subscribe(data => {
			if (!type) {
				this.alertService.success('Founder updated');
			}
			// this.refreshFounders(true);
			this.ngOnInit();
			this.loading = false;
		}, error => {
			this.alertService.error(error);
			this.loading = false;
		});
	}

	/**
	 * @desc Posts the selected founder
	 * @param founder {@link Founders}
	 * @param type {@link Boolean}
	 * @author dubdabasoduba
	 */
	private addFounder(founder: Founders, type: boolean) {
		this.loading = true;
		this.foundersService.addFounders(founder).subscribe(
			data => {
				if (!type) {
					this.alertService.success('New entity founder added');
				}
				// this.refreshFounders(true);
				this.ngOnInit();
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Creates the founders object
	 * @param founders {@link Array}
	 * @author dubdabasoduba
	 */
	private createFoundersDisplay(founders: any) {
		if (founders.length > 0) {
			founders.forEach((founder) => {
				const entityFounder = founder.entityFounders;
				if (this.commons.isObjectEmpty(entityFounder.person)) {
					this.founders.push(this.commons.createFounder(founder, entityFounder.entity, false));
				} else {
					this.founders.push(this.commons.createFounder(founder, entityFounder.person, true));
				}
			});
		}
	}

	/**
	 * @desc Creates the entity object for name display and the entity
	 * @param entity {@link Array}
	 * @author dubdabasoduba
	 */
	private createEntityObject(entity: any) {
		this.entityName = entity.name;
		this.entity = entity;
	}

	/**
	 * @desc Concatenates the entity arrays in preparation to the display for the founders selection dropdown
	 * @param entities {@link Array}
	 * @param type {@link String}
	 * @author dubdabasoduba
	 */
	private concatEntities(entities: any, type: string) {
		entities.forEach((entity) => {
			const users: any = {};
			users.type = type === appConstants.person ? appConstants.person : appConstants.entity;
			users._id = entity._id;
			users.name = entity.name;

			if (this.entityId !== entity._id) {
				this.entities.push(users);
			}
		});
	}
}
