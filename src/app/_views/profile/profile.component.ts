/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {appConstants} from '../../_helpers/app.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthenticationService, PersonsService, ProfileService} from '../../_services';
import {User} from '../../_models';
import {AppCommons} from '../../_helpers/app.commons';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public imageIcon = appConstants.defaultImageIcon;
    loading = false;
    lbsUser: User;
    public person: any;
    public personUuid: string;

    constructor(
        private authenticationService: AuthenticationService,
        private profileService: ProfileService,
        private personService: PersonsService,
        private commons: AppCommons,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.personUuid = params[appConstants.id];
        });
        this.getPerson();
    }

    private getPerson() {
        this.loading = true;
        this.personService.getPersonById(this.personUuid).subscribe(
            data => {
                console.log(data[0]);
                this.person = data[0];
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }
}
