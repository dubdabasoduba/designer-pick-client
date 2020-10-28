import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryModel, PaymentModeModel} from "../../../_models";
import {AlertService, AuthenticationService, PaymentModesService} from "../../../_services";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {appConstants} from "../../../_helpers/app.constants";
import {AppCommons} from "../../../_helpers/app.commons";

@Component({
    selector: 'app-payment-modes',
    templateUrl: './payment-modes.component.html',
    styleUrls: ['./payment-modes.component.css']
})
export class PaymentModesComponent implements OnInit, OnDestroy {
    loading = false;
    public paymentModes: Array<CategoryModel> = [];
    public model = {
        name: "",
        description: "",
        is_active: "",
    };
    public paymentId: string;
    mySubscription: any;
    paymentMode = new PaymentModeModel();
    loggedInUser: string;

    constructor(
        private paymentModesService: PaymentModesService, private alertService: AlertService,
        private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
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
            this.paymentId = params[appConstants.id];
        });
        this.getPaymentModes();
        this.resetModel();
        if (!AppCommons.isStringEmpty(this.paymentId)) {
            this.getPaymentMode();
        }
        this.loggedInUser = this.authenticationService.getCurrentUser().uuid;
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    addEditPaymentMode() {
        this.loading = false;
        if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
            this.alertService.error(appConstants.nameError);
        } else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
            this.alertService.error(appConstants.statusError);
        } else {
            if (AppCommons.isStringEmpty(this.paymentId)) {
                this.addPaymentMode();
            } else {
                this.updatePaymentMode();
            }
        }
    }

    removePaymentMode(paymentModeId: string) {
        if (confirm("Are you sure you want to delete this payment mode?")) {
            this.loading = true;
            this.paymentModesService.removePaymentMode(paymentModeId).subscribe(
                data => {
                    this.router.navigateByUrl('/payment/payment-modes');
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
    private getPaymentModes() {
        this.loading = true;
        this.paymentModesService.getPaymentModes().subscribe(
            data => {
                this.formatCategories(data);
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
    private getPaymentMode() {
        this.loading = true;
        this.paymentModesService.getPaymentMode(this.paymentId).subscribe(
            data => {
                this.paymentMode = data;
                this.loading = false;
                this.populateModel(data)
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private createPaymentMode() {
        let paymentModeModel = new PaymentModeModel();
        if (AppCommons.isStringEmpty(this.paymentId)) {
            paymentModeModel.created_by = this.loggedInUser;
        } else {
            paymentModeModel = this.paymentMode;
            paymentModeModel.updated_by = this.loggedInUser;
        }
        paymentModeModel.name = this.model.name;
        paymentModeModel.description = this.model.description;
        paymentModeModel.is_active = Number(this.model.is_active);

        return paymentModeModel;
    }

    private addPaymentMode() {
        this.loading = true;
        this.paymentModesService.addPaymentMode(this.createPaymentMode()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/payment/payment-modes');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private updatePaymentMode() {
        this.loading = true;
        this.paymentModesService.updatePaymentMode(this.createPaymentMode()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/payment/payment-modes');
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
        this.model.is_active = data.is_active;
    }

    private resetModel() {
        this.model.name = appConstants.emptyEntry;
        this.model.description = appConstants.emptyEntry;
        this.model.is_active = appConstants.emptyEntry;
    }

    private formatCategories(data: any) {
        this.paymentModes = [];
        for (let i = 0; i < data.length; i++) {
            let category = new CategoryModel();
            category.name = data[i].name;
            category.description = data[i].description;
            category.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
            category.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
            category.is_active = data[i].is_active;
            category.uuid = data[i].uuid;
            this.paymentModes.push(category);
        }
    }

}
