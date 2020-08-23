/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {User} from '../../_models';
import {AuthenticationService} from '../../_services';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	slimUser: User;

	constructor(
		private authenticationService: AuthenticationService) {
	}

	ngOnInit() {
		this.slimUser = this.authenticationService.getCurrentUser();
	}

}
