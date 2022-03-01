/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../_services';
import {AppCommons, appConstants} from '../../../_helpers';

@Component({
	selector: 'app-admin-main-page',
	templateUrl: './admin-main-page.component.html',
	styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit {
	public appConstants = appConstants;
	
	constructor(private authService: AuthenticationService) {
	}
	
	ngOnInit(): void {
	
	}
	
	public checkPermissions(requiredPermission: string): boolean {
		let hasPermission = false;
		const requiredPermissions = [requiredPermission];
		if (this.authService.getCurrentUser() !== null && AppCommons.checkIfPermissionsExist(requiredPermissions,
			this.authService.getCurrentUser().auth.permissions)) {
			hasPermission = true;
		}
		return hasPermission;
	}
	
}
