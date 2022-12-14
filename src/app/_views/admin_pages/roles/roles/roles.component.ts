/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {RolesModel} from '../../../../_models';
import {AlertService, RolesService} from '../../../../_services';
import {AppCommons} from '../../../../_helpers';

@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
	loading = false;
	public roles: Array<RolesModel> = [];
	
	constructor(private rolesService: RolesService,
	            private alertService: AlertService) {
	}
	
	ngOnInit(): void {
		this.getRoles();
	}
	
	/**
	 * Get the permissions in the system
	 */
	private getRoles() {
		this.loading = true;
		this.rolesService.getRoles().subscribe(
			data => {
				this.formatPermissions(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private formatPermissions(data: any) {
		for (let i = 0; i < data.length; i++) {
			const role = new RolesModel();
			role.name = data[i].name;
			role.description = data[i].description;
			role.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
			role.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
			role.is_active = data[i].is_active;
			role.uuid = data[i].uuid;
			this.roles.push(role);
		}
	}
}
