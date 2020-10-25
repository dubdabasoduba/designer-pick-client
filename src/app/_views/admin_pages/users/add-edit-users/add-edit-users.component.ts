import {Component, DoCheck, OnInit} from '@angular/core';
import {Permissions, Person, Roles} from "../../../../_models";
import {
    AlertService,
    AuthenticationService,
    PermissionsService, PersonsService,
    RolesService
} from "../../../../_services";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {appConstants} from "../../../../_helpers/app.constants";
import {AppCommons} from "../../../../_helpers/app.commons";

@Component({
    selector: 'app-add-edit-users',
    templateUrl: './add-edit-users.component.html',
    styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent implements OnInit, DoCheck {
    loading = false;
    public model = {
        name: "",
        username: "",
        email: "",
        dob: "",
        gender: "",
        account_type: "",
        is_active: ""
    };
    public personId: string;
    mySubscription: any;
    loggedInUser: string;
    person: Person;
    public permissions: Array<Permissions> = [];
    public assignedPermissions: Array<Permissions> = [];

    constructor(
        private permissionsService: PermissionsService,
        private rolesService: RolesService,
        private personsService: PersonsService,
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
            this.personId = params[appConstants.id];
        });
        this.getPermissions();
        if (!AppCommons.isStringEmpty(this.personId)) {
            this.getRole();
            this.getRolePermissions();
        }
        this.loggedInUser = this.authenticationService.getCurrentUser().uuid;
    }


    ngDoCheck() {
        this.removeAlreadyAssignedPermissions();
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    addEditUser() {
        this.loading = false;
        if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
            this.alertService.error(appConstants.nameError);
        } else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
            this.alertService.error(appConstants.statusError);
        } else {
            if (!AppCommons.isStringEmpty(this.personId)) {
                this.updateUser();
            } else {
                this.addUser();
            }
        }
    }

    private updateUser() {
        this.loading = true;
        this.rolesService.updateRole(this.createUser()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/users');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private addUser() {
        this.loading = true;
        this.rolesService.addRole(this.createUser()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/users');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private createUser() {
        let roles = new Roles();
        if (!AppCommons.isStringEmpty(this.personId)) {
            roles = this.person;
            roles.updated_by = this.loggedInUser;
        } else {
            roles.created_by = this.loggedInUser;
        }
        roles.name = this.model.name;
        roles.description = this.model.description;
        roles.is_active = Number(this.model.is_active);
        roles.permissions = this.createRolePermissions();
        return roles;
    }

    private createRolePermissions() {
        let permissions = "";
        for (let permission of this.assignedPermissions) {
            permissions += permission.uuid + ",";
        }

        return permissions.trim().replace(/,\s*$/, ""); //removes a trailing comma;
    }

    private getRole() {
        this.loading = true;
        this.rolesService.getRole(this.personId).subscribe(
            data => {
                this.person = data;
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
        this.rolesService.getRolePermissions(this.personId).subscribe(
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

    private removeAlreadyAssignedPermissions() {
        for (let i = 0; i < this.assignedPermissions.length; i++) {
            for (let j = 0; j < this.permissions.length; j++) {
                if (this.permissions[j].uuid === this.assignedPermissions[i].uuid) {
                    this.permissions.splice(j, 1);
                }
            }
        }
    }

    private formatPermissions(data: any) {
        let permissions: Array<Permissions> = [];
        for (let i = 0; i < data.length; i++) {
            let permission = new Permissions();
            permission.name = data[i].name;
            permission.uuid = data[i].uuid;
            permissions.push(permission);
        }

        return permissions
    }

    assignPermissions(permission: string) {
        for (let i = 0; i < this.permissions.length; i++) {
            if (permission === this.permissions[i].uuid) {
                this.assignedPermissions.push(this.permissions[i])
                this.permissions.splice(i, 1);
                break;
            }
        }
    }

    unAssignPermissions(permission: string) {
        for (let i = 0; i < this.assignedPermissions.length; i++) {
            if (permission === this.assignedPermissions[i].uuid) {
                this.permissions.push(this.assignedPermissions[i])
                this.assignedPermissions.splice(i, 1);
                break;
            }
        }
    }
}
