import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommissionsModel} from '../../../_models';
import {AlertService, AuthenticationService, CommissionsService} from '../../../_services';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppCommons, appConstants} from '../../../_helpers';

@Component({
	selector: 'app-commissions',
	templateUrl: './commissions.component.html',
	styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit, OnDestroy {
	loading = false;
	public commissions: Array<CommissionsModel> = [];
	public model = {
		name: '',
		percentage: 0,
		is_active: '',
		description: ''
	};
	public commissionId: string;
	mySubscription: any;
	commission = new CommissionsModel();
	loggedInUser: string;
	
	constructor(
		private commissionsService: CommissionsService, private alertService: AlertService,
		private route: ActivatedRoute, private router: Router,
		private authenticationService: AuthenticationService) {
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
	
	ngOnInit() {
		this.route.params.subscribe(params => {
			this.commissionId = params[appConstants.id];
		});
		this.getCommissions();
		this.resetModel();
		if (!AppCommons.isStringEmpty(this.commissionId)) {
			this.getCommission();
		}
		this.loggedInUser = this.authenticationService.getCurrentUser().user.uuid;
	}
	
	ngOnDestroy() {
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
	}
	
	addEditCommission() {
		this.loading = false;
		if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
			this.alertService.error(appConstants.nameError);
		} else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
			this.alertService.error(appConstants.statusError);
		} else {
			if (AppCommons.isStringEmpty(this.commissionId)) {
				this.addCommission();
			} else {
				this.updateCommission();
			}
		}
	}
	
	removeCommission(commissionId: string) {
		if (confirm('Are you sure you want to delete this commission?')) {
			this.loading = true;
			this.commissionsService.removeCommission(commissionId).subscribe(
				data => {
					this.router.navigateByUrl('/payment/commissions');
					this.loading = false;
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				}
			);
		}
	}
	
	/**
	 * Get the given categories
	 */
	private getCommissions() {
		this.loading = true;
		this.commissionsService.getCommissions().subscribe(
			data => {
				this.formatCommission(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	/**
	 * Get a specific category
	 * @private
	 */
	private getCommission() {
		this.loading = true;
		this.commissionsService.getCommission(this.commissionId).subscribe(
			data => {
				this.commission = data;
				this.loading = false;
				this.populateModel(data);
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private createCommission() {
		let commissionsModel = new CommissionsModel();
		if (AppCommons.isStringEmpty(this.commissionId)) {
			commissionsModel.created_by = this.loggedInUser;
		} else {
			commissionsModel = this.commission;
			commissionsModel.updated_by = this.loggedInUser;
		}
		commissionsModel.name = this.model.name;
		commissionsModel.percentage = this.model.percentage;
		commissionsModel.description = this.model.description;
		commissionsModel.is_active = Number(this.model.is_active);
		
		return commissionsModel;
	}
	
	private addCommission() {
		this.loading = true;
		this.commissionsService.addCommission(this.createCommission()).subscribe(
			data => {
				this.loading = false;
				this.router.navigateByUrl('/payment/commissions');
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private updateCommission() {
		this.loading = true;
		this.commissionsService.updateCommission(this.createCommission()).subscribe(
			data => {
				this.loading = false;
				this.router.navigateByUrl('/payment/commissions');
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private populateModel(data: any) {
		this.model.name = data.name;
		this.model.percentage = data.percentage;
		this.model.description = data.description;
		// @ts-ignore
		this.model.is_active = data.is_active;
	}
	
	private resetModel() {
		this.model.name = appConstants.emptyEntry;
		this.model.percentage = 0;
		this.model.is_active = appConstants.emptyEntry;
		this.model.description = appConstants.emptyEntry;
	}
	
	private formatCommission(data: any) {
		this.commissions = [];
		for (let i = 0; i < data.length; i++) {
			const commissionsModel = new CommissionsModel();
			commissionsModel.name = data[i].name;
			commissionsModel.percentage = data[i].percentage;
			commissionsModel.description = data[i].description;
			commissionsModel.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
			commissionsModel.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
			commissionsModel.is_active = data[i].is_active;
			commissionsModel.uuid = data[i].uuid;
			this.commissions.push(commissionsModel);
		}
	}
	
}
