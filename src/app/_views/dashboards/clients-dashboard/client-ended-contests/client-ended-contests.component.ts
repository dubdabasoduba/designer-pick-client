import {Component, OnInit} from '@angular/core';
import {AuthenticatedUserModel, ContestModel} from '../../../../_models';
import {AlertService, AuthenticationService} from '../../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {appConstants} from '../../../../_helpers';

@Component({
	selector: 'app-client-ended-contests',
	templateUrl: './client-ended-contests.component.html',
	styleUrls: ['./client-ended-contests.component.css']
})
export class ClientEndedContestsComponent implements OnInit {
	loading = false;
	lbsUser: AuthenticatedUserModel;
	public userId: string;
	public contests: Array<ContestModel>;
	
	constructor(
		private alertService: AlertService, private authenticationService: AuthenticationService,
		private router: Router, private route: ActivatedRoute) {
	}
	
	ngOnInit() {
		this.lbsUser = this.authenticationService.getCurrentUser();
		this.route.params.subscribe(params => {
			this.userId = params[appConstants.id];
		});
	}
	
}
