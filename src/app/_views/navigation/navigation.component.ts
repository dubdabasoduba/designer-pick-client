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
	is_client: boolean = false;
	is_designer: boolean = false;
	private showDropdown = false;
	
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
		if (!AppCommons.isObjectEmpty(this.lbsUser) && AppCommons.isStringEmpty(this.lbsUser.user.profile_image)) {
			this.lbsUser.user.profile_image = appConstants.defaultImageIcon;
		}
		if (!AppCommons.isObjectEmpty(this.lbsUser) && this.lbsUser.user.account_type === 2) {
			this.is_staff = true;
		}
		if (!AppCommons.isObjectEmpty(this.lbsUser) && this.lbsUser.user.account_type === 0) {
			this.is_client = true;
		}
		if (!AppCommons.isObjectEmpty(this.lbsUser) && this.lbsUser.user.account_type === 1) {
			this.is_designer = true;
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
	
	signOut() {
		this.loading = true;
		this.authenticationService.logout();
		this.router.navigateByUrl('');
	}
	
}
