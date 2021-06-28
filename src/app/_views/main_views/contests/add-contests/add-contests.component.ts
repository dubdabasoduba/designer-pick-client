import {Component, OnInit} from '@angular/core';
import {
    AuthenticatedUserModel,
    CategoryModel,
    ContestModel,
    CountryModel,
    LogoBriefModel,
    SettingsModel
} from "../../../../_models";
import {
    AlertService,
    AuthenticationService,
    CategoryService,
    ContestsService,
    CountriesService,
    LogoBriefsService,
    LogoUsesService,
    SettingsService
} from "../../../../_services";
import {AppCommons, appConstants} from "../../../../_helpers";
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
    public contestUuid: string;
    public model = {
        industry: "",
        country: "",
        title: "",
        business_name: "",
        business_slogan: "",
        business_description: "",
        comm_point_one: "",
        comm_point_two: "",
        comm_point_three: "",
        target_audience: "",
        style: "",
        start_date: "",
        end_date: "",
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
    public contestId: string;
    settings: Array<SettingsModel> = []
    selectedLogoBriefId: string;
    newContest: ContestModel;

    constructor(
        private authenticationService: AuthenticationService, private contestsService: ContestsService,
        private countryService: CountriesService, private industryService: CategoryService,
        private logoUsesService: LogoUsesService, private logoBriefService: LogoBriefsService,
        private commons: AppCommons, private settingsService: SettingsService,
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
        this.getSettings();
    }

    addContest() {
        if (AppCommons.isStringEmpty(this.model.title)) {
            this.alertService.error('Contest title is required');
        } else if (AppCommons.isStringEmpty(this.model.business_name)) {
            this.alertService.error('Business name is required');
        } else if (AppCommons.isStringEmpty(this.model.business_slogan)) {
            this.alertService.error('Business slogan is required');
        } else if (AppCommons.isStringEmpty(this.model.business_description)) {
            this.alertService.error('Business Description is required');
        } else if (AppCommons.isStringEmpty(this.model.industry)) {
            this.alertService.error('Industry is required');
        } else if (AppCommons.isStringEmpty(this.model.country)) {
            this.alertService.error('Country is required');
        } else if (AppCommons.isStringEmpty(this.model.target_audience)) {
            this.alertService.error('Target audience is required');
        } else if (AppCommons.isStringEmpty(this.model.comm_point_one)) {
            this.alertService.error('Communication Point One is required');
        } else if (AppCommons.isStringEmpty(this.model.comm_point_two)) {
            this.alertService.error('Communication Point Two is required');
        } else if (AppCommons.isStringEmpty(this.model.comm_point_three)) {
            this.alertService.error('Communication Point Three is required');
        } else if (AppCommons.isStringEmpty(this.model.start_date)) {
            this.alertService.error('Contest start date is required');
        } else if (AppCommons.isStringEmpty(this.model.end_date)) {
            this.alertService.error('contest end date is required');
        } else if (AppCommons.isStringEmpty(this.model.amount)) {
            this.alertService.error('Contest Amount is required');
        } else if (AppCommons.isStringEmpty(this.model.style)) {
            this.alertService.error('Contest style is required');
        } else {
            let logoBrief = this.createLogoUsesPayload();
            this.newContest = this.createContestPayload();

            if (!AppCommons.isStringEmpty(logoBrief.uuid)) {
                this.updateLogoBrief(logoBrief);
            } else {
                this.createLogoBrief(logoBrief);
            }
        }
    }

    private completeContest(logoBriefUuid: string) {
        if (!AppCommons.isStringEmpty(logoBriefUuid)) {
            this.newContest.logo_brief = logoBriefUuid;
            if (!AppCommons.isStringEmpty(this.newContest.uuid)) {
                this.updateContest(this.newContest);
            } else {
                this.createContest(this.newContest);
            }
        } else {
            this.alertService.error("Error occurred! Please contact system administrator");
        }
    }

    private createContest(contest: ContestModel) {
        this.loading = true;
        this.contestsService.addContest(contest).subscribe(
            data => {
                // @ts-ignore
                this.loading = false;
                AppCommons.displaySingleContest(this.router, data.uuid, "draft",this.router.url);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private createLogoBrief(logoBrief: LogoBriefModel) {
        this.loading = true;
        this.logoBriefService.addLogoBrief(logoBrief).subscribe(
            data => {
                // @ts-ignore
                this.completeContest(data.uuid);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private updateContest(contest: ContestModel) {
        this.loading = true;
        this.contestsService.updateContest(contest).subscribe(
            data => {
                // @ts-ignore
                this.loading = false;
                AppCommons.displaySingleContest(this.router, data.uuid, "draft",this.router.url);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private updateLogoBrief(logoBrief: LogoBriefModel) {
        this.loading = true;
        this.logoBriefService.updateLogoBrief(logoBrief).subscribe(
            data => {
                // @ts-ignore
                this.completeContest(data.uuid);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private createLogoUsesPayload() {
        let logoBriefs = new LogoBriefModel();
        if (!AppCommons.isStringEmpty(this.selectedLogoBriefId)) {
            logoBriefs.uuid = this.selectedLogoBriefId;
            logoBriefs.updated_by = this.lbsUser.user.uuid;
        } else {
            logoBriefs.created_by = this.lbsUser.user.uuid;
        }
        logoBriefs.business_name = this.model.business_name;
        logoBriefs.slogan = this.model.business_slogan;
        logoBriefs.business_description = this.model.business_description;
        logoBriefs.industry = this.model.industry;
        logoBriefs.country = this.model.country;
        logoBriefs.target_audience = this.model.target_audience;
        logoBriefs.main_communication_points = this.combineMainCommunicationPoints();

        return logoBriefs;
    }


    private combineMainCommunicationPoints() {
        let mainCommunicationPoints = "";
        if (!AppCommons.isStringEmpty(this.model.comm_point_one)) {
            mainCommunicationPoints += this.model.comm_point_one + ";"
        }
        if (!AppCommons.isStringEmpty(this.model.comm_point_two)) {
            mainCommunicationPoints += this.model.comm_point_two + ";"
        }
        if (!AppCommons.isStringEmpty(this.model.comm_point_three)) {
            mainCommunicationPoints += this.model.comm_point_three
        }

        return mainCommunicationPoints;
    }

    private createContestPayload() {
        let contest = new ContestModel();
        if (!AppCommons.isStringEmpty(this.contestUuid)) {
            contest.uuid = this.contestUuid;
            contest.updated_by = this.lbsUser.user.uuid;
        } else {
            contest.created_by = this.lbsUser.user.uuid;
        }

        contest.style = this.model.style;
        contest.start_date = this.model.start_date;
        contest.end_date = this.model.end_date;
        contest.is_featured = !!this.model.is_featured;
        contest.is_featured_charged_amount = this.getSettingValue(appConstants.featuring_amount)
        contest.is_highlighted = !!this.model.is_highlighted;
        contest.is_highlighted_amount_charged = this.getSettingValue(appConstants.highlight_amount)
        contest.is_private = !!this.model.is_private;
        contest.is_private_amount_charged = this.getSettingValue(appConstants.private_listing_amount)
        contest.is_active = 0;
        contest.stage = this.getSettingValue(appConstants.contest_stage);
        contest.amount = this.model.amount;
        contest.title = this.model.title;
        contest.logo_uses = this.combineLogoUses();

        return contest;
    }

    private combineLogoUses() {
        let logoUse: string = "";
        if (this.model.tv) {
            logoUse += "TV, "
        }
        if (this.model.branding) {
            logoUse += "Branding, "
        }
        if (this.model.signs) {
            logoUse += "Signs, "
        }
        if (this.model.website) {
            logoUse += "website, "
        }
        if (this.model.print) {
            logoUse += "Print,"
        }

        return logoUse;
    }

    /**
     * Get the value a certain setting based on the entered setting key
     * @param setting_key
     * @private
     */
    private getSettingValue(setting_key: string): any {
        let value: string = "";
        for (let i = 0; i < this.settings.length; i++) {
            let selectedSetting = this.settings[i];
            if (selectedSetting.setting_key == setting_key) {
                // @ts-ignore
                let settingsValue = JSON.parse(selectedSetting.setting_value);
                return value = settingsValue.settings.value;
            }
        }
    }

    /**
     * Loads all the logo briefs created by a specific user.
     * @private
     */
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

    /**
     * Gets the select logo brief from the selection event
     * @param event
     */
    getLogoBriefs(event: any) {
        let logoBriefUuid = event.target.value;
        if (logoBriefUuid != null && !AppCommons.isStringEmpty(logoBriefUuid)) {
            this.getLogoBrief(logoBriefUuid);
            this.selectedLogoBriefId = logoBriefUuid;
        }
    }

    /**
     * Gets a specific logo brief details from the server
     * @param logoBriefUuid:string
     * @private
     */
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

    /**
     * Assigns the selected logo brief to the model for display.
     * @private
     */
    private assignLogoBrief() {
        this.model.business_name = this.logoBrief.business_name;
        this.model.business_slogan = this.logoBrief.slogan;
        this.model.business_description = this.logoBrief.business_description;
        this.model.industry = this.logoBrief.industry;
        this.model.country = this.logoBrief.country;
        this.model.target_audience = this.logoBrief.target_audience;
        this.updateCommSection();
    }

    /**
     * Breaks down the main communication points into 3 sections.
     * @private
     */
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

    /**
     * Loads a list of the countries saved in the platform
     * @private
     */
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

    /**
     * gets all the contest categories in the system
     * @private
     */
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

    /**
     * Gets all the settings in the platform.
     * @private
     */
    private getSettings() {
        this.loading = true;
        this.settingsService.getSettings().subscribe(
            data => {
                this.settings = data;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }
}
