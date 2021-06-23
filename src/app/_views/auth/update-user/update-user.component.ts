/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, AuthenticationService, PersonsService} from '../../../_services';
import {AppCommons, appConstants} from '../../../_helpers';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonModel} from "../../../_models";

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
    loading = false;
    public personUuid: string;
    public model: any = {};
    public person: PersonModel;
    private oldEmail: string;
    private contactUuid: string;
    private userUuid: string;
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
        this.model.uuid = entity.uuid;
        this.model.name = entity.name;
        this.model.email = entity.email;
        this.oldEmail = entity.email;
        this.model.phonenumber = entity.phone_number;
        this.model.dob = entity.dob;
        this.model.gender = entity.gender === null || entity.gender === undefined ? appConstants.emptyEntry : entity.gender;
        this.model.account_type = entity.account_type;
        this.model.profile_image = entity.profile_image;
        this.contactUuid = entity.contact_uuid;
        this.userUuid = entity.user_uuid;
    }

    editPerson() {
        if (AppCommons.isStringEmpty(this.model.name)) {
            this.alertService.error('PersonModel name cannot be empty');
        } else if (AppCommons.isStringEmpty(this.model.account_type)) {
            this.alertService.error('Account type cannot be empty');
        } else if (AppCommons.isStringEmpty(this.model.dob)) {
            this.alertService.error('Date of birth cannot be empty');
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
        this.model.dob = appConstants.emptyEntry;
        this.model.gender = appConstants.emptyEntry;
        this.model.account_type = appConstants.emptyEntry;
        this.model.profile_image = appConstants.emptyEntry;
    }

    private getPerson() {
        this.loading = true;
        this.personService.getPersonById(this.personUuid).subscribe(
            data => {
                this.updateModelObject(data[0]);
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
                this.authenticationService.setName(this.model.name);
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
            this.person.email = this.oldEmail;
            this.person.force_update = false;
            this.person.dob = this.model.dob;
            this.person.gender = this.model.gender;
            this.person.account_type = this.model.account_type;
            this.person.iconImage = this.model.profile_image;
            this.person.uuid = this.personUuid;
            this.person.phone_number = this.model.phonenumber;
            this.person.contact_uuid = this.contactUuid;
            this.person.user_uuid = this.userUuid;
            return this.person;
        }
    }
}
