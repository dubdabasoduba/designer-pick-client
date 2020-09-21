/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {
	AlertService,
	AuthenticationService,
	CountriesService,
	EntitiesService,
	CategoryService,
	PersonsService
} from '../../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {appConstants} from '../../../../_helpers/app.constants';
import {Person} from '../../../../_models';
import {AppCommons} from '../../../../_helpers/app.commons';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-person-profile',
	templateUrl: './person-profile.component.html',
	styleUrls: ['./person-profile.component.css']
})
export class PersonProfileComponent implements OnInit {
	loading = false;
	public personId: string;
	public entityName: string;
	public model: any = {};
	public countries: any;
	public industries: any = [];
	private person: any;
	private oldEmail: string;
	private responseModel = new ResponseModel();

	constructor(
		private countriesService: CountriesService,
		private authenticationService: AuthenticationService,
		private industriesService: CategoryService,
		private entitiesService: EntitiesService,
		private personService: PersonsService,
		private commons: AppCommons,
		private alertService: AlertService,
		private router: Router,
		private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.personId = params[appConstants.id];
		});

		this.getCountries();
		this.getIndustries();
		this.setEmptyModel();

		if (!AppCommons.isStringEmpty(this.personId)) {
			if (this.personId !== this.authenticationService.getCurrentUser().uuid) {
				this.router.navigate(['/person-profile']);
			}
			this.getPerson();
		}
	}

	/**
	 * @desc checks for missing fields and saves the contests
	 * @author dubdabasoduba
	 */
	addEditPerson() {
		if (AppCommons.isStringEmpty(this.model.personName)) {
			this.alertService.error('Person name cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.industry)) {
			this.alertService.error('Category of operation cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.country)) {
			this.alertService.error('Country of operation cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.email)) {
			this.alertService.error('Email Address cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.phonenumber)) {
			this.alertService.error('Phone number cannot be empty');
		} else if (!AppCommons.isStringEmpty(this.model.gender) &&
			(this.model.gender < 0 || this.model.gender > 3)) {
			this.alertService.error('Please select gender from the list provided');
		} else {
			if (!AppCommons.isStringEmpty(this.personId)) {
				this.updatePerson();
			} else {
				this.addPerson();
			}
		}
	}

	/**
	 *  @desc Updates the current person object
	 *  @author dubdabasoduba
	 */
	updatePerson() {
		this.loading = true;
		this.personService.updatePerson(this.updatePersonObject()).subscribe(
			data => {
				this.alertService.success('Person updated successfully');
				this.loading = false;
				this.router.navigate(['/person-profile']);
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Creates the person from the person object
	 * @author dubdabasoduba
	 */
	addPerson() {
		this.loading = true;
		this.personService.addPerson(this.createPersonObject()).subscribe(
			data => {
				this.alertService.success('Person added successfully');
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
	 * @desc Creates the person object for person creation
	 * @author dubdabasoduba
	 */
	createPersonObject() {
		const person = new Person();
		person.name = this.model.personName;
		person.description = this.model.description;
		person.dob = this.model.dob;
		person.gender = this.model.gender;
		person.contacts = [this.commons.createContactObject(this.model)];
		person.industry = [this.commons.createIndustryObject(this.model)];
		return person;
	}

	/**
	 *  @desc Updates the fetched person with the new values
	 *  @author dubdabasoduba
	 */
	updatePersonObject() {
		if (!AppCommons.isStringEmpty(this.personId)) {
			this.person.name = this.model.personName;
			this.person.description = this.model.description;
			this.person.dob = this.model.dob;
			this.person.gender = this.model.gender;
			this.person.old_email = this.oldEmail;
			this.person.user = this.authenticationService.getCurrentUser().uuid;
			this.person.contacts = this.commons.updateContactObject(this.model, this.person.contacts);
			this.person.industry = this.person.industry.length > 0 ? this.commons.updateIndustryObject(this.model,
				this.person.industry) : [this.commons.createIndustryObject(this.model)];
			return this.person;
		}
	}

	/**
	 * @desc Updates the model object for updates
	 * @param person
	 * @author dubdabasoduba
	 */
	updateModelObject(person: any) {
		this.person = person;
		this.entityName = person.name;
		this.model.id = person._id;
		this.model.personName = person.name;
		this.model.industry = this.commons.getDefaultIndustry(person.industry);
		this.model.country = this.commons.getDefaultCountry(person.contacts);
		this.model.email = this.commons.getDefaultEmail(person.contacts);
		this.oldEmail = this.commons.getDefaultEmail(person.contacts);
		this.model.phonenumber = this.commons.getDefaultPhonenumber(person.contacts);
		this.model.description = person.description;
		this.model.avatar = appConstants.emptyEntry;
		this.model.gender = person.gender;
		this.model.dob = AppCommons.formatEditDateDisplay(new Date(person.dob));
	}

	/**
	 * @desc Gets the person object if an update is required
	 * @author dubdabasoduba
	 */
	private getPerson() {
		this.loading = true;
		this.personService.getPersonById(this.personId).subscribe(
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
		this.countriesService.getCountries().subscribe(
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
	 * @desc Creates an empty person model
	 * @author dubdabasoduba
	 */
	private setEmptyModel() {
		this.model.id = appConstants.emptyEntry;
		this.model.personName = appConstants.emptyEntry;
		this.model.industry = appConstants.emptyEntry;
		this.model.country = appConstants.emptyEntry;
		this.model.gender = appConstants.emptyEntry;
		this.model.email = appConstants.emptyEntry;
		this.model.phonenumber = appConstants.emptyEntry;
		this.model.description = appConstants.emptyEntry;
		this.model.avatar = appConstants.emptyEntry;
		this.model.dob = appConstants.emptyEntry;
	}
}
