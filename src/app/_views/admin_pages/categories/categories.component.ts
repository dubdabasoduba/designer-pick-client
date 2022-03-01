/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService, AuthenticationService, CategoryService} from '../../../_services';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppCommons, appConstants} from '../../../_helpers';
import {CategoryModel} from '../../../_models';

@Component({
	selector: 'app-industries',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
	loading = false;
	public categories: Array<CategoryModel> = [];
	public model = {
		name: '',
		description: '',
		is_active: '',
	};
	public categoryId: string;
	mySubscription: any;
	category = new CategoryModel();
	loggedInUser: string;
	
	constructor(
		private categoryService: CategoryService, private alertService: AlertService,
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
			this.categoryId = params[appConstants.id];
		});
		this.getCategories();
		this.resetModel();
		if (!AppCommons.isStringEmpty(this.categoryId)) {
			this.getCategory();
		}
		this.loggedInUser = this.authenticationService.getCurrentUser().user.uuid;
	}
	
	ngOnDestroy() {
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
	}
	
	addEditCategory() {
		this.loading = false;
		if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
			this.alertService.error(appConstants.nameError);
		} else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
			this.alertService.error(appConstants.statusError);
		} else {
			if (AppCommons.isStringEmpty(this.categoryId)) {
				this.addCategory();
			} else {
				this.updateCategory();
			}
		}
	}
	
	removeCategory(categoryId: string) {
		if (confirm('Are you sure you want to delete this category?')) {
			this.loading = true;
			this.categoryService.removeCategory(categoryId).subscribe(
				data => {
					this.router.navigateByUrl('/categories');
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
	private getCategories() {
		this.loading = true;
		this.categoryService.getCategories().subscribe(
			data => {
				this.formatCategories(data);
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
	private getCategory() {
		this.loading = true;
		this.categoryService.getCategory(this.categoryId).subscribe(
			data => {
				this.category = data;
				this.loading = false;
				this.populateModel(data);
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private createCategory() {
		let category = new CategoryModel();
		if (AppCommons.isStringEmpty(this.categoryId)) {
			category.created_by = this.loggedInUser;
		} else {
			category = this.category;
			category.updated_by = this.loggedInUser;
		}
		category.name = this.model.name;
		category.description = this.model.description;
		category.is_active = Number(this.model.is_active);
		
		return category;
	}
	
	private addCategory() {
		this.loading = true;
		this.categoryService.addCategory(this.createCategory()).subscribe(
			data => {
				this.loading = false;
				this.router.navigateByUrl('/categories');
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private updateCategory() {
		this.loading = true;
		this.categoryService.updateCategory(this.createCategory()).subscribe(
			data => {
				this.loading = false;
				this.router.navigateByUrl('/categories');
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private populateModel(data: any) {
		this.model.name = data.name;
		this.model.description = data.description;
		// @ts-ignore
		this.model.is_active = data.is_active === 1;
	}
	
	private resetModel() {
		this.model.name = appConstants.emptyEntry;
		this.model.description = appConstants.emptyEntry;
		this.model.is_active = appConstants.emptyEntry;
	}
	
	private formatCategories(data: any) {
		this.categories = [];
		for (let i = 0; i < data.length; i++) {
			const category = new CategoryModel();
			category.name = data[i].name;
			category.description = data[i].description;
			category.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
			category.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
			category.is_active = data[i].is_active;
			category.uuid = data[i].uuid;
			this.categories.push(category);
		}
	}
}
