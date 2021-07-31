import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogoUsesModel} from "../../../_models";
import {AlertService, AuthenticationService, LogoUsesService} from "../../../_services";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AppCommons, appConstants} from "../../../_helpers";

@Component({
	selector: 'app-logo-uses',
	templateUrl: './logo-uses.component.html',
	styleUrls: ['./logo-uses.component.css']
})
export class LogoUsesComponent implements OnInit, OnDestroy {
	loading = false;
	public logoUses: Array<LogoUsesModel> = [];
	public model = {
		name: "",
		description: "",
		is_active: "",
	};
	public logoUseId: string;
	mySubscription: any;
	logoUse = new LogoUsesModel();
	loggedInUser: string;
	
	constructor(
		private logoUsesService: LogoUsesService, private alertService: AlertService,
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
			this.logoUseId = params[appConstants.id];
		});
		this.getLogoUses();
		this.resetModel();
		if (!AppCommons.isStringEmpty(this.logoUseId)) {
			this.getLogoUse();
		}
		this.loggedInUser = this.authenticationService.getCurrentUser().user.uuid;
	}
	
	ngOnDestroy() {
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
	}
	
	addEditLogoUse() {
		this.loading = false;
		if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
			this.alertService.error(appConstants.nameError);
		} else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
			this.alertService.error(appConstants.statusError);
		} else {
			if (AppCommons.isStringEmpty(this.logoUseId)) {
				this.addLogoUses();
			} else {
				this.updateLogoUses();
			}
		}
	}
	
	removeLogoUses(logoUsesId: string) {
		if (confirm("Are you sure you want to delete this logo uses?")) {
			this.loading = true;
			this.logoUsesService.removeLogoUse(logoUsesId).subscribe(
				data => {
					this.router.navigateByUrl('/logo-uses');
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
	 * Get the given logo-uses
	 */
	private getLogoUses() {
		this.loading = true;
		this.logoUsesService.getLogoUses().subscribe(
			data => {
				this.formatLogoUses(data);
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
	private getLogoUse() {
		this.loading = true;
		this.logoUsesService.getLogoUse(this.logoUseId).subscribe(
			data => {
				this.logoUse = data;
				this.loading = false;
				this.populateModel(data)
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private createLogoUses() {
		let category = new LogoUsesModel();
		if (AppCommons.isStringEmpty(this.logoUseId)) {
			category.created_by = this.loggedInUser;
		} else {
			category = this.logoUse;
			category.updated_by = this.loggedInUser;
		}
		category.name = this.model.name;
		category.description = this.model.description;
		category.is_active = Number(this.model.is_active);
		
		return category;
	}
	
	private addLogoUses() {
		this.loading = true;
		this.logoUsesService.addLogoUse(this.createLogoUses()).subscribe(
			data => {
				this.loading = false;
				this.router.navigateByUrl('/logo-uses');
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		)
	}
	
	private updateLogoUses() {
		this.loading = true;
		this.logoUsesService.updateLogoUse(this.createLogoUses()).subscribe(
			data => {
				this.loading = false;
				this.router.navigateByUrl('/logo-uses');
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		)
	}
	
	private populateModel(data: any) {
		this.model.name = data.name;
		this.model.description = data.description;
		// @ts-ignore
		this.model.is_active = data.is_active === 1 ? true : false;
	}
	
	private resetModel() {
		this.model.name = appConstants.emptyEntry;
		this.model.description = appConstants.emptyEntry;
		this.model.is_active = appConstants.emptyEntry;
	}
	
	private formatLogoUses(data: any) {
		this.logoUses = [];
		for (let i = 0; i < data.length; i++) {
			let logoUses = new LogoUsesModel();
			logoUses.name = data[i].name;
			logoUses.description = data[i].description;
			logoUses.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
			logoUses.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
			logoUses.is_active = data[i].is_active;
			logoUses.uuid = data[i].uuid;
			this.logoUses.push(logoUses);
		}
	}
	
}
