/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {appConstants} from '../../_helpers/app.constants';
import {Router} from '@angular/router';
import {AlertService, AuthenticationService, ProfileService} from '../../_services';
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
	passwordModel: any = {};
	deactivateModel: any = {};
	private profileImage = '';

	constructor(
		private router: Router,
		private commons: AppCommons,
		private authenticationService: AuthenticationService,
		private profileService: ProfileService,
		private alertService: AlertService) {
	}

	ngOnInit() {
		this.setPasswordModel();
		this.setDeactivateModel();
		this.lbsUser = this.authenticationService.getCurrentUser();
		if (!this.commons.isObjectEmpty(this.lbsUser) && !AppCommons.isStringEmpty(this.lbsUser.entityIconImage)) {
			this.imageIcon = this.lbsUser.entityIconImage;
		}
	}

	/**
	 * @desc Requests a user password change from the profile page
	 * @author dubdabasoduba
	 */
	changePassword() {
		if (!AppCommons.isStringEmpty(this.passwordModel.currentPassword)) {
			this.loading = true;
			this.authenticationService.passwordChangeRequest(this.passwordModel.currentPassword, this.lbsUser.username)
				.subscribe(
					data => {
						this.router.navigateByUrl(appConstants.authSignOutUrl);
						this.loading = false;
					},
					error => {
						this.alertService.error(error);
						this.loading = false;
					}
				);
		} else {
			this.alertService.error('Current Password is required');
		}
	}

	/**
	 * @desc Uploads the image to the server
	 * @author dubdabasoduba
	 */
	uploadImage(event: any) {
		if (!this.commons.isObjectEmpty(event)) {
			const files = event.target.files;
			const file: File = files[0];

			if (files && file) {
				if (file.size < 2000000) {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					// tslint:disable-next-line:no-shadowed-variable
					reader.onload = (event) => {
						const image = new Image();
						// @ts-ignore
						image.src = event.target.result;
						this.profileImage = image.src;
						this.imageIcon = image.src;
					};

				} else {
					this.alertService.error('The image size cannot be more than 2mb');
				}
			} else {
				this.alertService.error('The image was not uploaded. Please try again or contact system admin');
			}

		}
	}

	sendToServer() {
		const userId = this.lbsUser.entityId + '_' + this.lbsUser.type;
		if (!AppCommons.isStringEmpty(userId) && !AppCommons.isStringEmpty(this.profileImage)) {
			this.loading = true;
			this.profileService.uploadImage(this.profileImage, userId).subscribe(
				data => {
					this.imageIcon = data.toString();
					this.authenticationService.setUpdatedProfileImage(this.imageIcon);
					this.alertService.success('Your profile image was updated');
					this.ngOnInit();
					this.loading = false;
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				}
			);
		}
	}


	/**
	 * @desc initiates the user deactivate account
	 */
	deactivateAccount() {
		const userDetails = {
			type: this.lbsUser.type,
			user: this.lbsUser.id,
			entity: this.lbsUser.entityId
		};

		this.loading = true;
		this.profileService.deactivateAccount(userDetails).subscribe(
			data => {
				this.router.navigateByUrl(appConstants.authSignOutUrl);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private setPasswordModel() {
		this.passwordModel.currentPassword = appConstants.emptyEntry;
	}

	private setDeactivateModel() {
		this.deactivateModel.reason = appConstants.emptyEntry;
	}
}
