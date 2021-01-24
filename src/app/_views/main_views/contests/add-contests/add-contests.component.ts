import {Component, OnInit} from '@angular/core';
import {AuthenticatedUserModel, ContestModel} from "../../../../_models";
import {AlertService, AuthenticationService, ContestsService} from "../../../../_services";
import {AppCommons, appConstants} from "../../../../_helpers";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-add-contests',
    templateUrl: './add-contests.component.html',
    styleUrls: ['./add-contests.component.css']
})
export class AddContestsComponent implements OnInit {
    loading = false;
    public contest: ContestModel;
    public contestUuid: string;
    public returnUrl: string;
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
        this.returnUrl = this.router.url;
        this.getContest();
    }

    private getContest() {
        this.loading = true;
        this.contestsService.getDisplayContestById(this.contestUuid).subscribe(
            data => {
                this.checkIfUserIdLoggedIn(data[0]);
                this.contest = data[0];
                this.contest.contest_period = AppCommons.calculateDays(this.contest.start_date, this.contest.end_date);
                this.contest.start_date = AppCommons.formatDisplayDate(new Date(this.contest.start_date));
                this.contest.end_date = AppCommons.formatDisplayDate(new Date(this.contest.end_date));

                console.log(this.contest);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private checkIfUserIdLoggedIn(contest: ContestModel) {
        if (contest != null && contest.is_private && this.commons.isObjectEmpty(this.lbsUser)) {
            this.router.navigateByUrl('/contests');
        }
    }

}
