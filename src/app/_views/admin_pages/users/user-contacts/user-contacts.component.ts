/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactModel, PersonModel} from '../../../../_models';
import {AlertService, AuthenticationService, ContactService, PersonsService} from '../../../../_services';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppCommons, appConstants} from '../../../../_helpers';

@Component({
	selector: 'app-contacts',
	templateUrl: './user-contacts.component.html',
	styleUrls: ['./user-contacts.component.css']
})
export class UserContactsComponent implements OnInit, OnDestroy {
	loading = false;
	public contacts: Array<ContactModel> = [];
	public model = {
		email: '',
		location: '',
		phone_number: '',
		is_main: '',
		is_active: ''
	};
	public contactId: string;
	public personId: string;
	mySubscription: any;
	contact = new ContactModel();
	loggedInUser: string;
	person = new PersonModel();
	redirectUrl: string;
	
	constructor(
		private contactService: ContactService, private personsService: PersonsService, private alertService: AlertService,
		private route: ActivatedRoute, private router: Router,
		private authenticationService: AuthenticationService) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
		
		this.mySubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				// Trick the Router into believing it's last link wasn't previously loaded
				this.router.navigated = false;
			}
		});
	}
	
	ngOnInit() {
		this.route.params.subscribe(params => {
			this.personId = params[appConstants.id];
			this.contactId = params[appConstants.contactId];
		});
		this.getContacts();
		this.resetModel();
		if (!AppCommons.isStringEmpty(this.contactId)) {
			this.getContact();
		}
		if (!AppCommons.isStringEmpty(this.personId)) {
			this.getPerson();
		}
		this.loggedInUser = this.authenticationService.getCurrentUser().user.uuid;
		this.redirectUrl = '/user/' + this.personId + '/' + this.person.user_uuid;
	}
	
	ngOnDestroy() {
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
	}
	
	addEditContact() {
		this.loading = false;
		if (this.model.email == appConstants.emptyEntry || this.model.email == undefined) {
			this.alertService.error('The email address is required');
		} else if (this.model.phone_number === appConstants.emptyEntry || this.model.phone_number == undefined) {
			this.alertService.error('The phone number is required');
		} else if (this.model.location === appConstants.emptyEntry || this.model.location == undefined) {
			this.alertService.error('The location is required');
		} else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
			this.alertService.error(appConstants.statusError);
		} else {
			if (AppCommons.isStringEmpty(this.contactId)) {
				this.addContact();
			} else {
				this.updateContact();
			}
		}
	}
	
	removeContact(contactId: string) {
		if (confirm('Are you sure you want to delete this contact?')) {
			this.loading = true;
			this.contactService.removeContact(contactId).subscribe(
				data => {
					this.router.navigateByUrl('/users/contacts/' + this.personId);
					this.loading = false;
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				}
			);
		}
	}
	
	private getPerson() {
		this.loading = true;
		this.personsService.getPersonById(this.personId).subscribe(
			data => {
				if (data[0] === null || data[0] === undefined) {
					this.router.navigateByUrl(this.redirectUrl);
				} else {
					this.person = data[0];
					this.loading = false;
				}
			},
			error => {
				this.alertService.error(error);
				this.router.navigateByUrl(this.redirectUrl);
				this.loading = false;
			}
		);
	}
	
	/**
	 * Get the given countries
	 */
	private getContacts() {
		this.loading = true;
		this.contactService.getContacts(this.personId).subscribe(
			data => {
				this.formatContacts(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	/**
	 * Get a specific country
	 * @private
	 */
	private getContact() {
		this.loading = true;
		this.contactService.getContact(this.contactId).subscribe(
			data => {
				this.contact = data;
				this.loading = false;
				this.populateModel(data);
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private createContact() {
		let contact = new ContactModel();
		if (AppCommons.isStringEmpty(this.contactId)) {
			contact.created_by = this.loggedInUser;
		} else {
			contact = this.contact;
			contact.updated_by = this.loggedInUser;
		}
		contact.email = this.model.email;
		contact.location = this.model.location;
		contact.phone_number = this.model.phone_number;
		contact.is_main = Number(this.model.is_main);
		contact.is_active = Number(this.model.is_active);
		contact.person = this.personId;
		return contact;
	}
	
	private addContact() {
		this.loading = true;
		this.contactService.addContact(this.createContact()).subscribe(
			data => {
				this.loading = false;
				this.ngOnInit();
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private updateContact() {
		this.loading = true;
		this.contactService.updateContact(this.createContact()).subscribe(
			data => {
				this.loading = false;
				this.router.navigateByUrl('/users/contacts/' + this.personId);
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private populateModel(data: any) {
		this.model.email = data.email;
		
		this.model.location = data.location;
		this.model.phone_number = data.phone_number;
		this.model.is_main = data.is_main;
		// @ts-ignore
		this.model.is_active = data.is_active;
	}
	
	private resetModel() {
		this.model.email = appConstants.emptyEntry;
		this.model.location = appConstants.emptyEntry;
		this.model.phone_number = appConstants.emptyEntry;
		this.model.is_main = appConstants.emptyEntry;
		this.model.is_active = appConstants.emptyEntry;
	}
	
	private formatContacts(data: any) {
		this.contacts = [];
		for (let i = 0; i < data.length; i++) {
			const contact = new ContactModel();
			contact.email = data[i].email;
			contact.location = data[i].location;
			
			contact.phone_number = data[i].phone_number;
			
			contact.is_main = data[i].is_main;
			contact.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
			contact.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
			contact.is_active = data[i].is_active;
			contact.uuid = data[i].uuid;
			this.contacts.push(contact);
		}
	}
}
