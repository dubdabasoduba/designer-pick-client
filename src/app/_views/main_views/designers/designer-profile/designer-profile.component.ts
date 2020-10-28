import {Component, OnInit} from '@angular/core';
import {appConstants} from "../../../../_helpers/app.constants";
import {
    AlertService,
    AuthenticationService,
    PersonsService,
    ProfileService
} from "../../../../_services";
import {AppCommons} from "../../../../_helpers/app.commons";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-designer-profile',
    templateUrl: './designer-profile.component.html',
    styleUrls: ['./designer-profile.component.css']
})
export class DesignerProfileComponent implements OnInit {
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
        this.personService.getDesignerById(this.personUuid).subscribe(
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
