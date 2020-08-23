/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {
	AcquisitionsService,
	AlertService,
	AuthenticationService,
	ClaimService,
	EntitiesService,
	FoundersService,
	FundingService
} from '../../../../_services';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Entity} from '../../../../_models';
import {AppCommons} from '../../../../_helpers/app.commons';
import {appConstants} from '../../../../_helpers/app.constants';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
	selector: 'app-entity',
	templateUrl: './entity.component.html',
	styleUrls: ['./entity.component.css']
})

export class EntityComponent implements OnInit, OnDestroy {
	loading = false;
	public entity: Entity;
	public investments: any = [];
	public acquisitions: any = [];
	public investors: any = [];
	public founders: any = [];
	public industry: any = [];
	public social_media: any = [];
	public contacts: any = [];
	public subsidiaries: any = [];
	public pitch_video: any = appConstants.emptyEntry;
	public categories: any = [];
	public showEditButtons = false;
	public claimed = true;
	public display = true;
	navigationEnd;
	private entityId: string;

	constructor(
		private authService: AuthenticationService,
		private entitiesService: EntitiesService,
		private fundingService: FundingService,
		private acquisitionService: AcquisitionsService,
		private founderService: FoundersService,
		private claimService: ClaimService,
		private alertService: AlertService,
		private commons: AppCommons,
		private route: ActivatedRoute,
		private router: Router,
		private sanitizer: DomSanitizer) {
		this.navigationEnd = this.router.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				this.resetEntries();
				this.getEntityInformation();
			}
		});
	}

	ngOnInit() {
		if (this.commons.isObjectEmpty(this.entity)) {
			this.getEntityInformation();
		}
	}

	ngOnDestroy() {
		if (this.navigationEnd) {
			this.navigationEnd.unsubscribe();
		}
	}

	getCompany() {
		this.loading = true;
		this.entitiesService.getEntityById(this.entityId).subscribe(
			data => {
				this.createEntityDisplay(data);
				this.loading = false;
			},
			error => {
				if (!AppCommons.isStringEmpty(error.type)) {
					this.alertService.error(error.message);
					this.display = false;
					this.router.navigateByUrl('/');
				} else {
					this.alertService.error(error);
				}
				this.loading = false;
			}
		);
	}

	/**
	 * @desc creates the Entity display object
	 * @param entity
	 * @author dubdabasoduba
	 */
	createEntityDisplay(entity) {
		const organisation = new Entity();
		if (entity != null) {
			organisation.id = entity._id;
			organisation.name = entity.name;
			organisation.founded = entity.founded != null ? AppCommons.formatDisplayDate(
				new Date(Date.parse(entity.founded))) : appConstants.missingDate;
			organisation.industry = entity.categories.length > 0 ? entity.categories : [];
			organisation.claimed = entity.claimed;
			this.industry = entity.categories.length > 0 ? entity.categories : [];
			organisation.socialMedia = entity.social_media;
			if (entity.contacts.length > 0) {
				organisation.headquarter =
					entity.headquarter == null || entity.headquarter == undefined ? AppCommons.getMainLocation(
						entity.contacts) : entity.headquarter;
				organisation.contacts = AppCommons.fetchContacts(entity.contacts);
				this.contacts = AppCommons.fetchContacts(entity.contacts);
			} else {
				organisation.contacts = [];
			}
			organisation.operationalStatus = entity.operationStatus == null || entity.operationStatus ==
			undefined ? appConstants.operational : appConstants.closedDown;
			organisation.socialMedia = entity.social_media;
			organisation.iconImage = entity.iconImage || appConstants.defaultImageIcon;
			this.social_media = entity.social_media;
			if (!AppCommons.isStringEmpty(entity.pitch_video)) {
				organisation.pitch_video = entity.pitch_video;
				this.pitch_video = this.sanitizer.bypassSecurityTrustResourceUrl(entity.pitch_video);
			}

			organisation.employees = entity.employees == null ? appConstants.notDisclosed : entity.employees;
			organisation.mentor = entity.is_mentor == false ? appConstants.no : appConstants.yes;
			organisation.investor = entity.is_investor == false ? appConstants.no : appConstants.yes;
			organisation.valuation = entity.valuation == null ? appConstants.notDisclosed : entity.valuation;
			organisation.subsidiaries = entity.subsidiaries != null && entity.subsidiaries.length > 0 ? AppCommons.createSubsidiaries(entity.subsidiaries) : [];
			this.subsidiaries = entity.subsidiaries != null && entity.subsidiaries.length > 0 ? AppCommons.createSubsidiaries(entity.subsidiaries) : [];
			organisation.description = entity.description != null && entity.description != undefined ? entity.description : appConstants.missingDescription;
		} else {
			this.alertService.error(appConstants.blankOrganisation);
		}

		this.entity = organisation;
		if (!this.entity.claimed) {
			this.claimed = false;
		}
	}

	/**
	 * @desc Initiates the profile claim procedure
	 * @author dubdabasoduba
	 */
	claimProfile() {
		if (this.commons.isObjectEmpty(this.authService.getCurrentUser())) {
			if (this.entity != null) {
				const userData = {
					userName: this.entity.name,
					email: this.commons.getDefaultEmail(this.entity.contacts),
					userType: false,
					id: this.entity.id
				};

				if (this.commons.isObjectEmpty(userData)) {
					this.alertService.error(appConstants.userDataMissingError);
				} else {
					this.loading = true;
					this.claimService.initiateClaim(userData).subscribe(
						data => {
							this.alertService.success(data);
							this.loading = false;
						},
						error => {
							this.alertService.error(error);
							this.loading = false;
						}
					);
				}
			}
		} else {
			this.alertService.error(
				'Your are already authenticated. You cannot claim a profile with an already authenticated account');
		}
	}

	private getEntityInformation() {
		this.route.params.subscribe(params => {
			this.entityId = params[appConstants.id];
		});

		if (this.entityId !== null) {
			this.getCompany();
			this.getInvestment();
			this.getInvestors();
			this.getAcquisition();
			this.getFounders();

			if (!this.commons.isObjectEmpty(this.authService.getCurrentUser()) && this.entityId ===
				this.authService.getCurrentUser().entityId) {
				this.showEditButtons = true;
			}
		}
	}

	private resetEntries() {
		this.loading = false;
		this.entity = new Entity();
		this.investments = [];
		this.acquisitions = [];
		this.investors = [];
		this.founders = [];
		this.industry = [];
		this.social_media = [];
		this.contacts = [];
		this.subsidiaries = [];
		this.entityId = null;
		this.pitch_video = null;
		this.categories = [];
		this.showEditButtons = false;
		this.claimed = true;
		this.display = true;
	}

	private getFounders() {
		this.loading = true;
		if (this.founders.length <= 0) {
			this.founderService.getEntityFounders(this.entityId).subscribe(
				data => {
					this.createFounderDisplay(data);
					this.loading = false;
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				}
			);
		}
	}

	private getInvestment() {
		this.loading = true;
		this.fundingService.getInvestment(this.entityId, appConstants.entity).subscribe(
			data => {
				this.createInvestments(data);
				this.loading = false;
			}, error => {
				this.loading = false;
			}
		);
	}

	private getAcquisition() {
		this.loading = true;
		this.acquisitionService.getInvestments(this.entityId, appConstants.entity).subscribe(
			data => {
				this.createAcquisitions(data);
				this.loading = false;
			}, error => {
				this.loading = false;
			}
		);
	}

	private getInvestors() {
		this.loading = true;
		this.fundingService.getInvestors(this.entityId).subscribe(
			data => {
				this.createInvestors(data);
				this.loading = false;
			}, error => {
				this.loading = false;
			}
		);
	}

	private createInvestments(fundings: any) {
		if (fundings.length > 0) {
			this.investments = AppCommons.createInvestments(fundings);
		}
	}

	private createAcquisitions(acquisitions: any) {
		if (acquisitions.length > 0) {
			this.acquisitions = AppCommons.getAcquisitions(acquisitions);
		}
	}

	private createInvestors(investors: any) {
		if (investors.length > 0) {
			this.investors = AppCommons.createFunding(investors);
		}
	}

	/**
	 * @desc Creates the founders object
	 * @param founders {@link Array}
	 * @author dubdabasoduba
	 */
	private createFounderDisplay(founders: any) {
		if (founders.length > 0) {
			founders.forEach((founder) => {
				const entityFounder = founder.entityFounders;
				if (this.commons.isObjectEmpty(entityFounder.person)) {
					this.founders.push(this.commons.createFounder(founder, entityFounder.entity, false));
				} else {
					this.founders.push(this.commons.createFounder(founder, entityFounder.person, true));
				}
			});
		}
	}
}
