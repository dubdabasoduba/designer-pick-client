/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, UserService} from '../../../_services';
import {appConstants} from '../../../_helpers/app.constants';
import {AppCommons} from '../../../_helpers/app.commons';

@Component({
	selector: 'app-sign-up',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	model: any = {};
	loading = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private alertService: AlertService) {
	}

	ngOnInit() {
		this.setEmptyModel();
	}

	register() {
		this.loading = true;
		if (AppCommons.isStringEmpty(this.model.name)) {
			this.alertService.error('Entity name is required');
		} else if (AppCommons.isStringEmpty(this.model.type)) {
			this.alertService.error('Entity type is requires');
		} else if (AppCommons.isStringEmpty(this.model.username)) {
			this.alertService.error('The user is required');
		} else if (AppCommons.isStringEmpty(this.model.email)) {
			this.alertService.error('Email Address is required');
		} else if (AppCommons.isStringEmpty(this.model.password)) {
			this.alertService.error('Phone number is required');
		} else if (AppCommons.isStringEmpty(this.model.confirmPassword)) {
			this.alertService.error('Phone number is required');
		} else {
			const clientData: any = {
				type: this.model.type,
				email: this.model.email,
				name: this.model.name,
				confirmPassword: AppCommons.generatePasswordHash(this.model.confirmPassword),
				password: AppCommons.generatePasswordHash(this.model.password),
				username: this.model.username
			};

			this.userService.create(clientData).subscribe(
				data => {
					this.alertService.success(appConstants.registrationSuccessful, false);
					this.loading = false;
					this.router.navigate(['/sign-in']);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				}
			);
		}
	}

	private setEmptyModel() {
		this.model.type = appConstants.emptyEntry;
		this.model.email = appConstants.emptyEntry;
		this.model.confirmPassword = appConstants.emptyEntry;
		this.model.password = appConstants.emptyEntry;
		this.model.username = appConstants.emptyEntry;
	}
}
