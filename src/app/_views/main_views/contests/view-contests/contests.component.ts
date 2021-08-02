/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, AuthenticationService, ContestsService} from '../../../../_services';
import {AuthenticatedUserModel, ContestModel} from "../../../../_models";
import {AppCommons, appConstants} from "../../../../_helpers";
import {Router} from "@angular/router";

@Component({
	selector: 'app-entities',
	templateUrl: './contests.component.html',
	styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {
	loading = false;
	public contests: Array<ContestModel> = [];
	lbsUser: AuthenticatedUserModel;
	
	constructor(
		private authenticationService: AuthenticationService,
		private contestsService: ContestsService,
		private alertService: AlertService,
		private router: Router,) {
	}
	
	ngOnInit() {
		this.lbsUser = this.authenticationService.getCurrentUser();
		this.getContests();
	}
	
	redirectToSign(contest: string) {
		if (!AppCommons.isObjectEmpty(this.lbsUser)) {
			AppCommons.displaySingleContest(this.router, contest, "active", this.router.url);
		} else {
			this.router.navigate([appConstants.authSIgnInUrl], {
				queryParams: {
					returnUrl: "/contests/" + contest
				}
			});
		}
	}
	
	displaySingleContest(contest: string) {
		AppCommons.displaySingleContest(this.router, contest, "active", this.router.url);
	}
	
	/**
	 * Get the contests in the system
	 */
	private getContests() {
		this.loading = true;
		this.contestsService.getDisplayContests().subscribe(
			data => {
				this.formatContests(data)
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	/**
	 * Formatting the contests for display
	 * @param contests {@link Array<any>}
	 * @private
	 */
	private formatContests(contests: any) {
		for (let i = 0; i < contests.length; i++) {
			let contest = new ContestModel();
			contest.title = contests[i].title;
			contest.business_name = contests[i].business_name;
			contest.start_date = AppCommons.formatDisplayDate(new Date(contests[i].start_date));
			contest.end_date = AppCommons.formatDisplayDate(new Date(contests[i].end_date));
			contest.is_private = contests[i].is_private;
			contest.is_featured = contests[i].is_featured;
			contest.is_highlighted = contests[i].is_highlighted;
			contest.uuid = contests[i].uuid;
			this.contests.push(contest);
		}
	}
}
