/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService, AuthenticationService, PermissionsService} from '../../../_services';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppCommons, appConstants} from '../../../_helpers';
import {PermissionModel} from "../../../_models";

@Component({
    selector: 'app-countries',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit, OnDestroy {
    loading = false;
    public permissions: Array<PermissionModel> = [];
    public model = {
        name: "",
        description: "",
        is_active: ""
    };
    public permissionId: string;
    mySubscription: any;
    loggedInUser: string;
    permission: PermissionModel;

    constructor(
        private permissionsService: PermissionsService,
        private alertService: AlertService,
        private route: ActivatedRoute, private router: Router,
        private authenticationService: AuthenticationService) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
            }
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.permissionId = params[appConstants.id];
        });
        this.getPermissions();
        if (!AppCommons.isStringEmpty(this.permissionId)) {
            this.getPermission();
        }
        this.loggedInUser = this.authenticationService.getCurrentUser().user.uuid;
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    /**
     * Validates the entries before performing an update
     */
    editCPermission() {
        this.loading = false;
        if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
            this.alertService.error(appConstants.nameError);
        } else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
            this.alertService.error(appConstants.statusError);
        } else {
            if (!AppCommons.isStringEmpty(this.permissionId)) {
                this.updatePermission();
            }
        }
    }

    formatPermissions(data: any) {
        for (let i = 0; i < data.length; i++) {
            let permission = new PermissionModel();
            permission.name = data[i].name;
            permission.description = data[i].description;
            permission.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
            permission.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
            permission.is_active = data[i].is_active;
            permission.uuid = data[i].uuid;
            this.permissions.push(permission);
        }
    }

    /**
     * Performs the permission update
     * @private
     */
    private updatePermission() {
        this.loading = true;
        this.permissionsService.updatePermission(this.createPermission()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/permissions');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    /**
     * Creates the permission object from the model
     * @private
     */
    private createPermission() {
        let permission = this.permission;
        permission.updated_by = this.loggedInUser;
        permission.name = this.model.name;
        permission.description = this.model.description;
        permission.is_active = Number(this.model.is_active);

        return permission;
    }

    /**
     * Get the permissions in the system
     */
    private getPermissions() {
        this.loading = true;
        this.permissionsService.getPermissions().subscribe(
            data => {
                this.formatPermissions(data);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    /**
     * Gets a specific permission using it's uuid
     * @private
     */
    private getPermission() {
        this.loading = true;
        this.permissionsService.getPermission(this.permissionId).subscribe(
            data => {
                this.permission = data;
                this.loading = false;
                this.populateModel(data)
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private populateModel(data: any) {
        this.model.name = data.name;
        this.model.description = data.description;
        // @ts-ignore
        this.model.is_active = data.is_active === 1 ? true : false;
    }
}
