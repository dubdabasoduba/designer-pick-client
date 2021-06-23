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
    LogoBriefsService,
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
    public model = {
        industry: "",
        country: "",
        business_name: "",
        business_slogan: "",
        business_description: "",
        comm_point_one: "",
        comm_point_two: "",
        comm_point_three: "",
        target_audience: "",
        style: "",
        startDate: "",
        endDate: "",
        amount: "",
        is_private: "",
        is_featured: "",
        is_highlighted: "",
        tv: "",
        signs: "",
        website: "",
        branding: "",
        print: ""
    };
    public logoBrief: LogoBriefModel;
    public logoBriefs: Array<LogoBriefModel> = []
    public countries: Array<CountryModel> = []
    public industries: Array<CategoryModel> = []
    public logoUses: Array<LogoUsesModel> = []
    public contestId: string;

    constructor(
        private authenticationService: AuthenticationService, private contestsService: ContestsService,
        private countryService: CountriesService, private industryService: CategoryService,
        private logoUsesService: LogoUsesService, private logoBriefService: LogoBriefsService,
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
        this.logoBriefService.getUserLogoBriefs(this.lbsUser.user.uuid).subscribe(
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

    getLogoBriefs(event: any) {
        let logoBriefUuid = event.target.value;
        if (logoBriefUuid != null && !AppCommons.isStringEmpty(logoBriefUuid)) {
            this.getLogoBrief(logoBriefUuid);
        }
    }

    private getLogoBrief(logoBriefUuid: string) {
        this.loading = true;
        this.logoBriefService.getLogoBriefById(logoBriefUuid).subscribe(
            data => {
                // @ts-ignore
                this.logoBrief = data;
                this.assignLogoBrief();
                this.loading = true;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private assignLogoBrief() {
        this.model.business_name = this.logoBrief.business_name;
        this.model.business_slogan = this.logoBrief.slogan;
        this.model.business_description = this.logoBrief.business_description;
        this.model.industry = this.logoBrief.industry;
        this.model.country = this.logoBrief.country;
        this.model.target_audience = this.logoBrief.target_audience;
        this.updateCommSection();
    }

    private updateCommSection() {
        let comms = this.logoBrief.main_communication_points.split(';');
        if (comms != undefined && comms.length > 0) {
            if (comms.length > 2) {
                this.model.comm_point_three = comms[2];
                this.model.comm_point_two = comms[1];
                this.model.comm_point_one = comms[0];
            } else if (comms.length > 2) {
                this.model.comm_point_two = comms[1];
                this.model.comm_point_one = comms[0];
            } else {
                this.model.comm_point_one = comms[0];
            }
        }
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
