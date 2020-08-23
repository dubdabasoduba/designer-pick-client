/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, CompaniesService} from '../../../../_services';
import {AppCommons} from '../../../../_helpers/app.commons';
import {ActivatedRoute} from '@angular/router';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
	loading = false;
	public companies = [];
	private responseModel = new ResponseModel();

	constructor(
		private companyService: CompaniesService,
		private alertService: AlertService,
		private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.getCompanies();
	}

	getCompanies() {
		this.loading = true;
		this.companyService.getCompanies().subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.createDisplay(this.responseModel.results);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createDisplay(organisations) {
		const entities = [];
		for (let i = 0; i < organisations.length; i++) {
			if (organisations[i].type === true) {
				entities.push(organisations[i]);
			}
		}
		this.companies = AppCommons.createEntityDisplay(entities);
	}

}
