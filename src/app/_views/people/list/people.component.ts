/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, PagerService, PersonsService} from '../../../_services';
import {appConstants} from '../../../_helpers/app.constants';
import {PagesModel, Person} from '../../../_models';
import {ResponseModel} from '../../../_models/response.model';

@Component({
	selector: 'app-people',
	templateUrl: './people.component.html',
	styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
	constructor(
		private personService: PersonsService,
		private pagerService: PagerService,
		private alertService: AlertService) {
	}

	loading = false;
	public persons = [];
	pager = new PagesModel();
	pagedItems: any[];
	private responseModel = new ResponseModel();

	/**
	 * Extracts the primary job from hte list of the jobs listed on the jobs lists
	 * @param job {@link Object}
	 * @param person {@link Person}
	 */
	private static extractPrimaryJob(job, person: Person) {
		if (job.length > 0) {
			for (let w = 0; w < job.length; w++) {
				if (job[w].isMain === true) {
					person.title = job[w].title || appConstants.emptyEntry;

					if (job[w].entity !== null) {
						person.organisation = job[w].organisation.name;
						person.organisationId = job[w].organisation._id;
						person.entityImageIcon = job[w].organisation.iconImage || appConstants.defaultImageIcon;
					} else {
						person.organisation = appConstants.emptyEntry;
						person.organisationId = appConstants.emptyEntry;
						person.entityImageIcon = appConstants.emptyEntry;
					}
					break;
				}
			}
		} else {
			person.title = appConstants.notDisclosed;
			person.organisation = appConstants.notDisclosed;
			person.organisationId = appConstants.emptyEntry;
			person.entityImageIcon = appConstants.emptyEntry;
		}
	}

	/**
	 * Extracts the primary locations from the contact lists that are assigned to the users
	 * @param contacts {@link Object}
	 * @param person {@link Person}
	 */
	private static extractLocations(contacts, person: Person) {
		if (contacts.length > 0) {
			for (let v = 0; v < contacts.length; v++) {
				if (contacts[v].primary === true) {
					if (contacts[v].county == null) {
						contacts[v].county = appConstants.notDisclosed;
					}

					if (contacts[v].country == null) {
						contacts[v].country = appConstants.notDisclosed;
					}
					const contact = contacts[v].county + ', ' + contacts[v].country;
					person.location = contact || appConstants.emptyEntry;
				}
			}
		} else {
			person.location = appConstants.emptyEntry;
		}
	}

	ngOnInit() {
		this.getPersons();
	}

	getPersons() {
		this.loading = true;
		this.personService.getPeople(false).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.createDisplay(this.responseModel.results);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/*setPage(page: number) {
		// get pager object from service
		this.pager = this.pagerService.getPager(this.persons.length, page);
		// get current page of items
		this.pagedItems = this.persons.slice(this.pager.startIndex, this.pager.endIndex + 1);
	}*/

	private createDisplay(persons) {
		for (let i = 0; i < persons.length; i++) {
			const person = new Person();
			const contacts = persons[i].contacts;
			const job = persons[i].jobs;
			person.id = persons[i]._id;

			/*
			 * Checks to see if the person name if filled. If not then that person is not displayed
			 * */
			if (persons[i].name !== null) {
				person.name = persons[i].name || appConstants.emptyEntry;
				person.iconImage = persons[i].iconImage || appConstants.defaultImageIcon;
				PeopleComponent.extractLocations(contacts, person);
				PeopleComponent.extractPrimaryJob(job, person);
				this.persons.push(person);
			}
		}

		// this.setPage(1);
	}
}
