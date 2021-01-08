/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, AuthenticationService} from '../../../_services';
import {SearchService} from '../../../_services/search/search.service';
import {AppCommons} from '../../../_helpers';
import {ResponseModel} from '../../../_models/response.model';

@Component({
    selector: 'app-result',
    templateUrl: './how-it-works.component.html',
    styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
    loading = false;
    public companies: any = [];
    public persons: any = [];
    public model: any = {};
    private responseModel = new ResponseModel();

    constructor(
        private authenticationService: AuthenticationService,
        private searchService: SearchService,
        private alertService: AlertService) {
        this.searchService.entityData.subscribe((companies) => {
            this.companies = companies;
        });

        this.searchService.personData.subscribe((people) => {
            this.persons = people;
        });
    }

    ngOnInit(): void {
    }

    search() {
        if (AppCommons.isStringEmpty(this.model.search)) {
            this.alertService.error('The search term cannot be empty');
            this.model = {};
            this.companies = [];
            this.persons = [];
        } else {
            this.searchEntity(this.model.search);
            this.searchPerson(this.model.search);
        }
    }

    private searchEntity(searchTerm) {
        this.loading = true;
        this.searchService.searchEntity(searchTerm).subscribe(
            data => {
                this.companies = data;
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
                this.persons = data;
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }
}
