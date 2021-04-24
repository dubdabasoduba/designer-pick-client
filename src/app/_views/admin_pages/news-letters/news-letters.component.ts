import {Component, OnInit} from '@angular/core';
import {ApiKeyModel} from "../../../_models";
import {AlertService, ApiKeysService, AuthenticationService} from "../../../_services";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AppCommons, appConstants} from "../../../_helpers";

@Component({
    selector: 'app-news-letters',
    templateUrl: './news-letters.component.html',
    styleUrls: ['./news-letters.component.css']
})
export class NewsLettersComponent implements OnInit {
    loading = false;
    public apiKeys: Array<ApiKeyModel> = [];
    public model = {
        name: "",
        api_key: "",
        expiry: "",
        is_active: ""
    };
    public apiKeyId: string;
    mySubscription: any;
    apiKey = new ApiKeyModel();
    loggedInUser: string;

    constructor(private apiKeysService: ApiKeysService, private alertService: AlertService,
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
            this.apiKeyId = params[appConstants.id];
        });
        this.getApiKeys();
        this.resetModel();
        if (!AppCommons.isStringEmpty(this.apiKeyId)) {
            this.getApiKey();
        }
        this.loggedInUser = this.authenticationService.getCurrentUser().user.uuid;
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    addEditApiKey() {
        this.loading = false;
        if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
            this.alertService.error(appConstants.nameError);
        } else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
            this.alertService.error(appConstants.apiKeyError);
        } else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
            this.alertService.error(appConstants.statusError);
        } else {
            if (AppCommons.isStringEmpty(this.apiKeyId)) {
                this.addApiKey();
            } else {
                this.updateApiKey();
            }
        }
    }

    removeApiKey(apiKeyId: string) {
        if (confirm('Delete an API Key will result in the clients using it being blocked from accessing the system servers. Are you sure you want to delete this API Key?')) {
            this.loading = true;
            this.apiKeysService.removeApiKey(apiKeyId).subscribe(
                data => {
                    this.router.navigateByUrl('/api-keys');
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
     * Get the given categories
     */
    private getApiKeys() {
        this.loading = true;
        this.apiKeysService.getApiKeys().subscribe(
            data => {
                this.formatApiKeys(data);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    /**
     * Get a specific category
     * @private
     */
    private getApiKey() {
        this.loading = true;
        this.apiKeysService.getApiKey(this.apiKeyId).subscribe(
            data => {
                this.apiKey = data;
                this.loading = false;
                this.populateModel(data)
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private createCategory() {
        let apiKey = new ApiKeyModel();
        if (AppCommons.isStringEmpty(this.apiKeyId)) {
            apiKey.created_by = this.loggedInUser;
        } else {
            apiKey = this.apiKey;
            apiKey.updated_by = this.loggedInUser;
        }
        apiKey.name = this.model.name;
        apiKey.api_key = this.model.api_key;
        apiKey.expiry = this.model.expiry;
        apiKey.is_active = Number(this.model.is_active);

        return apiKey;
    }

    private addApiKey() {
        this.loading = true;
        this.apiKeysService.addApiKey(this.createCategory()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/api-keys');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private updateApiKey() {
        this.loading = true;
        this.apiKeysService.updateApiKey(this.createCategory()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/api-keys');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private populateModel(data: any) {
        this.model.api_key = data.api_key;
        this.model.expiry = data.expiry;
        this.model.name = data.name;
        // @ts-ignore
        this.model.is_active = data.is_active === 1 ? true : false;
    }

    private resetModel() {
        this.model.api_key = appConstants.emptyEntry;
        this.model.expiry = appConstants.emptyEntry;
        this.model.name = appConstants.emptyEntry;
        this.model.is_active = appConstants.emptyEntry;
    }

    private formatApiKeys(data: any) {
        this.apiKeys = [];
        for (let i = 0; i < data.length; i++) {
            let apiKey = new ApiKeyModel();
            apiKey.api_key = data[i].api_key;
            apiKey.expiry = data[i].expiry;
            apiKey.name = data[i].name;
            apiKey.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
            apiKey.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
            apiKey.is_active = data[i].is_active;
            apiKey.uuid = data[i].uuid;
            this.apiKeys.push(apiKey);
        }
    }

}
