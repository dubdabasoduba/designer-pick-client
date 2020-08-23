/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AppCommons} from '../../../_helpers/app.commons';
import {AlertService, EntitiesService, PagerService} from '../../../_services';
import {PagesModel} from '../../../_models';
import {ResponseModel} from '../../../_models/response.model';

@Component({
	selector: 'app-entities',
	templateUrl: './entities.component.html',
	styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {
	loading = false;
	public organisations = [];
	pager = new PagesModel();
	pagedItems: any[];
	private responseModel = new ResponseModel();

	constructor(
		private entityService: EntitiesService,
		private pagerService: PagerService,
		private alertService: AlertService) {
	}

	ngOnInit() {
		this.getEntities();
	}

	getEntities() {
		this.loading = true;
		this.entityService.getEntities(true).subscribe(
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

	/*setPage(page: number) {
		// get pager object from service
		this.pager = this.pagerService.getPager(this.organisations.length, page);
		// get current page of items
		this.pagedItems = this.organisations.slice(this.pager.startIndex, this.pager.endIndex + 1);
	}*/

	private createDisplay(entities) {
		this.organisations = AppCommons.createEntityDisplay(entities);
		// this.setPage(1);
	}
}
