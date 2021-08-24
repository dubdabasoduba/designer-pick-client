import {Component, OnInit} from '@angular/core';
import {AppCommons, appConstants} from '../../../../_helpers';
import {AlertService, AuthenticationService, ContestsService} from '../../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedUserModel, ContestModel} from '../../../../_models';

@Component({
	selector: 'app-view-single-contest',
	templateUrl: './view-single-contest.component.html',
	styleUrls: ['./view-single-contest.component.css']
})
export class ViewSingleContestComponent implements OnInit {
	loading = false;
	public contest: ContestModel;
	public contestUuid: string;
	public returnUrl: string;
	contest_type: string;
	lbsUser: AuthenticatedUserModel;
	
	constructor(
		private authenticationService: AuthenticationService,
		private contestsService: ContestsService,
		private commons: AppCommons,
		private alertService: AlertService,
		private router: Router,
		private route: ActivatedRoute) {
	}
	
	ngOnInit() {
		this.lbsUser = this.authenticationService.getCurrentUser();
		this.route.params.subscribe(params => {
			this.contestUuid = params[appConstants.id];
		});
		this.route.queryParams.subscribe(params => {
			this.contest_type = params['type'];
			this.returnUrl = params['returnUrl'];
		});
		if (!AppCommons.isStringEmpty(this.contest_type)) {
			if (this.contest_type == 'active') {
				this.getContest();
			} else {
				this.getDraftContest();
			}
		} else {
			this.alertService.error('The contest status is required');
			this.router.navigateByUrl(this.returnUrl);
		}
	}
	
	private getContest() {
		this.loading = true;
		this.contestsService.getDisplayContestById(this.contestUuid).subscribe(
			data => {
				if (!AppCommons.isObjectEmpty(data[0])) {
					this.checkIfUserIsLoggedIn(data[0]);
					this.contest = data[0];
					this.contest.duration = AppCommons.calculateDays(this.contest.start_date, this.contest.end_date);
					this.contest.start_date = AppCommons.formatDisplayDate(new Date(this.contest.start_date));
					this.contest.end_date = AppCommons.formatDisplayDate(new Date(this.contest.end_date));
					this.loading = false;
				} else {
					this.router.navigateByUrl(this.returnUrl);
				}
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
				this.router.navigateByUrl(this.returnUrl);
			}
		);
	}
	
	private getDraftContest() {
		this.loading = true;
		this.contestsService.getDraftContestById(this.contestUuid).subscribe(
			data => {
				if (!AppCommons.isObjectEmpty(data[0])) {
					this.checkIfUserIsLoggedIn(data[0]);
					this.contest = data[0];
					this.contest.duration = AppCommons.calculateDays(this.contest.start_date, this.contest.end_date);
					this.contest.start_date = AppCommons.formatDisplayDate(new Date(this.contest.start_date));
					this.contest.end_date = AppCommons.formatDisplayDate(new Date(this.contest.end_date));
					this.loading = false;
				} else {
					this.router.navigateByUrl(this.returnUrl);
				}
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
				this.router.navigateByUrl(this.returnUrl);
			}
		);
	}
	
	private checkIfUserIsLoggedIn(contest: ContestModel) {
		if (contest != null && contest.is_private && AppCommons.isObjectEmpty(this.lbsUser)) {
			this.router.navigateByUrl('/contests');
		}
	}
}
