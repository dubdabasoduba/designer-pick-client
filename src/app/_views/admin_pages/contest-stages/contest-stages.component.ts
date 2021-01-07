import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContestStageModel} from "../../../_models";
import {AlertService, AuthenticationService, ContestStagesService} from "../../../_services";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AppCommons, appConstants} from "../../../_helpers";

@Component({
    selector: 'app-contest-stages',
    templateUrl: './contest-stages.component.html',
    styleUrls: ['./contest-stages.component.css']
})
export class ContestStagesComponent implements OnInit, OnDestroy {
    loading = false;
    public contestStages: Array<ContestStageModel> = [];
    public model = {
        name: "",
        description: "",
        is_active: "",
    };
    public contestStageId: string;
    mySubscription: any;
    contestStage = new ContestStageModel();
    loggedInUser: string;

    constructor(
        private contestStagesService: ContestStagesService, private alertService: AlertService,
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
            this.contestStageId = params[appConstants.id];
        });
        this.getContestStages();
        this.resetModel();
        if (!AppCommons.isStringEmpty(this.contestStageId)) {
            this.getContestStage();
        }
        this.loggedInUser = this.authenticationService.getCurrentUser().user.uuid;
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    addEditContestStage() {
        this.loading = false;
        if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
            this.alertService.error(appConstants.nameError);
        } else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
            this.alertService.error(appConstants.statusError);
        } else {
            if (AppCommons.isStringEmpty(this.contestStageId)) {
                this.addContestStage();
            } else {
                this.updateContestStage();
            }
        }
    }

    removeContestStage(contestStageId: string) {
        if (confirm("Are you sure you want to delete this contest stage?")) {
            this.loading = true;
            this.contestStagesService.removeContentsStage(contestStageId).subscribe(
                data => {
                    this.router.navigateByUrl('/contest-stages');
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
        }
    }

    /**
     * Get the given contest stages
     */
    private getContestStages() {
        this.loading = true;
        this.contestStagesService.getContentsStages().subscribe(
            data => {
                this.formatContestStages(data);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    /**
     * Get a specific contest stage
     * @private
     */
    private getContestStage() {
        this.loading = true;
        this.contestStagesService.getContentsStage(this.contestStageId).subscribe(
            data => {
                this.contestStage = data;
                this.loading = false;
                this.populateModel(data)
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private createContestStage() {
        let contestStage = new ContestStageModel();
        if (AppCommons.isStringEmpty(this.contestStageId)) {
            contestStage.created_by = this.loggedInUser;
        } else {
            contestStage = this.contestStage;
            contestStage.updated_by = this.loggedInUser;
        }
        contestStage.name = this.model.name;
        contestStage.description = this.model.description;
        contestStage.is_active = Number(this.model.is_active);

        return contestStage;
    }

    private addContestStage() {
        this.loading = true;
        this.contestStagesService.addContentsStage(this.createContestStage()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/contest-stages');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private updateContestStage() {
        this.loading = true;
        this.contestStagesService.updateContentsStage(this.createContestStage()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/contest-stages');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private populateModel(data: any) {
        this.model.name = data.name;
        this.model.description = data.description;
        // @ts-ignore
        this.model.is_active = data.is_active === 1 ? true : false;
    }

    private resetModel() {
        this.model.name = appConstants.emptyEntry;
        this.model.description = appConstants.emptyEntry;
        this.model.is_active = appConstants.emptyEntry;
    }

    private formatContestStages(data: any) {
        this.contestStages = [];
        for (let i = 0; i < data.length; i++) {
            let contestStage = new ContestStageModel();
            contestStage.name = data[i].name;
            contestStage.description = data[i].description;
            contestStage.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
            contestStage.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
            contestStage.is_active = data[i].is_active;
            contestStage.uuid = data[i].uuid;
            this.contestStages.push(contestStage);
        }
    }
}
