/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, AuthenticationService, ContestsService} from '../../../../_services';
import {AuthenticatedUserModel} from '../../../../_models';
import {appConstants} from '../../../../_helpers';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'app-acquisitions',
	templateUrl: './clients-dashboard.component.html',
	styleUrls: ['./clients-dashboard.component.css']
})
export class ClientsDashboardComponent implements OnInit {
	loading = false;
	lbsUser: AuthenticatedUserModel;
	public userId: string;
	public liveContests: number;
	
	constructor(
		private alertService: AlertService, private authenticationService: AuthenticationService,
		private router: Router, private route: ActivatedRoute, private contestsService: ContestsService) {
	}
	
	ngOnInit() {
		this.lbsUser = this.authenticationService.getCurrentUser();
		this.route.params.subscribe(params => {
			this.userId = params[appConstants.id];
		});
		this.getLiveContests();
	}
	
	private getLiveContests() {
		this.loading = true;
		this.contestsService.getContestsByPersonId(this.lbsUser.user.uuid).subscribe(
			data => {
				this.liveContests = data.length;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
}
