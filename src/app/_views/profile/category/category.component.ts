/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {Entity, Industry, Person, User} from '../../../_models';
import {ActivatedRoute} from '@angular/router';
import {AlertService, AuthenticationService, EntitiesService, IndustryService, PersonsService} from '../../../_services';
import {appConstants} from '../../../_helpers/app.constants';
import {AppCommons} from '../../../_helpers/app.commons';
import {ResponseModel} from '../../../_models/response.model';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	loading = false;
	public categories: any;
	public entityName: string;
	public industries: any = [];
	entityId: string;
	industryId: string;
	public model: any = {};
	private entity: any;
	private lbsUser: User;
	private type: boolean;
	private responseModel = new ResponseModel();

	constructor(
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
		private personService: PersonsService,
		private entityService: EntitiesService,
		private industryService: IndustryService,
		private commons: AppCommons) {
	}

	ngOnInit() {
		this.setEmptyModel();
		this.lbsUser = this.authenticationService.getCurrentUser();
		if (this.lbsUser != null) {
			this.entityId = this.lbsUser.uuid;
			this.type = Boolean(this.lbsUser.type);
		}

		if (this.entityId != null) {
			this.getEntityDetails();
		}

		this.getCategories();
	}

	/**
	 * @desc Verifies that all required fields are added, Creates the entity|person object with the new industries added
	 * then persists it
	 * @author dubdabasoduba
	 */
	addEditIndustry() {
		this.loading = false;
		if (AppCommons.isStringEmpty(this.model.industry)) {
			this.alertService.error(appConstants.industryError);
		} else if (AppCommons.isStringEmpty(this.model.main)) {
			this.alertService.error(appConstants.industryStatus);
		} else {
			if (this.type) {
				const person = AppCommons.createPersonObject(this.entity, this.entityId);
				person.industry = this.createSaveIndustry(this.entity.industry);
				person.user = this.authenticationService.getCurrentUser().uuid;
				this.updatePerson(person, false);
			} else {
				const entity = AppCommons.createEntityObject(this.entity, this.entityId);
				entity.categories = this.createSaveIndustry(this.entity.categories);
				entity.user = this.authenticationService.getCurrentUser().uuid;
				this.updateEntity(entity, false);
			}
		}
	}

	/**
	 * @desc Pre-populate the models with the selected category for editing
	 * @param category {@link Industry}
	 * @author dubdabasoduba
	 */
	editIndustry(category: Industry) {
		this.model.industry = category.categoryId;
		this.model.main = category.main === appConstants.yes ? '1' : '0';
	}

	/**
	 * @desc Get the entity object then removes the deleted category and persists the updated object to the database
	 * @param category
	 * @author dubdabasoduba
	 */
	removeIndustry(category: Industry) {
		this.loading = true;
		let entity;
		entity = this.type ? AppCommons.createPersonObject(this.entity, this.entityId) : AppCommons.createEntityObject(this.entity,
			this.entityId);
		entity.user = this.authenticationService.getCurrentUser().uuid;

		const categories = this.type ? entity.industry : entity.categories;
		for (let i = 0; i < categories.length; i++) {
			if (categories[i].category._id === category.categoryId) {
				categories.splice(i, 1);
			}
		}

		if (this.type) {
			entity.industry = categories;
			this.updatePerson(entity, true);
		} else {
			entity.categories = categories;
			this.updateEntity(entity, true);
		}
	}

	private setEmptyModel() {
		this.model.industry = appConstants.emptyEntry;
		this.model.main = appConstants.emptyEntry;
	}

	/**
	 * @desc Get all the categories in the system
	 * @author dubdabasoduba
	 */
	private getCategories() {
		this.loading = true;
		this.industryService.getIndustries(true).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.categories = this.responseModel.results;
				this.loading = false;
			}, error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Checks the entity type then decides which entity to get between entity|person
	 * @author dubdabasoduba
	 */
	private getEntityDetails() {
		this.industries = [];
		if (this.type) {
			this.getPerson(this.entityId);
		} else {
			this.getEntity(this.entityId);
		}
	}

	/**
	 * @desc Gets the logged in person details
	 * @param entityId {@link String}
	 * @author dubdabasoduba
	 */
	private getPerson(entityId: string) {
		this.loading = true;
		this.personService.getPersonById(entityId).subscribe(
			data => {
				this.entity = data;
				this.entityName = this.entity.name;
				this.createCategoriesDisplay(data);
				this.loading = false;
			}, error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Gets the logged in entity details
	 * @param entityId {@link String}
	 * @author dubdabasoduba
	 */
	private getEntity(entityId: string) {
		this.loading = true;
		this.entityService.getEntityById(entityId).subscribe(
			data => {
				this.entity = data;
				this.entityName = this.entity.name;
				this.createCategoriesDisplay(data);
				this.loading = false;
			}, error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Creates the display categories
	 * @param entity {@link Array}
	 * @author dubdabasoduba
	 */
	private createCategoriesDisplay(entity: any) {
		let entityIndustries = [];
		if (!this.commons.isObjectEmpty(entity.categories)) {
			entityIndustries = entity.categories;
		} else {
			entityIndustries = entity.industry;
		}
		if (entityIndustries.length > 0) {
			entityIndustries.forEach((category) => {
				const industry = new Industry();
				industry.id = category._id;
				industry.main = category.main ? appConstants.yes : appConstants.no;
				industry.category = category.category.name;
				industry.categoryId = category.category._id;
				this.industries.push(industry);
			});
		}
	}

	/**
	 * @desc Update the person object for the person in question
	 * @param person {@link Person}
	 * @param type {@link Boolean}
	 * @author dubdabasoduba
	 */
	private updatePerson(person: Person, type: boolean) {
		this.loading = true;
		this.personService.updatePerson(person).subscribe(
			data => {
				if (!type) {
					this.alertService.success(appConstants.industryAddSuccess);
				}
				this.getEntityDetails();
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
	 * @desc Update the entity object for the entity in question
	 * @param entity {@link Entity}
	 * @param type {@link Boolean}
	 * @author dubdabasoduba
	 */
	private updateEntity(entity: Entity, type: boolean) {
		this.loading = true;
		this.entityService.updateEntity(entity).subscribe(
			data => {
				if (!type) {
					this.alertService.success(appConstants.industryAddSuccess);
				}
				this.getEntityDetails();
				this.setEmptyModel();
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createSaveIndustry(industries: any[] | any) {
		if (industries.length <= 0) {
			this.createIndustryObject(industries);
		} else {
			if (!AppCommons.isStringEmpty(this.industryId)) {
				industries.forEach((industry) => {
					if (industry._id === this.industryId) {
						industry.category = this.model.industry;
						industry.main = this.model.main === '1';
					}
				});
			} else {
				this.createIndustryObject(industries);
			}
		}

		return industries;
	}

	/**
	 * @desc Create the Industry object to save;
	 * @param industries
	 */
	private createIndustryObject(industries: any) {
		const category = new Industry();
		category.category = this.model.industry;
		category.main = this.model.main === '1';
		industries.push(category);
	}
}
