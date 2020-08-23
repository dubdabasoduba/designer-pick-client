/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertService, AuthenticationService, EntitiesService, PersonsService, SchoolsService} from '../../../../_services';
import {appConstants} from '../../../../_helpers/app.constants';
import {Education, Person} from '../../../../_models';
import {AppCommons} from '../../../../_helpers/app.commons';

@Component({
	selector: 'app-education',
	templateUrl: './education.component.html',
	styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
	loading = false;
	entities: any;
	public personName: string;
	studies: any = [];
	personId: string;
	educationId: string;
	model: any = {};
	private person: any;
	private newEducationId: string;

	constructor(
		private route: ActivatedRoute,
		private alertService: AlertService,
		private authenticationService: AuthenticationService,
		private personService: PersonsService,
		private entityService: EntitiesService,
		private schoolService: SchoolsService) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.personId = params[appConstants.id];
		});

		this.route.queryParams.subscribe(params => {
			this.newEducationId = params.job;
		});

		if (this.personId !== null) {
			this.getPerson();
		}

		if (this.newEducationId !== null && this.personId !== null) {
			this.getEducationHistory();
		}
		this.getSchools();
		this.setEmptyModel();
	}

	addEditHistory() {
		this.loading = false;
		if (this.model.entity == appConstants.emptyEntry || this.model.entity == undefined) {
			this.alertService.error(appConstants.entityError);
		} else if (this.model.major == appConstants.emptyEntry || this.model.major == undefined) {
			this.alertService.error(appConstants.titleError);
		} else if (this.model.startYear == appConstants.emptyEntry || this.model.startYear == undefined) {
			this.alertService.error(appConstants.startDateError);
		} else if (this.model.status == appConstants.emptyEntry || this.model.status == undefined) {
			this.alertService.error(appConstants.statusError);
		} else if (this.model.educationStatus == appConstants.emptyEntry || this.model.educationStatus == undefined) {
			this.alertService.error(appConstants.stageError);
		} else {
			const person = AppCommons.createPersonObject(this.person, this.personId);
			person.education = this.createEducation(this.person.education);
			this.updatePerson(person, false);
		}
	}

	removeEducation(education: Education) {
		this.loading = true;
		const person = AppCommons.createPersonObject(this.person, this.personId);
		for (let i = 0; i < person.education.length; i++) {
			if (person.education[i]._id == education.id) {
				person.education.splice(i, 1);
			}
		}
		this.updatePerson(person, true);
	}

	editEducation(education: Education) {
		this.model.id = education._id;
		this.model.entity = education.entityId;
		this.model.major = education.course;
		this.model.educationStatus = education.stage;
		this.model.startYear = education.startYear;
		this.model.endYear = education.endYear;
		this.model.status = education.status;
		this.educationId = education.id;
		this.newEducationId = education.id;
	}

	private getEducationHistory() {
		this.loading = true;
		this.personService.getPersonById(this.personId).subscribe(
			data => {
				this.populateEducationModel(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getPerson() {
		this.loading = true;
		this.personService.getPersonById(this.personId).subscribe(
			data => {
				this.createHistory(data);
				this.person = data;
				this.personName = this.person.name;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createHistory(data: any) {
		if (data !== null) {
			const history = data.education;
			for (let i = 0; i < history.length; i++) {
				const education = new Education();
				education.id = history[i]._id;
				education.entityId = history[i].organisation._id;
				education.entity = history[i].organisation.name;
				education.entityIconImage = history[i].organisation.iconImage || appConstants.defaultImageIcon;
				education.startYear = history[i].startYear;
				education.endYear = history[i].endYear;
				education.course = history[i].course;
				education.stage = history[i].stage;
				education.status = history[i].status;
				this.studies.push(education);
			}
		}
	}

	private setEmptyModel() {
		this.model.id = appConstants.emptyEntry;
		this.model.entity = appConstants.emptyEntry;
		this.model.major = appConstants.emptyEntry;
		this.model.educationStatus = appConstants.emptyEntry;
		this.model.startYear = appConstants.emptyEntry;
		this.model.endYear = appConstants.emptyEntry;
		this.model.status = appConstants.emptyEntry;
	}

	private populateEducationModel(user: any) {
		const person = AppCommons.createPersonObject(user, this.personId);
		for (let i = 0; i < person.education.length; i++) {
			if (person.education[i]._id == this.newEducationId) {
				this.model.id = person.education[i]._id;
				this.model.entity = person.education[i].organistaion._id;
				this.model.title = person.education[i].title;
				this.model.startYear = person.education[i].startYear;
				this.model.endYear = person.education[i].endYear;
				this.model.status = person.education[i].status;
			}
		}
	}

	private getSchools() {
		this.loading = true;
		this.schoolService.getSchools().subscribe(
			data => {
				this.entities = AppCommons.createEntities(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private updatePerson(person: Person, type: boolean) {
		this.loading = true;
		this.personService.updatePerson(person).subscribe(
			data => {
				if (!type) {
					this.alertService.success(appConstants.educationAdditionSuccess);
				}
				this.getPerson();
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createEducation(studies: any[] | any) {
		if (studies.length <= 0) {
			this.createEducationObject(studies);
		} else {
			if (this.educationId != null || this.educationId != undefined) {
				for (let i = 0; i < studies.length; i++) {
					if (this.newEducationId == studies[i]._id) {
						studies[i].organisation = this.model.entity;
						studies[i].course = this.model.major;
						studies[i].stage = this.model.educationStatus;
						studies[i].startYear = this.model.startYear;
						studies[i].endYear = this.model.endYear;
						studies[i].status = this.model.status;
					}
				}
			} else {
				this.createEducationObject(studies);
			}
		}

		return studies;
	}

	private createEducationObject(studies: any) {
		const education = new Education();
		education.organisation = this.model.entity;
		education.course = this.model.major;
		education.stage = this.model.educationStatus;
		education.startYear = this.model.startYear;
		education.endYear = this.model.endYear;
		education.status = this.model.status;
		studies.push(education);
	}
}
