/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthenticationService, UserService} from '../../../_services';
import {AppCommons, appConstants} from '../../../_helpers';
import {AuthenticatedUserModel} from "../../../_models";

@Component({
	selector: 'app-sign-in',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
	model: any = {};
	loading = false;
	loginSuccessfulReturnUrl: string;
	redirectUrl: string;
	
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
	
	/**
	 * Performs the login functionality
	 */
	login() {
		if (AppCommons.isStringEmpty(this.model.username)) {
			this.alertService.error('Username is required');
		} else if (AppCommons.isStringEmpty(this.model.password)) {
			this.alertService.error('Password is required');
		} else {
			this.loading = true;
			this.authenticationService.login(this.model.username, this.model.password).subscribe(
				data => {
					this.generateRedirectUrlForProfiles(data);
					this.forceUserUpdate(data);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				}
			);
		}
	}
	
	private generateRedirectUrlForProfiles(lbsUser) {
		if (lbsUser.user.account_type === 0 && this.loginSuccessfulReturnUrl === '/') {
			this.redirectUrl = appConstants.clientDashboardUrl + lbsUser.user.person;
		} else if (lbsUser.user.account_type === 1 && this.loginSuccessfulReturnUrl === '/') {
			this.redirectUrl = appConstants.designerDashboardUrl + lbsUser.user.person;
		} else if (lbsUser.user.account_type === 2 && this.loginSuccessfulReturnUrl === '/') {
			this.redirectUrl = appConstants.staffAdminViewUrl;
		} else {
			this.redirectUrl = this.loginSuccessfulReturnUrl;
		}
	}
	
	/**
	 * @desc Forces the Users to update their details before starting the use of the system.
	 * @param data {@link Object}
	 */
	private forceUserUpdate(data: AuthenticatedUserModel) {
		if (data.auth.forceUpdate) {
			this.router.navigateByUrl(appConstants.profileUpdateUrl + data.user.person);
		} else {
			this.router.navigateByUrl(this.redirectUrl);
		}
	}
}
