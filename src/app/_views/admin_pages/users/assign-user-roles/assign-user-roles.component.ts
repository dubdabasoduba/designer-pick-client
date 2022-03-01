/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, DoCheck, OnInit} from '@angular/core';
import {PersonModel, RolesModel} from '../../../../_models';
import {AlertService, PersonsService, RolesService} from '../../../../_services';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppCommons, appConstants} from '../../../../_helpers';

@Component({
	selector: 'app-assign-user-roles',
	templateUrl: './assign-user-roles.component.html',
	styleUrls: ['./assign-user-roles.component.css']
})
export class AssignUserRolesComponent implements OnInit, DoCheck {
	loading = false;
	public person: PersonModel = new PersonModel();
	public assignedRoles: Array<RolesModel> = [];
	public roles: Array<RolesModel> = [];
	public personId: string;
	mySubscription: any;
	redirectUrl: string;
	private userId: string;
	
	constructor(private rolesService: RolesService, private personsService: PersonsService,
	            private alertService: AlertService, private route: ActivatedRoute,
	            private router: Router) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
		
		this.mySubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				// Trick the Router into believing it's last link wasn't previously loaded
				this.router.navigated = false;
			}
		});
	}
	
	private static formatRoles(data: any, useRole: boolean) {
		let roles: Array<RolesModel> = [];
		for (let i = 0; i < data.length; i++) {
			let role = new RolesModel();
			role.name = data[i].name;
			role.uuid = useRole ? data[i].role : data[i].uuid;
			roles.push(role);
		}
		
		return roles;
	}
	
	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.userId = params[appConstants.userId];
			this.personId = params[appConstants.id];
		});
		
		this.redirectUrl = '/user/' + this.personId + '/' + this.userId;
		
		this.getRoles();
		if ((this.personId !== undefined || this.userId !== undefined) && (!AppCommons.isStringEmpty(this.personId) || !AppCommons.isStringEmpty(this.userId))) {
			this.getPerson();
			this.getUserRoles();
		} else {
			this.router.navigateByUrl(this.redirectUrl);
		}
	}
	
	ngDoCheck() {
		this.removeAlreadyAssignedRoles();
	}
	
	ngOnDestroy() {
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
	}
	
	assignRoles(role: string) {
		for (let i = 0; i < this.roles.length; i++) {
			if (role === this.roles[i].uuid) {
				this.assignedRoles.push(this.roles[i]);
				this.roles.splice(i, 1);
				break;
			}
		}
	}
	
	unAssignRoles(role: string) {
		for (let i = 0; i < this.assignedRoles.length; i++) {
			if (role === this.assignedRoles[i].uuid) {
				this.roles.push(this.assignedRoles[i]);
				this.assignedRoles.splice(i, 1);
				break;
			}
		}
	}
	
	assignRole() {
		this.loading = true;
		this.rolesService.addUserRoles(this.userId, this.assignedRoles).subscribe(
			data => {
				this.router.navigateByUrl(this.redirectUrl);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private getPerson() {
		this.loading = true;
		this.personsService.getPersonById(this.personId).subscribe(
			data => {
				if (data[0] === null || data[0] === undefined) {
					this.router.navigateByUrl(this.redirectUrl);
				} else {
					this.person = data[0];
					this.loading = false;
				}
			},
			error => {
				this.alertService.error(error);
				this.router.navigateByUrl(this.redirectUrl);
				this.loading = false;
			}
		);
	}
	
	/**
	 * Get the permissions in the system
	 */
	private getRoles() {
		this.loading = true;
		let searchQuery = 'is_active=1';
		this.rolesService.getSearchRoles(searchQuery).subscribe(
			data => {
				this.roles = AssignUserRolesComponent.formatRoles(data, false);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private getUserRoles() {
		this.loading = true;
		this.personsService.getUserRoles(this.userId).subscribe(
			data => {
				this.assignedRoles = AssignUserRolesComponent.formatRoles(data, true);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private removeAlreadyAssignedRoles() {
		for (let i = 0; i < this.assignedRoles.length; i++) {
			for (let j = 0; j < this.roles.length; j++) {
				if (this.roles[j].uuid === this.assignedRoles[i].uuid) {
					this.roles.splice(j, 1);
				}
			}
		}
	}
}
