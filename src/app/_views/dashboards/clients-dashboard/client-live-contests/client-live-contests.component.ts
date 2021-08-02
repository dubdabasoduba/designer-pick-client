import {Component, OnInit} from '@angular/core';
import {AuthenticatedUserModel, ContestModel} from "../../../../_models";
import {AlertService, AuthenticationService, ContestsService} from "../../../../_services";
import {ActivatedRoute, Router} from "@angular/router";
import {AppCommons, appConstants} from "../../../../_helpers";

@Component({
	selector: 'app-client-live-contests',
	templateUrl: './client-live-contests.component.html',
	styleUrls: ['./client-live-contests.component.css']
})
export class ClientLiveContestsComponent implements OnInit {
	loading = false;
	lbsUser: AuthenticatedUserModel;
	public userId: string
	public allContests: Array<ContestModel>
	
	
	constructor(
		private alertService: AlertService, private authenticationService: AuthenticationService,
		private router: Router, private route: ActivatedRoute, private contestsService: ContestsService) {
	}
	
	private static generateNewContest(contest: ContestModel) {
		let newContest = new ContestModel();
		newContest.uuid = contest.uuid;
		newContest.title = contest.business_name + " | " + contest.title;
		newContest.stage = contest.stage;
		newContest.amount = contest.amount;
		newContest.is_featured = contest.is_featured;
		newContest.is_highlighted = contest.is_highlighted;
		newContest.is_private = contest.is_private;
		newContest.is_active = contest.is_active;
		newContest.duration = AppCommons.calculateDays(contest.start_date, contest.end_date);
		newContest.end_date = AppCommons.formatDisplayDate(new Date(contest.end_date));
		
		return newContest;
	}
	
	ngOnInit() {
		this.lbsUser = this.authenticationService.getCurrentUser();
		this.route.params.subscribe(params => {
			this.userId = params[appConstants.id];
		});
		this.getLiveContests();
	}
	
	displaySingleContest(contest: string, isActive: number) {
		let status = "active";
		if (isActive == 0) {
			status = "draft"
		}
		AppCommons.displaySingleContest(this.router, contest, status, this.router.url);
	}
	
	private getLiveContests() {
		this.loading = true;
		this.contestsService.getContestsByPersonId(this.lbsUser.user.uuid).subscribe(
			data => {
				this.updateLiveContests(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private updateLiveContests(contests: Array<ContestModel>) {
		let newContests = []
		for (let i = 0; i < contests.length; i++) {
			let contest = contests[i];
			newContests.push(ClientLiveContestsComponent.generateNewContest(contest));
		}
		
		this.allContests = newContests;
	}
}
