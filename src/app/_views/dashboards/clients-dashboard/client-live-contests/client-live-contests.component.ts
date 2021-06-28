import {Component, OnInit} from '@angular/core';
import {AuthenticatedUserModel, ContestModel} from "../../../../_models";
import {AlertService, AuthenticationService, ContestsService} from "../../../../_services";
import {ActivatedRoute, Router} from "@angular/router";
import {appConstants} from "../../../../_helpers";

@Component({
    selector: 'app-client-live-contests',
    templateUrl: './client-live-contests.component.html',
    styleUrls: ['./client-live-contests.component.css']
})
export class ClientLiveContestsComponent implements OnInit {
    loading = false;
    lbsUser: AuthenticatedUserModel;
    public userId: string
    public contests: Array<ContestModel>


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
        this.contestsService.getContestsByPersonId(this.userId).subscribe(
            data => {
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }
}
