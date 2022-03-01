/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, PaypalEmailService, UserService} from '../../../_services';
import {AppCommons, appConstants} from '../../../_helpers';
import {PaypalEmailModel} from '../../../_models';

@Component({
	selector: 'app-sign-up',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	model: any = {};
	showPayPalEmail = false;
	private loading = false;
	
	constructor(
		private route: ActivatedRoute, private router: Router, private userService: UserService,
		private alertService: AlertService, private payPalEmailService: PaypalEmailService) {
	}
	
	ngOnInit() {
		this.setEmptyModel();
	}
	
	register() {
		this.loading = true;
		if (AppCommons.isStringEmpty(this.model.name)) {
			this.alertService.error('Full name is required');
		} else if (AppCommons.isStringEmpty(this.model.account_type)) {
			this.alertService.error('Account type is required');
		} else if (AppCommons.isStringEmpty(this.model.username)) {
			this.alertService.error('Username is required');
		} else if (AppCommons.isStringEmpty(this.model.email)) {
			this.alertService.error('Email Address is required');
		} else if (AppCommons.isStringEmpty(this.model.paypal_use)) {
			this.alertService.error('Please confirm if the email added it the paypal email address');
		} else if ((AppCommons.isStringEmpty(this.model.paypal_use) || this.model.paypal_use == '0') && AppCommons.isStringEmpty(this.model.paypal_email)) {
			this.alertService.error('Paypal Email Address is required');
		} else if (AppCommons.isStringEmpty(this.model.password)) {
			this.alertService.error('Password is required');
		} else if (AppCommons.isStringEmpty(this.model.confirmPassword)) {
			this.alertService.error('Confirm password is required');
		} else {
			const clientData: any = {
				account_type: this.model.account_type,
				email: this.model.email,
				name: this.model.name,
				confirmPassword: AppCommons.generatePasswordHash(this.model.confirmPassword),
				password: AppCommons.generatePasswordHash(this.model.password),
				username: this.model.username
			};
			
			this.userService.createUser(clientData).subscribe(
				data => {
					// @ts-ignore
					if (!AppCommons.isObjectEmpty(data) && !AppCommons.isStringEmpty(data.uuid)) {
						// @ts-ignore
						this.savePayPalEmail(data.uuid, data.user_uuid);
					}
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				}
			);
		}
	}
	
	savePayPalEmail(personUuid: string, userUuid: string) {
		this.payPalEmailService.addPayPalEmail(this.generatePayPalEmail(personUuid, userUuid)).subscribe(
			data => {
				this.alertService.success(appConstants.registrationSuccessful, false);
				this.loading = false;
				this.router.navigate(['/sign-in']);
			}, error => {
				this.alertService.error(error.data);
				this.loading = false;
			}
		);
	}
	
	generatePayPalEmail(personUuid: string, userUuid: string) {
		const payPalEmail = new PaypalEmailModel();
		payPalEmail.email = this.model.paypal_use == '0' ? this.model.paypal_email : this.model.email;
		payPalEmail.person = personUuid;
		payPalEmail.created_by = userUuid;
		return payPalEmail;
	}
	
	isPayPalEmail(event: any) {
		const isPayPalEmail = event.target.value;
		this.showPayPalEmail = isPayPalEmail != null && !AppCommons.isStringEmpty(isPayPalEmail) && isPayPalEmail == '0';
	}
	
	private setEmptyModel() {
		this.model.account_type = appConstants.emptyEntry;
		this.model.paypal_use = appConstants.emptyEntry;
		this.model.email = appConstants.emptyEntry;
		this.model.paypal_email = appConstants.emptyEntry;
		this.model.confirmPassword = appConstants.emptyEntry;
		this.model.password = appConstants.emptyEntry;
		this.model.username = appConstants.emptyEntry;
	}
}
