import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    AlertService,
    AuthenticationService,
    PermissionsService,
    RolesService
} from "../../../../_services";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {appConstants} from "../../../../_helpers/app.constants";
import {AppCommons} from "../../../../_helpers/app.commons";
import {Permissions, Roles} from "../../../../_models";

@Component({
    selector: 'app-add-edit-roles',
    templateUrl: './add-edit-roles.component.html',
    styleUrls: ['./add-edit-roles.component.css']
})
export class AddEditRolesComponent implements OnInit, OnDestroy {
    loading = false;
    public model = {
        name: "",
        description: "",
        is_active: ""
    };
    public roleId: string;
    mySubscription: any;
    loggedInUser: string;
    role: Roles;
    public permissions: Array<Permissions> = [];
    public assignedPermissions: Array<Permissions> = [];

    constructor(
        private permissionsService: PermissionsService,
        private rolesService: RolesService,
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

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.roleId = params[appConstants.id];
        });
        this.getPermissions();
        if (!AppCommons.isStringEmpty(this.roleId)) {
            this.getRole();
            this.getRolePermissions();
        }
        this.loggedInUser = this.authenticationService.getCurrentUser().uuid;
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    addEditRole() {
        this.loading = false;
        if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
            this.alertService.error(appConstants.nameError);
        } else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
            this.alertService.error(appConstants.statusError);
        } else {
            if (!AppCommons.isStringEmpty(this.roleId)) {
                this.updateRole();
            }
        }
    }

    private updateRole() {
        this.loading = true;
        this.rolesService.updateRole(this.createRole()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/roles');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private createRole() {
        let roles = this.role;
        roles.updated_by = this.loggedInUser;
        roles.name = this.model.name;
        roles.description = this.model.description;
        roles.is_active = this.model.is_active;

        return roles;
    }

    private getRole() {
        this.loading = true;
        this.rolesService.getRole(this.roleId).subscribe(
            data => {
                this.role = data;
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

    /**
     * Get the permissions in the system
     */
    private getPermissions() {
        this.loading = true;
        let searchQuery = "is_active=" + 1;
        this.permissionsService.getSearchPermissions(searchQuery).subscribe(
            data => {
                this.permissions = this.formatPermissions(data);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private getRolePermissions() {
        this.loading = true;
        this.rolesService.getRolePermissions(this.roleId).subscribe(
            data => {
                this.assignedPermissions = this.formatPermissions(data);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    formatPermissions(data: any) {
        let permissions: Array<Permissions> = [];
        for (let i = 0; i < data.length; i++) {
            let permission = new Permissions();
            permission.name = data[i].name;
            permission.uuid = data[i].uuid;
            permissions.push(permission);
        }

        return permissions
    }
}
