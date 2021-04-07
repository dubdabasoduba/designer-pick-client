/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Component, OnInit} from '@angular/core';
import {AuthenticatedUserModel} from '../../_models';
import {AppCommons, appConstants} from '../../_helpers';
import {AlertService, AuthenticationService} from '../../_services';
import {NavigationEnd, Router} from '@angular/router';
import {SearchService} from '../../_services/search/search.service';
import {ResponseModel} from '../../_models/response.model';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	loading = false;
	lbsUser: AuthenticatedUserModel;
	title = appConstants.appTitle;
	public model: any = {};
	public defaultDropdownMainClass = "dropdown dropdown-profile"
	public clickedDropdownMainClass = "dropdown dropdown-profile show"
	public defaultDropdownElementsClass = "dropdown-menu dropdown-menu-right tx-13"
	public clickedDropdownElementsClass = "dropdown-menu dropdown-menu-right tx-13 show"
	is_staff: boolean = false;
	private showDropdown = false;
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
		this.lbsUser = this.authenticationService.getCurrentUser();
		if (!this.commons.isObjectEmpty(this.lbsUser) && AppCommons.isStringEmpty(this.lbsUser.user.profile_image)) {
			this.lbsUser.user.profile_image = appConstants.defaultImageIcon;
		}
		if (this.lbsUser.user.account_type === 2) {
			this.is_staff = true;
		}
	}

	displayProfileDropDown() {
		if (!this.showDropdown) {
			this.defaultDropdownMainClass = this.clickedDropdownMainClass;
			this.defaultDropdownElementsClass = this.clickedDropdownElementsClass;
			this.showDropdown = true;
		} else {
			this.defaultDropdownMainClass = this.defaultDropdownMainClass;
			this.defaultDropdownElementsClass = this.defaultDropdownElementsClass;
			this.showDropdown = false;
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

	signOut() {
		this.loading = true;
		this.authenticationService.logout();
		this.router.navigateByUrl('');
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
