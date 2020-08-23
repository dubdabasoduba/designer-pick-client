/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AcquisitionsService, AlertService, AuthenticationService, EntitiesService, FundingService, PersonsService} from '../../_services';
import {AppCommons} from '../../_helpers/app.commons';
import {appConstants} from '../../_helpers/app.constants';
import {Acquisitions, Funding, Sponsors, User} from '../../_models';
import {ResponseModel} from '../../_models/response.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	loading = false;
	public recentFunding = [];
	public showFunding = true;
	public recentAcquisitions = [];
	public persons = 0;
	public entities = 0;
	public monthlyFunding = 0;
	public monthlyAcquisitions: string | any = 0;
	verify = false;
	private investments = [];
	private buyouts = [];
	private currentUser = new User();
	private responseModel = new ResponseModel();

	constructor(
		private router: Router,
		private fundingService: FundingService,
		private acquisitionService: AcquisitionsService,
		private alertService: AlertService,
		private authenticationService: AuthenticationService,
		private personService: PersonsService,
		private organisationService: EntitiesService) {
	}

	ngOnInit() {
		this.currentUser = this.authenticationService.getCurrentUser();
		this.getRecentFunding();
		this.getRecentAcquisition();
		this.getPeopleCount();
		this.getOrganisationCount();
		this.getMonthlyFunding();
		this.getMonthlyAcquisitions();
		if (this.currentUser != null) {
			this.verify = this.currentUser.verify;
		}
	}

	getRecentFunding() {
		this.loading = true;
		this.fundingService.getFundings(1, 10, true).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.createRecentFunding(this.responseModel.results);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	resendVerification() {
		this.loading = true;
		this.authenticationService.resendVerification(this.currentUser.username).subscribe(
			data => {
				this.router.navigateByUrl('/sign-out');
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getRecentAcquisition() {
		this.loading = true;
		this.acquisitionService.getAcquisitions(1, 60, true).subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.createRecentAcquisition(this.responseModel.results);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createRecentFunding(investments: any) {
		this.showFunding = investments.length > 0;

		for (let i = 0; i < investments.length; i++) {
			const recentFunding = new Funding();
			const sponsors = investments[i].sponsors;
			const entity = investments[i].entity;
			const funding_type = investments[i].funding_type;

			if (investments[i].name !== null && entity !== null && funding_type !== null && i <= 10) {
				recentFunding.id = investments[i]._id;
				recentFunding.name = investments[i].name;
				recentFunding.amount = investments[i].amount > 0 ? AppCommons.shortenNumber(investments[i].amount,
					2) : appConstants.notDisclosed;
				recentFunding.funding_date = AppCommons.formatDisplayDate(new Date(investments[i].funding_date));
				recentFunding.funding_type = funding_type.name;
				recentFunding.funding_typeId = funding_type._id;
				recentFunding.entityId = entity._id;
				recentFunding.entity = entity.name;
				recentFunding.entityIconImage = entity.iconImage || appConstants.defaultImageIcon;
				if (sponsors.length > 0) {
					recentFunding.numberOfSponsors = sponsors.length;
					const investors = [];
					for (let w = 0; w < sponsors.length; w++) {
						if (sponsors[w].entity_sponsor !== null && sponsors[w].person_sponsor === null) {
							const sponsor = this.createInvestorObject(sponsors, w, false);
							investors.push(sponsor);
						} else if (sponsors[w].entity_sponsor === null && sponsors[w].person_sponsor !== null) {
							const sponsor = this.createInvestorObject(sponsors, w, true);
							investors.push(sponsor);
						}
						recentFunding.sponsors = investors;
					}
				} else {
					recentFunding.numberOfSponsors = appConstants.zeroSponsor;
				}

				this.investments.push(recentFunding);
			}
		}

		this.recentFunding = this.investments;
	}

	/**
	 * @desc Creates the investor|sponsor object
	 * @param buyers {@link Array}
	 * @param w {@link Number}
	 * @param type {@link Boolean}
	 * @author dubdabasoduba
	 */
	private createInvestorObject(buyers, w: number, type: boolean) {
		const buyer = new Sponsors();
		const sponsor = type ? buyers[w].person_sponsor : buyers[w].entity_sponsor;

		buyer.id = sponsor._id;
		buyer.name = sponsor.name;
		buyer.entityIconImage = sponsor.iconImage || appConstants.defaultImageIcon;
		buyer.type = type;
		return buyer;
	}

	private createRecentAcquisition(acquisitions: any) {
		for (let i = 0; i < acquisitions.length; i++) {
			const recentAcquisition = new Acquisitions();
			const buyers = acquisitions[i].buyers;
			const entity = acquisitions[i].entity;

			if (acquisitions[i].name !== null && entity !== null && 1 <= 10) {
				recentAcquisition.id = acquisitions[i]._id;
				recentAcquisition.name = acquisitions[i].name;
				recentAcquisition.amount = AppCommons.shortenNumber(acquisitions[i].amount, 2);
				recentAcquisition.acquisition_date =
					AppCommons.formatDisplayDate(new Date(acquisitions[i].acquisition_date));
				recentAcquisition.entityId = entity._id;
				recentAcquisition.entity = entity.name;
				recentAcquisition.entityIconImage = entity.iconImage || appConstants.defaultImageIcon;
				recentAcquisition.numberOfBuyers = buyers.length > 0 ? buyers.length : appConstants.emptyEntry;

				this.buyouts.push(recentAcquisition);
			}
		}

		this.recentAcquisitions = this.buyouts;
	}

	/**
	 * @desc Gets the people count in the system
	 * @author dubdabasoduba
	 */
	private getPeopleCount() {
		this.loading = true;
		this.personService.getPersonCount().subscribe(
			data => {
				this.persons = data.count;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getOrganisationCount() {
		this.loading = true;
		this.organisationService.getOrganisationsCount().subscribe(
			data => {
				this.entities = data.count;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getMonthlyFunding() {
		this.loading = true;
		this.fundingService.getDatedFunding(appConstants.monthly).subscribe(
			data => {
				this.monthlyFunding = AppCommons.shortenNumber(data.funding, 2);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private getMonthlyAcquisitions() {
		this.loading = true;
		this.acquisitionService.getDatedAcquisitions(appConstants.monthly).subscribe(
			data => {
				this.monthlyAcquisitions = AppCommons.shortenNumber(data.acquisitions, 2);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
}
