import {Component, OnInit} from '@angular/core';
import {
    AuthenticatedUserModel,
    CategoryModel,
    ContestModel,
    CountryModel,
    LogoBriefModel,
    LogoUsesModel
} from "../../../../_models";
import {
    AlertService,
    AuthenticationService,
    CategoryService,
    ContestsService,
    CountriesService,
    LogoUsesService
} from "../../../../_services";
import {AppCommons} from "../../../../_helpers";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-add-contests',
    templateUrl: './add-contests.component.html',
    styleUrls: ['./add-contests.component.css']
})
export class AddContestsComponent implements OnInit {
    loading = false;
    public contest: ContestModel;
    public returnUrl: string;
    lbsUser: AuthenticatedUserModel;
    public model = {};
    public logoBriefModel = {logo_brief: ""};
    public logoBriefs: Array<LogoBriefModel> = []
    public countries: Array<CountryModel> = []
    public industries: Array<CategoryModel> = []
    public logoUses: Array<LogoUsesModel> = []
    public contestId: string;

    constructor(
        private authenticationService: AuthenticationService, private contestsService: ContestsService,
        private countryService: CountriesService, private industryService: CategoryService,
        private logoUsesService: LogoUsesService,
        private commons: AppCommons,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.lbsUser = this.authenticationService.getCurrentUser();
        this.returnUrl = this.router.url;
        this.getUserLogoBriefs();
        this.getCountries();
        this.getCategories();
        this.getLogoUses();
    }

    addContest() {

    }

    updateLogoUses(uuid: string) {

    }

    private getUserLogoBriefs() {
        this.loading = true;
        this.contestsService.getLogoBriefs(this.lbsUser.user.uuid).subscribe(
            data => {
                // @ts-ignore
                this.logoBriefs = data
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private getCountries() {
        this.loading = true;
        this.countryService.getCountries().subscribe(
            data => {
                // @ts-ignore
                this.countries = data
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private getLogoUses() {
        this.loading = true;
        this.logoUsesService.getLogoUses().subscribe(
            data => {
                // @ts-ignore
                this.logoUses = data
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private getCategories() {
        this.loading = true;
        this.industryService.getCategories().subscribe(
            data => {
                // @ts-ignore
                this.industries = data
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }
}
