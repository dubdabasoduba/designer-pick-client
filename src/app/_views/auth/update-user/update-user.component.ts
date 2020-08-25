/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, AuthenticationService, PersonsService} from '../../../_services';
import {AppCommons} from '../../../_helpers/app.commons';
import {ActivatedRoute, Router} from '@angular/router';
import {appConstants} from '../../../_helpers/app.constants';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
    loading = false;
    public personUuid: string;
    public model: any = {};
    private person: any;
    private oldEmail: string;
    private returnUrl: string;

    constructor(
        private authenticationService: AuthenticationService,
        private personService: PersonsService,
        private commons: AppCommons,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loading = false;
        this.route.params.subscribe(params => {
            this.personUuid = params[appConstants.id];
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.setEmptyModel();
        this.getPerson();
    }

    updateModelObject(entity: any) {
        this.person = entity;
        this.model.id = entity._id;
        this.model.name = entity.name;
        this.model.email = this.commons.getDefaultEmail(entity.contacts);
        this.oldEmail = this.commons.getDefaultEmail(entity.contacts);
        this.model.phonenumber = this.commons.getDefaultPhonenumber(entity.contacts);
        this.model.description = entity.description;
        this.model.avatar = appConstants.emptyEntry;
        this.model.dob = AppCommons.formatEditDateDisplay(new Date(entity.dob));
        this.model.gender = entity.gender;
    }

    editPerson() {
        if (AppCommons.isStringEmpty(this.model.name)) {
            this.alertService.error('Person name cannot be empty');
        } else if (AppCommons.isStringEmpty(this.model.industry)) {
            this.alertService.error('Industry of operation cannot be empty');
        } else if (AppCommons.isStringEmpty(this.model.region)) {
            this.alertService.error('Country of operation cannot be empty');
        } else if (AppCommons.isStringEmpty(this.model.email)) {
            this.alertService.error('Email Address cannot be empty');
        } else if (AppCommons.isStringEmpty(this.model.phonenumber)) {
            this.alertService.error('Phone number cannot be empty');
        } else if (!AppCommons.isStringEmpty(this.model.gender) &&
            (this.model.gender < 0 || this.model.gender > 3)) {
            this.alertService.error('Please select gender from the list provided');
        } else {
            this.updatePerson();
        }
    }

    private setEmptyModel() {
        this.model.uuid = appConstants.emptyEntry;
        this.model.name = appConstants.emptyEntry;
        this.model.phonenumber = appConstants.emptyEntry;
        this.model.account_type = appConstants.emptyEntry;
        this.model.email = appConstants.emptyEntry;
        this.model.dateofbirth = appConstants.emptyEntry;
        this.model.gender = appConstants.emptyEntry;
    }

    private getPerson() {
        this.loading = true;
        this.personService.getPersonById(this.personUuid).subscribe(
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

    private updatePerson() {
        this.loading = true;
        this.personService.updatePerson(this.updateEntityObject()).subscribe(
            data => {
                this.authenticationService.setForceUpdateState(false);
                this.loading = false;
                this.router.navigateByUrl(this.returnUrl);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private updateEntityObject() {
        if (!AppCommons.isStringEmpty(this.personUuid)) {
            this.person.name = this.model.name;
            this.person.description = this.model.description;
            this.person.old_email = this.oldEmail;
            this.person.forceUpdate = false;
            this.person.dob = this.model.dob;
            this.person.gender = this.model.gender;
            return this.person;
        }
    }
}
