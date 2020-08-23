/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Component, OnInit} from '@angular/core';
import {User} from '../../_models';
import {appConstants} from '../../_helpers/app.constants';
import {AlertService, AuthenticationService} from '../../_services';
import {NavigationEnd, Router} from '@angular/router';
import {AppCommons} from '../../_helpers/app.commons';
import {SearchService} from '../../_services/search/search.service';
import {ResponseModel} from '../../_models/response.model';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	loading = false;
	slimUser: User;
	title = appConstants.appTitle;
	public model: any = {};
	private responseModel = new ResponseModel();

	constructor(
		private authenticationService: AuthenticationService,
		private searchService: SearchService,
		private alertService: AlertService,
		private router: Router,
		private commons: AppCommons) {
	}

	ngOnInit() {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});
		this.slimUser = this.authenticationService.getCurrentUser();
		if (!this.commons.isObjectEmpty(this.slimUser) && AppCommons.isStringEmpty(this.slimUser.entityIconImage)) {
			this.slimUser.entityIconImage = appConstants.defaultImageIcon;
		}
	}

	goToResultsPage() {
		this.router.navigateByUrl('/search');
	}

	search() {
		if (AppCommons.isStringEmpty(this.model.search)) {
			this.alertService.error('The search term cannot be empty');
			this.resetSearchData();
		} else {
			this.searchEntity(this.model.search);
			this.searchPerson(this.model.search);
		}
	}

	private searchEntity(searchTerm) {
		this.loading = true;
		this.searchService.searchEntity(searchTerm).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.searchService.passEntityData(this.responseModel.results);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private searchPerson(searchTerm) {
		this.loading = true;
		this.searchService.searchPerson(searchTerm).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.searchService.passPersonData(this.responseModel.results);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private resetSearchData() {
		this.searchService.passEntityData([]);
		this.searchService.passPersonData([]);
	}
}
