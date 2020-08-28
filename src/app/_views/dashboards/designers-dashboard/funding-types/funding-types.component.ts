/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, FundingTypesService} from '../../../../_services';
import {ActivatedRoute} from '@angular/router';
import {AppCommons} from '../../../../_helpers/app.commons';
import {ResponseModel} from '../../../../_models/response.model';

@Component({
	selector: 'app-funding-types',
	templateUrl: './funding-types.component.html',
	styleUrls: ['./funding-types.component.css']
})
export class FundingTypesComponent implements OnInit {
	loading = false;
	public fundingTypeEntities = [];
	public fundingTypeName: string;
	private fundingTypeId: string;
	private responseModel = new ResponseModel();

	constructor(
		private fundingTypeService: FundingTypesService,
		private route: ActivatedRoute,
		private alertService: AlertService) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.fundingTypeId = params['id'];
		});

		if (this.fundingTypeId != null) {
			this.getFundingTypeOrganisations();
			this.getFundingType();
		}
	}

	private getFundingTypeOrganisations() {
		this.loading = true;
		this.fundingTypeService.getFundingTypeOrganisations(this.fundingTypeId).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.fundingTypeEntities = AppCommons.createCompanies(this.responseModel.results);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getFundingType() {
		this.loading = true;
		this.fundingTypeService.getFundingType(this.fundingTypeId).subscribe(
			data => {
				this.createFundingDetails(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createFundingDetails(funding) {
		this.fundingTypeName = funding.name;
	}
}
