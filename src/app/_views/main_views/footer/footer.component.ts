/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {appConstants} from '../../../_helpers';
import {AlertService, FooterService} from '../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsLettersSubscriptionsModel} from '../../../_models';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	loading = false;
	public model = {
		email: ''
	};
	
	constructor(private alertService: AlertService, private footerService: FooterService,
	            private route: ActivatedRoute, private router: Router) {
	}
	
	ngOnInit(): void {
	}
	
	subscribeNewsLetter() {
		this.loading = false;
		if (this.model.email == appConstants.emptyEntry || this.model.email == undefined) {
			this.alertService.error('Email is required');
		} else {
			this.addNewEmail();
		}
	}
	
	private addNewEmail() {
		this.loading = true;
		this.footerService.subscribeToNewsLetter(this.createNewsLetterEmail()).subscribe(
			data => {
				this.loading = false;
				this.alertService.success('Subscribed to news letters');
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private createNewsLetterEmail() {
		let newsLettersSubscriptionsModel = new NewsLettersSubscriptionsModel();
		newsLettersSubscriptionsModel.email = this.model.email;
		return newsLettersSubscriptionsModel;
	}
}
