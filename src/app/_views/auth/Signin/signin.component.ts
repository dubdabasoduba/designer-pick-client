/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthenticationService, UserService} from '../../../_services';

@Component({
	selector: 'app-sign-in',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
	model: any = {};
	loading = false;
	loginSuccessfulReturnUrl: string;
	entityProfileUpdateUrl = '/profile-update/';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private alertService: AlertService,
		private authenticationService: AuthenticationService) {
	}

	ngOnInit() {
		this.authenticationService.logout();
		this.loginSuccessfulReturnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	login() {
		this.loading = true;
		this.authenticationService.login(this.model.username, this.model.password).subscribe(
			data => {
				this.forceUserUpdate(data);
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc Forces the Users to update their details before starting the use of the system.
	 * @param data {@link Object}
	 */
	private forceUserUpdate(data: any) {
		if (data.forceUpdate) {
			this.router.navigateByUrl(this.entityProfileUpdateUrl + data.entityId + '?type=' + data.type);
		} else {
			this.router.navigateByUrl(this.loginSuccessfulReturnUrl);
		}
	}
}
