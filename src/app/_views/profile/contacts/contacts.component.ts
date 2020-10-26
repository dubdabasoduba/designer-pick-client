/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ContactModel, Person, User} from '../../../_models';
import {
    AlertService,
    AuthenticationService,
    CountriesService,
    PersonsService
} from '../../../_services';
import {appConstants} from '../../../_helpers/app.constants';
import {AppCommons} from '../../../_helpers/app.commons';
import {ResponseModel} from '../../../_models/response.model';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
    loading = false;
    public entityName: string;
    public entity: any;
    public contactId: string;
    public contacts: any = [];
    public model: any = {};
    public countries: any = [];
    private lbsUser: User;
    private entityId: string;
    private type: boolean;
    private responseModel = new ResponseModel();

    constructor(
        private personService: PersonsService,
        private countriesService: CountriesService,
        private alertService: AlertService,
        private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.setEmptyModel();
        this.lbsUser = this.authService.getCurrentUser();
        if (this.lbsUser != null) {
            this.entityId = this.lbsUser.uuid;
            this.type = Boolean(this.lbsUser.type);
        }

        if (this.entityId != null) {
            this.getEntityDetails();
        }

        this.getCountries();
    }

    removeContact(contact: ContactModel) {
        this.loading = true;
        let entity;
        entity = this.type ? AppCommons.createPersonObject(this.entity, this.entityId) : AppCommons.createEntityObject(this.entity,
            this.entityId);
        entity.user = this.authService.getCurrentUser().uuid;

        for (let i = 0; i < entity.contacts.length; i++) {
            if (entity.contacts[i]._id == contact._id) {
                entity.contacts.splice(i, 1);
            }
        }

        if (this.type) {
            this.updatePerson(entity, true);
        }
    }

    addEditContacts() {
        this.loading = false;
        if (this.model.country == appConstants.emptyEntry || this.model.country == undefined) {
            this.alertService.error(appConstants.countryError);
        } else if (this.model.phonenumber == appConstants.emptyEntry || this.model.phonenumber == undefined) {
            this.alertService.error(appConstants.phonenumberError);
        } else if (this.model.email == appConstants.emptyEntry || this.model.email == undefined) {
            this.alertService.error(appConstants.emailError);
        } else {
            if (this.type) {
                const person = AppCommons.createPersonObject(this.entity, this.entityId);
                person.contacts = this.createContacts(this.entity.contacts);
                person.user = this.authService.getCurrentUser().uuid;
                this.updatePerson(person, false);
            }

        }
    }

    fetchContacts(entity: any) {
        if (entity != null) {
            this.entityName = entity.name;
            this.contacts = AppCommons.fetchContacts(entity.contacts);
        }
    }

    editContact(contact) {
        this.contactId = contact._id;
        this.model.id = contact._id;
        this.model.country = contact.country;
        this.model.county = contact.county;
        this.model.phonenumber = contact.phonenumber;
        this.model.email = contact.email;
        this.model.primary = contact.country == appConstants.yes;
    }

    private setEmptyModel() {
        this.model.id = appConstants.emptyEntry;
        this.model.country = appConstants.emptyEntry;
        this.model.county = appConstants.emptyEntry;
        this.model.phonenumber = appConstants.emptyEntry;
        this.model.email = appConstants.emptyEntry;
        this.model.primary = appConstants.emptyEntry;
    }

    private getEntityDetails() {
        if (this.type) {
            this.fetchPerson(this.entityId);
        }
    }

    private fetchPerson(personId: string) {
        this.loading = true;
        this.personService.getPersonById(personId).subscribe(
            data => {
                this.fetchContacts(data);
                this.entity = data;
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }


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

    private updatePerson(person: Person, type: boolean) {
        this.loading = true;
        this.personService.updatePerson(person).subscribe(
            data => {
                if (!type) {
                    this.alertService.success(appConstants.contactsAdditionSuccess);
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

    private createContacts(contacts: any[] | any) {
        if (contacts.length <= 0) {
            this.createContactsObjects(contacts);
        } else {
            if (this.contactId != null || this.contactId != undefined) {
                for (let i = 0; i < contacts.length; i++) {
                    if (this.contactId == contacts[i]._id) {
                        contacts[i].country = this.model.country;
                        contacts[i].county = this.model.county;
                        contacts[i].phonenumber = this.model.phonenumber;
                        contacts[i].email = this.model.email;
                        contacts[i].primary = this.model.primary;
                    }
                }
            } else {
                this.createContactsObjects(contacts);
            }
        }

        return contacts;
    }

    private createContactsObjects(contacts: any) {
        const contact = new ContactModel();
        contact.country = this.model.country;
        contact.county = this.model.county;
        contact.phone_number = this.model.phonenumber;
        contact.email = this.model.email;
        contact.is_main = this.model.primary;
        contacts.push(contact);
    }
}
