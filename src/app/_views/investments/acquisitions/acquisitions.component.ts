/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AcquisitionsService, AlertService} from '../../../_services';
import {AppCommons} from '../../../_helpers/app.commons';
import {Acquisitions} from '../../../_models';
import {appConstants} from '../../../_helpers/app.constants';
import {ResponseModel} from '../../../_models/response.model';

@Component({
	selector: 'app-acquisitions',
	templateUrl: './acquisitions.component.html',
	styleUrls: ['./acquisitions.component.css']
})
export class AcquisitionsComponent implements OnInit {
	loading = false;
	public acquisitions = [];
	private investments = [];
	private responseModel = new ResponseModel();

	constructor(
		private acquisitionService: AcquisitionsService,
		private alertService: AlertService) {
	}

	ngOnInit() {
		this.getRecentAcquisitions();
	}

	getRecentAcquisitions() {
		this.loading = true;
		this.acquisitionService.getAcquisitions(0, 0, true).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.createRecentAcquisitions(this.responseModel.results);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createRecentAcquisitions(investments: any) {
		for (let i = 0; i < investments.length; i++) {
			const acquisition = new Acquisitions();
			const buyers = investments[i].buyers;
			const entity = investments[i].entity;

			if (investments[i].name !== null && entity !== null) {
				acquisition.id = investments[i]._id;
				acquisition.name = investments[i].name;
				acquisition.amount = AppCommons.shortenNumber(investments[i].amount, 2);
				acquisition.acquisition_date = AppCommons.formatDisplayDate(new Date(investments[i].acquisition_date));
				acquisition.entityId = entity._id;
				acquisition.entity = entity.name;
				acquisition.entityIconImage = entity.iconImage || appConstants.defaultImageIcon;
				acquisition.buyers = buyers.length > 0 ? buyers.length : 0;
				this.investments.push(acquisition);
			}
		}
		this.acquisitions = this.investments;
	}

}
