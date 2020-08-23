/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AcquisitionsService,
	AlertService,
	AuthenticationService,
	ClaimService,
	EntitiesService,
	FundingService,
	PersonsService} from '../../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {appConstants} from '../../../../_helpers/app.constants';
import {Education, Person} from '../../../../_models';
import {AppCommons} from '../../../../_helpers/app.commons';

@Component({
	selector: 'app-person',
	templateUrl: './person.component.html',
	styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
	loading = false;
	public person: Person;
	public investments = [];
	public acquisitions = [];
	public investors = [];
	public companies = [];
	public categories: any = [];
	public display = true;
	private personId: string;
	private loggedInUser: string;

	constructor(
		private personService: PersonsService,
		private authService: AuthenticationService,
		private fundingService: FundingService,
		private acquisitionService: AcquisitionsService,
		private entityService: EntitiesService,
		private commons: AppCommons,
		private claimService: ClaimService,
		private alertService: AlertService,
		private router: Router,
		private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.personId = params[appConstants.id];
		});

		if (!this.commons.isObjectEmpty(this.authService.getCurrentUser())) {
			this.loggedInUser = this.authService.getCurrentUser().entityId;
		}

		if (this.personId !== null) {
			this.getPerson();
			this.getInvestment();
			this.getAcquisition();
			this.getFoundedCompanies();
		}
	}

	claimProfile() {
		if (this.commons.isObjectEmpty(this.authService.getCurrentUser())) {
			if (this.person != null) {
				const userData = {
					userName: this.person.name,
					email: this.commons.getDefaultEmail(this.person.contacts),
					userType: true,
					id: this.person.id
				};

				if (this.commons.isObjectEmpty(userData)) {
					this.alertService.error(appConstants.userDataMissingError);
				} else {
					this.loading = true;
					this.claimService.initiateClaim(userData).subscribe(
						data => {
							this.alertService.success(data);
							this.loading = false;
						},
						error => {
							this.alertService.error(error);
							this.loading = false;
						}
					);
				}
			}
		} else {
			this.alertService.error(
				'Your are already authenticated. You cannot claim a profile with an already authenticated account');
		}
	}

	private getPerson() {
		this.loading = true;
		this.personService.getPersonById(this.personId).subscribe(
			data => {
				this.createPersonDisplay(data);
				this.loading = false;
			},
			error => {
				if (!AppCommons.isStringEmpty(error.type)) {
					this.alertService.error(error.message);
					this.display = false;
					this.router.navigateByUrl('/');
				} else {
					this.alertService.error(error);
				}

				this.loading = false;
			}
		);
	}

	private getFoundedCompanies() {
		this.loading = true;
		this.personService.getPersonEntityById(this.personId).subscribe(
			data => {
				this.createCompanyList(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getInvestment() {
		this.loading = true;
		this.fundingService.getInvestment(this.personId, appConstants.person).subscribe(
			data => {
				this.createInvestment(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getAcquisition() {
		this.loading = true;
		this.acquisitionService.getInvestments(this.personId, appConstants.person).subscribe(
			data => {
				this.createAcquisitions(data);
				this.loading = false;
			}, error => {
				this.loading = false;
			}
		);
	}

	private createPersonDisplay(person: any) {
		const personDisplay = new Person();
		if (person != null) {
			personDisplay.id = person._id;
			personDisplay.name = person.name;
			personDisplay.description =
				!AppCommons.isStringEmpty(person.description) ? person.description : appConstants.missingDescription;
			personDisplay.gender =
				person.gender == 3 ? appConstants.notDisclosed : person.gender == 0 ? (personDisplay.gender =
					appConstants.male) : (personDisplay.gender = appConstants.female);
			personDisplay.socialMedia = person.social_media;
			personDisplay.claimed = person.claimed;
			if (person.contacts.length > 0) {
				personDisplay.location = AppCommons.getMainLocation(person.contacts);
				personDisplay.contacts = AppCommons.fetchContacts(person.contacts);
			} else {
				personDisplay.contacts = [];
				personDisplay.location = appConstants.notDisclosed;
			}
			personDisplay.mentor = person.is_mentor == false ? appConstants.no : appConstants.no;
			if (person.jobs.length > 0) {
				personDisplay.jobs = AppCommons.createWorkList(person.jobs);
				for (let i = 0; i < person.jobs.length; i++) {
					if (person.jobs[i].isMain == true) {
						personDisplay.mainPosition = person.jobs[i].title;
					}
				}
			} else {
				personDisplay.mainPosition = appConstants.notDisclosed;
				personDisplay.jobs = [];
			}
			personDisplay.boards = person.boards.length > 0 ? AppCommons.createWorkList(person.boards) : [];
			personDisplay.categories = person.industry.length > 0 ? person.industry : [];
			this.categories = person.industry.length > 0 ? person.industry : [];
			personDisplay.age = person.dob != null ? AppCommons.calculateAge(person.dob) : appConstants.notDisclosed;
			if (person.education.length > 0) {
				const personEducation = [];
				for (let i = 0; i < person.education.length; i++) {
					const education = new Education();
					education.entityId = person.education[i].organisation._id;
					education.entity = person.education[i].organisation.name;
					education.entityIconImage = person.education[i].organisation.iconImage || appConstants.defaultImageIcon;
					education.course = person.education[i].course;
					education.stage = person.education[i].stage;
					education.startYear = person.education[i].startYear;
					education.endYear = person.education[i].endYear;
					education.status = person.education[i].status;
					personEducation.push(education);
				}
				personDisplay.education = personEducation;
			} else {
				personDisplay.education = [];
			}
			personDisplay.iconImage = person.iconImage || appConstants.defaultImageIcon;
		} else {
			this.alertService.error(appConstants.fetchError);
		}

		this.person = personDisplay;
	}

	private createCompanyList(companies: any) {
		if (companies.length > 0) {
			const personCompanies = [];
			for (let i = 0; i < companies.length; i++) {
				personCompanies.push(companies[i].entity);
			}
			this.companies = AppCommons.createEntityDisplay(personCompanies);
		}
	}

	private createInvestment(fundings: any) {
		if (fundings.length > 0) {
			this.investments = AppCommons.createInvestments(fundings);
		}
	}

	private createAcquisitions(acquisitions: any) {
		if (acquisitions.length > 0) {
			this.acquisitions = AppCommons.getAcquisitions(acquisitions);
		}
	}
}
