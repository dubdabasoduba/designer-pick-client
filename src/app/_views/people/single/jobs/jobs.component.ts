/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertService, AuthenticationService, EntitiesService, PersonsService} from '../../../../_services';
import {appConstants} from '../../../../_helpers/app.constants';
import {Jobs, Person} from '../../../../_models';
import {AppCommons} from '../../../../_helpers/app.commons';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
	loading = false;
	entities: any;
	public personName: string;
	jobs: any = [];
	personId: string;
	jobId: string;
	newJobId: string;
	model: any = {};
	private person: any;
	private responseModel = new ResponseModel();

	constructor(
		private route: ActivatedRoute,
		private alertService: AlertService,
		private authenticationService: AuthenticationService,
		private personService: PersonsService,
		private entityService: EntitiesService) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.personId = params[appConstants.id];
		});

		this.route.queryParams.subscribe(params => {
			this.jobId = params.job;
		});

		if (this.personId !== null) {
			this.getPerson();
		}

		if (this.jobId !== null && this.personId !== null) {
			this.getJob();
		}
		this.getEntities();
		this.setEmptyModel();
	}

	addEditJobs() {
		this.loading = false;
		if (this.model.entity == appConstants.emptyEntry || this.model.entity == undefined) {
			this.alertService.error(appConstants.entityError);
		} else if (this.model.title == appConstants.emptyEntry || this.model.title == undefined) {
			this.alertService.error(appConstants.titleError);
		} else if (this.model.startDate == appConstants.emptyEntry || this.model.startDate == undefined) {
			this.alertService.error(appConstants.startDateError);
		} else if (this.model.status == appConstants.emptyEntry || this.model.status == undefined) {
			this.alertService.error(appConstants.statusError);
		} else if (AppCommons.validateDate(this.model.startDate, true, null)) {
			this.alertService.error(appConstants.greaterThanTodayStartDate);
		} else if (this.model.endDate != appConstants.emptyEntry && this.model.endDate != undefined) {
			if (AppCommons.validateDate(this.model.startDate, false, this.model.endDate)) {
				this.alertService.error(appConstants.greaterEndDateThanStartDate);
			}
		} else {
			const person = AppCommons.createPersonObject(this.person, this.personId);
			person.jobs = this.createJob(this.person.jobs);
			this.updatePerson(person, false);
		}
	}

	removeJob(job: Jobs) {
		this.loading = true;
		const person = AppCommons.createPersonObject(this.person, this.personId);
		for (let i = 0; i < person.jobs.length; i++) {
			if (person.jobs[i]._id == job.id) {
				person.jobs.splice(i, 1);
			}
		}
		this.updatePerson(person, true);
	}

	editJob(job: any) {
		this.model.id = job.entityId;
		this.model.entity = job.entityId;
		this.model.title = job.title;
		this.model.startDate = job.startDate;
		this.model.endDate = job.endDate;
		this.model.status = job.status;
		this.model.isMain = job.isMain == appConstants.yes ? true : false;
		this.newJobId = job.id;
		this.jobId = job.id;
	}

	private getJob() {
		this.loading = true;
		this.personService.getPersonById(this.personId).subscribe(
			data => {
				this.populateJobModel(data);
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
				this.createJobs(data);
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

	private createJobs(data: any) {
		if (data !== null) {
			const jobs = data.jobs;
			for (let i = 0; i < jobs.length; i++) {
				const job = new Jobs();
				job.id = jobs[i]._id;
				job.entityId = jobs[i].organisation._id;
				job.entity = jobs[i].organisation.name;
				job.entityIconImage = jobs[i].organisation.iconImage || appConstants.defaultImageIcon;
				job.startDate = AppCommons.formatEditDateDisplay(new Date(AppCommons.checkNullDate(jobs[i].startDate, true)));
				if (AppCommons.isStringEmpty(AppCommons.checkNullDate(jobs[i].endDate, true))) {
					job.endDate = AppCommons.formatEditDateDisplay(new Date(AppCommons.checkNullDate(jobs[i].endDate, true)));
				}
				job.title = jobs[i].title;
				job.isMain = jobs[i].isMain == true ? appConstants.yes : appConstants.no;
				job.status = jobs[i].status;
				this.jobs.push(job);
			}
		}
	}

	private setEmptyModel() {
		this.model.id = appConstants.emptyEntry;
		this.model.entity = appConstants.emptyEntry;
		this.model.title = appConstants.emptyEntry;
		this.model.startDate = appConstants.emptyEntry;
		this.model.endDate = appConstants.emptyEntry;
		this.model.status = appConstants.emptyEntry;
	}

	private populateJobModel(user: any) {
		const person = AppCommons.createPersonObject(user, this.personId);
		for (let i = 0; i < person.jobs.length; i++) {
			if (person.jobs[i]._id == this.jobId) {
				this.model.id = person.jobs[i]._id;
				this.model.entity = person.jobs[i].organistaion._id;
				this.model.title = person.jobs[i].title;
				this.model.startDate = person.jobs[i].startDate;
				this.model.endDate = person.jobs[i].endDate;
				this.model.status = person.jobs[i].status;
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

	private updatePerson(person: Person, type: boolean) {
		this.loading = true;
		this.personService.updatePerson(person).subscribe(
			data => {
				if (!type) {
					this.alertService.success(appConstants.jobAdditionSuccess);
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

	private createJob(jobs: any[] | any) {
		if (jobs.length <= 0) {
			jobs.push(this.createJobObject());
		} else {
			if (this.newJobId == null || this.newJobId == undefined) {
				jobs.push(this.createJobObject());
			} else {
				for (let i = 0; i < jobs.length; i++) {
					if (this.jobId == jobs[i]._id) {
						jobs[i].organisation = this.model.entity;
						jobs[i].title = this.model.title;
						jobs[i].startDate = this.model.startDate;
						jobs[i].endDate = this.model.endDate;
						jobs[i].isMain = this.model.isMain;
						jobs[i].status = this.model.status;
					}
				}
			}
		}

		return jobs;
	}

	private createJobObject() {
		const job = new Jobs();
		job.organisation = this.model.entity;
		job.title = this.model.title;
		job.startDate = this.model.startDate;
		job.endDate = this.model.endDate;
		job.isMain = this.model.isMain;
		job.status = this.model.status;
		return job;
	}
}
