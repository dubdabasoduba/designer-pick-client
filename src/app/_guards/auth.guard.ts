/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../_services';
import {appConstants} from '../_helpers';

@Injectable({providedIn: 'root'})
export class AuthGuard  {
	constructor(private router: Router, private authService: AuthenticationService) {
	}
	
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		const lbsUser = this.authService.getCurrentUser();
		if (lbsUser != null) {
			if (lbsUser.auth.forceUpdate && !state.url.includes(appConstants.profileUpdateUrl)) {
				this.router.navigate([appConstants.profileUpdateUrl + lbsUser.user.uuid], {
					queryParams: {
						type: lbsUser.user.type,
						returnUrl: state.url
					}
				});
				return false;
			} else {
				return true;
			}
		} else {
			this.router.navigate([appConstants.authSIgnInUrl], {
				queryParams: {
					returnUrl: state.url
				}
			});
			return false;
		}
	}
}
