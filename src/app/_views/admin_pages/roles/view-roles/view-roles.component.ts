import {Component, OnInit} from '@angular/core';
import {RolesModel} from "../../../../_models";
import {AlertService, RolesService} from "../../../../_services";
import {AppCommons, appConstants} from "../../../../_helpers";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-view-roles',
    templateUrl: './view-roles.component.html',
    styleUrls: ['./view-roles.component.css']
})
export class ViewRolesComponent implements OnInit {
    loading = false;
    public role: RolesModel = new RolesModel();
    public rolePermissions = [];
    public roleId: string;

    constructor(private rolesService: RolesService, private alertService: AlertService,
                private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.roleId = params[appConstants.id];
        });
        if (this.roleId !== undefined && !AppCommons.isStringEmpty(this.roleId)) {
            this.getRole();
            this.getRolePermissions();
        } else {
            this.router.navigateByUrl('/roles');
        }
    }

    removeRole(id: string) {
        if (confirm("Are you sure you want to delete this role?")) {
            this.loading = true;
            this.rolesService.removeRole(id).subscribe(
                data => {
                    this.router.navigateByUrl('/roles');
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
        }
    }

    private getRole() {
        this.loading = true;
        this.rolesService.getRole(this.roleId).subscribe(
            data => {
                if (data === null || data === undefined) {
                    this.router.navigateByUrl('/roles');
                } else {
                    this.role = data;
                    this.role.date_created = AppCommons.formatDisplayDate(new Date(data.date_created));
                    this.role.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data.date_updated));
                    // @ts-ignore
                    this.role.is_active = data.is_active;
                    this.loading = false;
                }
            },
            error => {
                this.alertService.error(error);
                this.router.navigateByUrl('/roles');
                this.loading = false;
            }
        );
    }

    private getRolePermissions() {
        this.loading = true;
        this.rolesService.getRolePermissions(this.roleId).subscribe(
            data => {
                // @ts-ignore
                this.rolePermissions = data;
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }
}
