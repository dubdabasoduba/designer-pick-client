/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {Entity, Person, Socialmedia, User} from '../../../_models';
import {AlertService, AuthenticationService, EntitiesService, PersonsService, SocialService} from '../../../_services';
import {appConstants} from '../../../_helpers/app.constants';
import {AppCommons} from '../../../_helpers/app.commons';
import {ResponseModel} from '../../../_models/response.model';

@Component({
	selector: 'app-social-media',
	templateUrl: './social-media.component.html',
	styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {
	loading = false;
	public socialMedia = [];
	public socialLinks: any = [];
	public entityName: string;
	public socialMediaId: string;
	public model: any = {};
	private lbsUser: User;
	private entityId: string;
	private type: boolean;
	private entity: any;
	private responseModel = new ResponseModel();

	constructor(
		private entitiesService: EntitiesService,
		private personService: PersonsService,
		private socialMediaService: SocialService,
		private alertService: AlertService,
		private authService: AuthenticationService) {
	}

	ngOnInit() {
		this.setEmptyModel();
		this.lbsUser = this.authService.getCurrentUser();
		if (this.lbsUser != null) {
			this.entityId = this.lbsUser.uuid;
			this.type = Boolean(this.lbsUser.type);
		}

		if (this.entityId != null) {
			this.getEntityDetails();
		}

		this.getSocialLinks();
	}

	getEntityDetails() {
		if (this.type) {
			this.fetchPerson(this.entityId);
		} else {
			this.fetchEntity(this.entityId);
		}
	}

	fetchEntity(entityId: string) {
		this.loading = true;
		this.entitiesService.getEntityById(entityId).subscribe(
			data => {
				this.fetchSocialMedia(data);
				this.entity = data;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	fetchPerson(personId: string) {
		this.loading = true;
		this.personService.getPersonById(personId).subscribe(
			data => {
				this.fetchSocialMedia(data);
				this.entity = data;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	fetchSocialMedia(entity: any) {
		if (entity != null) {
			this.entityName = entity.name;
			const social_media = entity.social_media;
			social_media.forEach(social => {
				const socialLink = new Socialmedia();
				socialLink._id = social._id;
				socialLink.link_type = social.link_type.name;
				socialLink.link_id = social.link_type._id;
				socialLink.display = social.display;
				socialLink.link = social.link;

				this.socialMedia.push(socialLink);
			});
		}
	}

	addEditSocialMedia() {
		this.loading = false;
		if (this.model.link_type == appConstants.emptyEntry || this.model.link_type == undefined) {
			this.alertService.error(appConstants.linkTypeError);
		} else if (this.model.display == appConstants.emptyEntry || this.model.display == undefined) {
			this.alertService.error(appConstants.socialDisplayError);
		} else if (this.model.link == appConstants.emptyEntry || this.model.link == undefined) {
			this.alertService.error(appConstants.socialLinkError);
		} else {
			if (this.type) {
				const person = AppCommons.createPersonObject(this.entity, this.entityId);
				person.social_media = this.createSocialLinks(this.entity.social_media);
				person.user = this.authService.getCurrentUser().uuid;
				this.updatePerson(person, false);
			} else {
				const entity = AppCommons.createEntityObject(this.entity, this.entityId);
				entity.social_media = this.createSocialLinks(this.entity.social_media);
				entity.user = this.authService.getCurrentUser().uuid;
				this.updateEntity(entity, false);
			}

		}
	}

	removeSocialMediaLink(link: any) {
		this.loading = true;
		let entity;
		entity = this.type ? AppCommons.createPersonObject(this.entity, this.entityId) : AppCommons.createEntityObject(this.entity,
			this.entityId);
		entity.user = this.authService.getCurrentUser().uuid;

		for (let i = 0; i < entity.social_media.length; i++) {
			if (entity.social_media[i]._id == link._id) {
				entity.social_media.splice(i, 1);
			}
		}

		if (this.type) {
			this.updatePerson(entity, false);
		} else {
			this.updateEntity(entity, false);
		}
	}

	editSocialMedia(link: any) {
		this.socialMediaId = link._id;
		this.model.id = link._id;
		this.model.link_type = link.link_id;
		this.model.display = link.display;
		this.model.link = link.link;
	}

	private getSocialLinks() {
		this.loading = true;
		this.socialMediaService.getSocialLinks().subscribe(
			data => {
				// @ts-ignore
				this.responseModel = data;
				this.socialLinks = this.responseModel.results;
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private setEmptyModel() {
		this.model.id = appConstants.emptyEntry;
		this.model.link_type = appConstants.emptyEntry;
		this.model.display = appConstants.emptyEntry;
		this.model.link = appConstants.emptyEntry;
	}

	private updateEntity(entity: Entity, type: boolean) {
		this.loading = true;
		this.entitiesService.updateEntity(entity).subscribe(
			data => {
				if (!type) {
					this.alertService.success(appConstants.socialMediaAdditionSuccess);
				}
				this.getEntityDetails();
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private updatePerson(person: Person, type: boolean) {
		this.loading = true;
		this.personService.updatePerson(person).subscribe(
			data => {
				if (!type) {
					this.alertService.success(appConstants.socialMediaAdditionSuccess);
				}
				this.getEntityDetails();
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private createSocialLinks(socialLinks: any[] | any) {
		if (socialLinks.length <= 0) {
			this.createSocialLinksObject(socialLinks);
		} else {
			if (this.socialMediaId != null || this.socialMediaId != undefined) {
				for (let i = 0; i < socialLinks.length; i++) {
					if (this.socialMediaId == socialLinks[i]._id) {
						socialLinks[i].link_type = this.model.link_type;
						socialLinks[i].display = this.model.display;
						socialLinks[i].link = this.model.link;
					}
				}
			} else {
				this.createSocialLinksObject(socialLinks);
			}
		}

		return socialLinks;
	}

	private createSocialLinksObject(socialLinks: any) {
		const social = new Socialmedia();
		social.link_type = this.model.link_type;
		social.display = this.model.display;
		social.link = this.model.link;
		socialLinks.push(social);
	}
}
