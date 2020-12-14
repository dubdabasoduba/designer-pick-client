import {Component, OnInit} from '@angular/core';
import {PermissionModel, PersonModel} from "../../../../_models";
import {
    AlertService,
    AuthenticationService,
    PermissionsService,
    PersonsService,
    RolesService
} from "../../../../_services";
import {ActivatedRoute, Router} from "@angular/router";
import {appConstants} from "../../../../_helpers/app.constants";
import {AppCommons} from "../../../../_helpers/app.commons";

@Component({
    selector: 'app-add-edit-users',
    templateUrl: './add-edit-users.component.html',
    styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent implements OnInit {
    loading = false;
    public model = {
        name: "",
        username: "",
        email: "",
        phone_number: "",
        account_type: "",
        is_active: ""
    };
    public personId: string;
    loggedInUser: string;
    person: PersonModel;
    public permissions: Array<PermissionModel> = [];
    public assignedPermissions: Array<PermissionModel> = [];

    constructor(
        private permissionsService: PermissionsService,
        private rolesService: RolesService,
        private personsService: PersonsService,
        private alertService: AlertService,
        private route: ActivatedRoute, private router: Router,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.personId = params[appConstants.id];
        });
        if (!AppCommons.isStringEmpty(this.personId)) {
            this.getPerson();
        }
        this.loggedInUser = this.authenticationService.getCurrentUser().user.uuid;
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

    redirectToAssignRolesPage(person: PersonModel) {
        if (!AppCommons.isStringEmpty(person.user_uuid)) {
            this.router.navigateByUrl('/users/assign-roles/' + person.uuid + "/" + person.user_uuid);
        } else {
            this.router.navigateByUrl('/users');
        }
    }

    private updateUser() {
        this.loading = true;
        this.personsService.updatePerson(this.createUser()).subscribe(
            data => {
                this.loading = false;
                this.redirectToAssignRolesPage(data);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private addUser() {
        this.loading = true;
        this.personsService.addPerson(this.createUser()).subscribe(
            data => {
                this.loading = false;
                this.redirectToAssignRolesPage(data);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private createUser() {
        let person = new PersonModel();
        if (!AppCommons.isStringEmpty(this.personId)) {
            person = this.person;
            person.updated_by = this.loggedInUser;
        } else {
            person.update_on_first_login = 1;
            person.created_by = this.loggedInUser;
        }
        person.name = this.model.name;
        person.username = this.model.username;
        person.is_active = Number(this.model.is_active);
        person.email = this.model.email;
        person.account_type = this.model.account_type;
        return person;
    }

    private getPerson() {
        this.loading = true;
        this.personsService.getPersonById(this.personId).subscribe(
            data => {
                this.person = data[0];
                this.loading = false;
                this.populateModel(data[0])
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private populateModel(data: any) {
        this.model.name = data.name;
        this.model.username = data.username;
        this.model.email = data.email;
        this.model.account_type = data.account_type;
        // @ts-ignore
        this.model.is_active = data.is_active;
    }
}
