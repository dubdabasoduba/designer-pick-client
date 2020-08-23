/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, SchoolsService} from '../../../../_services';
import {AppCommons} from '../../../../_helpers/app.commons';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-schools',
	templateUrl: './schools.component.html',
	styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
	loading = false;
	public schools = [];
	private responseModel = new ResponseModel();

	constructor(
		private schoolsService: SchoolsService,
		private alertService: AlertService) {
	}

	ngOnInit() {
		this.getSchools();
	}


	getSchools() {
		this.loading = true;
		this.schoolsService.getSchools().subscribe(
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

	private createDisplay(institutions) {
		const educationalInstitutions = [];
		for (let i = 0; i < institutions.length; i++) {
			if (institutions[i].type === false) {
				educationalInstitutions.push(institutions[i]);
			}
		}
		this.schools = AppCommons.createEntityDisplay(educationalInstitutions);
	}
}
