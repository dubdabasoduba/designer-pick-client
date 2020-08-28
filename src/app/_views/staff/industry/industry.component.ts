/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, IndustryService} from '../../../_services';
import {ActivatedRoute} from '@angular/router';
import {AppCommons} from '../../../_helpers/app.commons';
import {Person} from '../../../_models';
import {appConstants} from '../../../_helpers/app.constants';
import {ResponseModel} from '../../../_models/response.model';

@Component({
	selector: 'app-industries',
	templateUrl: './industry.component.html',
	styleUrls: ['./industry.component.css']
})
export class IndustryComponent implements OnInit {
	loading = false;
	public industryEntities = [];
	public industryPeople = [];
	public numberOfPeople = 0;
	public numberOfEntities = 0;
	public industryName: string;
	private industryId: string;
	private responseModel = new ResponseModel();

	constructor(
		private industryService: IndustryService,
		private alertService: AlertService,
		private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.industryId = params['id'];
		});

		if (this.industryId != null) {
			this.getIndustryEntity();
			this.getIndustryPerson();
			this.getIndustry();
		}
	}

	/**
	 * Get the entities in a given industry
	 */
	private getIndustryEntity() {
		this.loading = true;
		this.industryService.getIndustryCompanies(this.industryId).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.industryEntities = AppCommons.createCompanies(this.responseModel.results);
				this.numberOfEntities = this.industryEntities.length;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * Get the people in a given industry
	 */
	private getIndustryPerson() {
		this.loading = true;
		this.industryService.getIndustryPeople(this.industryId).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.industryPeople = this.displayPeople(this.responseModel.results);
				this.numberOfPeople = this.industryPeople.length;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * Get the given industry
	 */
	private getIndustry() {
		this.loading = true;
		this.industryService.getIndustry(this.industryId).subscribe(
			data => {
				this.createIndustryDetails(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createIndustryDetails(industry) {
		this.industryName = industry.name;
	}

	private displayPeople(people: any) {
		const persons = [];
		people.forEach((person) => {
			if (!AppCommons.isStringEmpty(person.name)) {
				const entity = new Person();
				entity.name = person.name;
				entity.iconImage = person.iconImage || appConstants.defaultImageIcon;
				entity.dob = AppCommons.formatDisplayDate(new Date(person.dob)) || appConstants.notDisclosed;
				entity.id = person._id;
				persons.push(entity);
			}
		});
		return persons;
	}
}
