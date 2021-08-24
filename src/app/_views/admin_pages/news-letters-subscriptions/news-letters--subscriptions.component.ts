import {Component, OnInit} from '@angular/core';
import {NewsLettersSubscriptionsModel} from '../../../_models';
import {
	AlertService,
	AuthenticationService,
	NewsLettersSubscriptionsService
} from '../../../_services';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppCommons, appConstants} from '../../../_helpers';

@Component({
	selector: 'app-news-letters-subscriptions',
	templateUrl: './news-letters-subscriptions.component.html',
	styleUrls: ['./news-letters-subscriptions.component.css']
})
export class NewsLettersSubscriptionsComponent implements OnInit {
	loading = false;
	public newsLettersSubscriptions: Array<NewsLettersSubscriptionsModel> = [];
	public model = {
		email: '',
		is_active: ''
	};
	public newsLettersSubscriptionsId: string;
	mySubscription: any;
	newsLetter = new NewsLettersSubscriptionsModel();
	loggedInUser: string;
	
	constructor(private newsLettersService: NewsLettersSubscriptionsService, private alertService: AlertService,
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
			this.newsLettersSubscriptionsId = params[appConstants.id];
		});
		this.getNewsLettersSubscriptions();
		this.resetModel();
		if (!AppCommons.isStringEmpty(this.newsLettersSubscriptionsId)) {
			this.getNewsLetterSubscriptions();
		}
		this.loggedInUser = this.authenticationService.getCurrentUser().user.uuid;
	}
	
	ngOnDestroy() {
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
	}
	
	addEditNewsLetterSubscriptions() {
		this.loading = false;
		if (this.model.email == appConstants.emptyEntry || this.model.email == undefined) {
			this.alertService.error('Email subscription');
		} else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
			this.alertService.error(appConstants.statusError);
		} else {
			if (AppCommons.isStringEmpty(this.newsLettersSubscriptionsId)) {
				this.addNewsLetterSubscriptions();
			} else {
				this.updateNewsLetterSubscriptions();
			}
		}
	}
	
	removeNewsLetterSubscriptions(apiKeyId: string) {
		if (confirm('Are you sure you want to delete this news letter subscription?')) {
			this.loading = true;
			this.newsLettersService.removeNewsLettersSubscriptions(apiKeyId).subscribe(
				data => {
					this.router.navigateByUrl('/news-letters-subscriptions');
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
	 * Get the all news letter subscriptions
	 */
	private getNewsLettersSubscriptions() {
		this.loading = true;
		this.newsLettersService.getNewsLettersSubscriptions().subscribe(
			data => {
				this.formatNewsLettersSubscriptions(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	/**
	 * Get a specific news letter subscription
	 * @private
	 */
	private getNewsLetterSubscriptions() {
		this.loading = true;
		this.newsLettersService.getNewsLetterSubscriptions(this.newsLettersSubscriptionsId).subscribe(
			data => {
				this.newsLetter = data;
				this.loading = false;
				this.populateModel(data);
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private createNewsLetterSubscription() {
		let newsLettersModel = new NewsLettersSubscriptionsModel();
		if (AppCommons.isStringEmpty(this.newsLettersSubscriptionsId)) {
			newsLettersModel.created_by = this.loggedInUser;
		} else {
			newsLettersModel = this.newsLetter;
			newsLettersModel.updated_by = this.loggedInUser;
		}
		newsLettersModel.email = this.model.email;
		newsLettersModel.is_active = Number(this.model.is_active);
		
		return newsLettersModel;
	}
	
	private addNewsLetterSubscriptions() {
		this.loading = true;
		this.newsLettersService.addNewsLettersSubscription(this.createNewsLetterSubscription()).subscribe(
			data => {
				this.loading = false;
				this.router.navigateByUrl('/news-letters-subscriptions');
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private updateNewsLetterSubscriptions() {
		this.loading = true;
		this.newsLettersService.updateNewsLettersSubscription(this.createNewsLetterSubscription()).subscribe(
			data => {
				this.loading = false;
				this.router.navigateByUrl('/news-letters-subscriptions');
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private populateModel(data: any) {
		this.model.email = data.email;
		// @ts-ignore
		this.model.is_active = data.is_active === 1 ? true : false;
	}
	
	private resetModel() {
		this.model.email = appConstants.emptyEntry;
		this.model.is_active = appConstants.emptyEntry;
	}
	
	private formatNewsLettersSubscriptions(data: any) {
		this.newsLettersSubscriptions = [];
		for (let i = 0; i < data.length; i++) {
			const newsLettersModel = new NewsLettersSubscriptionsModel();
			newsLettersModel.email = data[i].email;
			newsLettersModel.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
			newsLettersModel.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
			newsLettersModel.is_active = data[i].is_active;
			newsLettersModel.uuid = data[i].uuid;
			this.newsLettersSubscriptions.push(newsLettersModel);
		}
	}
	
}
