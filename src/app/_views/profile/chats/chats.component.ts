/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AppCommons, appConstants} from '../../../_helpers';
import {AlertService, AuthenticationService, PersonsService, ProfileService} from '../../../_services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'app-chats',
	templateUrl: './chats.component.html',
	styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
	public imageIcon = appConstants.defaultImageIcon;
	loading = false;
	public person: any;
	public personUuid: string;
	public returnUrl: string;
	
	constructor(
		private authenticationService: AuthenticationService,
		private profileService: ProfileService,
		private personService: PersonsService,
		private commons: AppCommons,
		private alertService: AlertService,
		private router: Router,
		private route: ActivatedRoute) {
	}
	
	ngOnInit() {
		this.route.params.subscribe(params => {
			this.personUuid = params[appConstants.id];
		});
		this.returnUrl = this.router.url;
		this.getPerson();
	}
	
	private getPerson() {
		this.loading = true;
		this.personService.getPersonById(this.personUuid).subscribe(
			data => {
				this.person = data[0];
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
}
