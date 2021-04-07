/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, AuthenticationService} from '../../../_services';

@Component({
	selector: 'app-recovery',
	templateUrl: './recovery.component.html',
	styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
	model: any = {};

	constructor(
		private authenticationService: AuthenticationService,
		private alertService: AlertService) {
	}

	ngOnInit() {
	}

	resetPasswordRequest() {
		this.authenticationService.resetPasswordRequest(this.model.username)
			.subscribe(
				data => {
					this.alertService.success(data, false);
				},
				error => {
					this.alertService.error(error);
				}
			);
	}

}
