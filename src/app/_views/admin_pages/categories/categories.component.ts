/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, CategoryService} from '../../../_services';
import {ActivatedRoute} from '@angular/router';
import {AppCommons} from '../../../_helpers/app.commons';
import {Category} from '../../../_models';
import {appConstants} from "../../../_helpers/app.constants";

@Component({
    selector: 'app-industries',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    loading = false;
    public categories: Array<Category> = [];
    public model = {
        name: "",
        description: "",
        is_active: ""
    };
    public categoryId: string;

    constructor(
        private categoryService: CategoryService,
        private alertService: AlertService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.categoryId = params[appConstants.id];
        });
        this.getCategories();
        if (AppCommons.isStringEmpty(this.categoryId)) {
            this.getCategory();
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

    private getCategory() {

    }

    private formatCategories(data: any) {
        for (let i = 0; i < data.length; i++) {
            let category = new Category();
            category.name = data[i].name;
            category.description = data[i].description;
            category.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
            category.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
            category.is_active = data[i].is_active === 1 ? "Yes" : "No";
            category.uuid = data[i].uuid;
            this.categories.push(category);
        }
    }
}
