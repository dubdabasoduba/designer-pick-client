/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {PersonModel} from '../../../../_models';
import {AlertService, PersonsService, RolesService} from '../../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {AppCommons, appConstants} from '../../../../_helpers';
import {combineLatest} from 'rxjs';

@Component({
	selector: 'app-view-user',
	templateUrl: './view-user.component.html',
	styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
	loading = false;
	public person: PersonModel = new PersonModel();
	public userRoles = [];
	public personId: string;
	private userId: string;
	
	constructor(private rolesService: RolesService, private personsService: PersonsService,
	            private alertService: AlertService, private route: ActivatedRoute,
	            private router: Router) {
	}
	
	ngOnInit(): void {
		combineLatest([this.route.paramMap, this.route.queryParamMap])
			.subscribe(([pathParams]) => {
				this.userId = pathParams.get(appConstants.userId);
				this.personId = pathParams.get(appConstants.id);
			});
		
		if ((this.personId !== undefined || this.userId !== undefined) &&
			(!AppCommons.isStringEmpty(this.personId) || !AppCommons.isStringEmpty(this.userId))) {
			this.getPerson();
			this.getUserRoles();
		} else {
			this.router.navigateByUrl('/users');
		}
	}
	
	removePerson(id: string) {
		if (confirm('Are you sure you want to delete this user?')) {
			this.loading = true;
			this.personsService.removePerson(id).subscribe(
				data => {
					this.router.navigateByUrl('/users');
					this.loading = false;
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				}
			);
		}
	}
	
	private getPerson() {
		this.loading = true;
		this.personsService.getPersonById(this.personId).subscribe(
			data => {
				if (data[0] === null || data[0] === undefined) {
					this.router.navigateByUrl('/users');
				} else {
					this.person = data[0];
					this.person.date_created = AppCommons.formatDisplayDate(new Date(data[0].date_created));
					this.person.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[0].date_updated));
					// @ts-ignore
					this.person.is_active = data[0].is_active;
					this.loading = false;
				}
			},
			error => {
				this.alertService.error(error);
				this.router.navigateByUrl('/users');
				this.loading = false;
			}
		);
	}
	
	private getUserRoles() {
		this.loading = true;
		this.personsService.getUserRoles(this.userId).subscribe(
			data => {
				// @ts-ignore
				this.userRoles = data;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
}
