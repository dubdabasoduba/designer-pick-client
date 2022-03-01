/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AppCommons, appConstants} from '../../../_helpers';
import {AlertService, AuthenticationService, PersonsService, ProfileService} from '../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonModel, UserModel} from '../../../_models';

@Component({
	selector: 'app-update-credentials',
	templateUrl: './update-credentials.component.html',
	styleUrls: ['./update-credentials.component.css']
})
export class UpdateCredentialsComponent implements OnInit {
	public imageIcon = appConstants.defaultImageIcon;
	loading = false;
	public person: PersonModel;
	public personUuid: string;
	public returnUrl: string;
	public model = {
		old_password: '',
		new_password: '',
		confirm_new_password: ''
	};
	
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
		this.returnUrl = this.router.url;
		this.getPerson();
	}
	
	changePassword() {
		if (AppCommons.isStringEmpty(this.model.old_password)) {
			this.alertService.error('The old password cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.new_password)) {
			this.alertService.error('The new password cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.confirm_new_password)) {
			this.alertService.error('The confirm new password cannot be empty');
		} else if (this.model.confirm_new_password !== this.model.new_password) {
			this.alertService.error('The new passwords do not match');
		} else {
			this.updateCredentials();
		}
	}
	
	signOut() {
		this.loading = true;
		this.authenticationService.logout();
		this.router.navigateByUrl('');
	}
	
	private getPerson() {
		this.loading = true;
		this.personService.getPersonById(this.personUuid).subscribe(
			data => {
				this.person = data[0];
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private updateCredentials() {
		this.loading = true;
		this.authenticationService.updatePasswordFormProfile(this.createUser()).subscribe(
			data => {
				this.alertService.success('Password updated successfully');
				this.loading = false;
				this.signOut();
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private createUser() {
		let user = new UserModel();
		user.uuid = this.person.user_uuid;
		user.password = this.model.old_password;
		user.confirmPassword = this.model.confirm_new_password;
		return user;
	}
}
