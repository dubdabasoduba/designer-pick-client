/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../_services';
import {AppCommons} from "../_helpers";

@Injectable({providedIn: 'root'})
export class PermissionsGuard implements CanActivate {
    PERMISSION = 'permission';

    constructor(private router: Router, private authService: AuthenticationService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let permissions = route.data[this.PERMISSION];
        if (this.authService.getCurrentUser() !== null && AppCommons.checkIfPermissionsExist(permissions, this.authService.getCurrentUser().auth.permissions)) {
            return true;
        } else {
            this.router.navigate(['']);
            return false;
        }
    }
}
