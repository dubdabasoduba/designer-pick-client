/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {appConstants} from '../../../_helpers/app.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, ClaimService, EntitiesService, PersonsService, UserService} from '../../../_services';
import {AppCommons} from '../../../_helpers/app.commons';

@Component({
	selector: 'app-claim',
	templateUrl: './claim.component.html',
	styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
	model: any = {};
	loading = false;
	private userId: string;
	private claimCode: string;
	private userType: string;
	private entity: any;
	private _token = 'token';
	private _entityId = 'id';
	private _userType = 'type';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private commons: AppCommons,
		private userService: UserService,
		private claimService: ClaimService,
		private entitiesService: EntitiesService,
		private personService: PersonsService,
		private alertService: AlertService) {
	}

	ngOnInit() {
		this.setEmptyModel();
		this.route.params.subscribe(params => {
			this.userId = params[this._entityId];
			this.claimCode = params[this._token];
			this.userType = params[this._userType];
		});

		if ((!AppCommons.isStringEmpty(this.userId)) && (this.userType === appConstants.entity)) {
			this.getEntity();
		} else {
			this.getPerson();
		}
	}

	/**
	 * @desc Gets the required sign in parameters and completes the initiateClaim profile process by updating the auth
	 *     credentials
	 * @author dubdabasoduba
	 */
	claimProfile() {
		if (AppCommons.isStringEmpty(this.userId)) {
			this.alertService.error('The entity to be claimed is required', false);
		} else if (AppCommons.isStringEmpty(this.claimCode)) {
			this.alertService.error('The claim code is required', false);
		} else if (AppCommons.isStringEmpty(this.model.username)) {
			this.alertService.error('The username is required', false);
		} else if (AppCommons.isStringEmpty(this.model.password)) {
			this.alertService.error('The password is required', false);
		} else if (AppCommons.isStringEmpty(this.model.confirmPassword)) {
			this.alertService.error('Confirm password is required', false);
		} else if (this.model.password !== this.model.confirmPassword) {
			this.alertService.error('Passwords do not match', false);
		} else {
			const clientData: any = {
				id: this.userId,
				claim_code: this.claimCode,
				username: this.model.username,
				password: AppCommons.generatePasswordHash(this.model.password),
				confirmPassword: AppCommons.generatePasswordHash(this.model.confirmPassword),
				type: this.userType
			};

			this.loading = true;
			this.claimService.finalizeClaim(clientData).subscribe(
				data => {
					this.alertService.success(data);
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
	 * @desc Fetch the entity profile to be claimed
	 * @author dubdabasoduba
	 */
	getEntity() {
		this.loading = true;
		this.entitiesService.getEntityById(this.userId).subscribe(
			data => {
				this.entity = data;
				this.displayInitialDetails(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc sets an empty model object
	 * @author dubdabasoduba
	 */
	private setEmptyModel() {
		this.model.type = appConstants.emptyEntry;
		this.model.email = appConstants.emptyEntry;
		this.model.name = appConstants.emptyEntry;
		this.model.confirmPassword = appConstants.emptyEntry;
		this.model.password = appConstants.emptyEntry;
		this.model.username = appConstants.emptyEntry;
	}

	/**
	 * @desc Fetch the person profile to be claimed
	 * @author dubdabasoduba
	 */
	private getPerson() {
		this.loading = true;
		this.personService.getPersonById(this.userId).subscribe(
			data => {
				this.entity = data;
				this.displayInitialDetails(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	/**
	 * @desc updates the email & name on the model to display the profile email & name on the initiateClaim form
	 * @param entity
	 * @author dubdabasoduba
	 */
	private displayInitialDetails(entity: any) {
		this.model.email = this.commons.getDefaultEmail(this.entity.contacts);
		this.model.name = this.entity.name;
	}
}
