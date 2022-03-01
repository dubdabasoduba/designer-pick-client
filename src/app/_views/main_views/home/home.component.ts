/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService, AuthenticationService} from '../../../_services';
import {AuthenticatedUserModel} from '../../../_models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	loading = false;
	private currentUser = new AuthenticatedUserModel();
	
	constructor(
		private router: Router,
		private alertService: AlertService,
		private authenticationService: AuthenticationService) {
	}
	
	ngOnInit() {
		this.currentUser = this.authenticationService.getCurrentUser();
	}
	
	
	resendVerification() {
		this.loading = true;
		this.authenticationService.resendVerification(this.currentUser.user.username).subscribe(
			data => {
				this.router.navigateByUrl('/sign-out');
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
}
