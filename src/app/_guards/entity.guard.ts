/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserModel} from '../_models';
import {AuthenticationService} from '../_services';

@Injectable({
	providedIn: 'root'
})
export class EntityGuard implements CanActivate {
	private user: UserModel;

	constructor(private router: Router, private authService: AuthenticationService) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		this.user = this.authService.getCurrentUser();
		if (this.user != null) {
			if (this.user.type) {
				this.changeRoute();
			} else {
				return true;
			}
		} else {
			this.changeRoute();
		}
	}

	private changeRoute() {
		this.router.navigate(['']);
		return false;
	}
}
