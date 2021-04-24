import {Component, OnDestroy, OnInit} from '@angular/core';
import {DiscountsModel} from "../../../_models";
import {AlertService, AuthenticationService, DiscountsService} from "../../../_services";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AppCommons, appConstants} from "../../../_helpers";

@Component({
    selector: 'app-discounts',
    templateUrl: './discounts.component.html',
    styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit, OnDestroy {
    loading = false;
    public discounts: Array<DiscountsModel> = [];
    public model = {
        name: "",
        code: "",
        percentage: 0,
        is_active: "",
    };
    public discountId: string;
    mySubscription: any;
    discount = new DiscountsModel();
    loggedInUser: string;

    constructor(
        private discountsService: DiscountsService, private alertService: AlertService,
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
            this.discountId = params[appConstants.id];
        });
        this.getDiscounts();
        this.resetModel();
        if (!AppCommons.isStringEmpty(this.discountId)) {
            this.getDiscount();
        }
        this.loggedInUser = this.authenticationService.getCurrentUser().user.uuid;
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    addEditDiscount() {
        this.loading = false;
        if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
            this.alertService.error(appConstants.nameError);
        } else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
            this.alertService.error(appConstants.statusError);
        } else if (this.model.code === appConstants.emptyEntry || this.model.code == undefined) {
            this.alertService.error("Discount code is required");
        } else {
            if (AppCommons.isStringEmpty(this.discountId)) {
                this.adddiscount();
            } else {
                this.updatediscount();
            }
        }
    }

    removeDiscount(discountId: string) {
        if (confirm("Are you sure you want to delete this discount?")) {
            this.loading = true;
            this.discountsService.removeDiscount(discountId).subscribe(
                data => {
                    this.router.navigateByUrl('/payment/discounts');
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
    private getDiscounts() {
        this.loading = true;
        this.discountsService.getDiscounts().subscribe(
            data => {
                this.formatdiscount(data);
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
    private getDiscount() {
        this.loading = true;
        this.discountsService.getDiscount(this.discountId).subscribe(
            data => {
                this.discount = data;
                this.loading = false;
                this.populateModel(data)
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private creatediscount() {
        let discountsModel = new DiscountsModel();
        if (AppCommons.isStringEmpty(this.discountId)) {
            discountsModel.created_by = this.loggedInUser;
        } else {
            discountsModel = this.discount;
            discountsModel.updated_by = this.loggedInUser;
        }
        discountsModel.name = this.model.name;
        discountsModel.code = this.model.code;
        discountsModel.percentage = this.model.percentage;
        discountsModel.is_active = Number(this.model.is_active);

        return discountsModel;
    }

    private adddiscount() {
        this.loading = true;
        this.discountsService.addDiscount(this.creatediscount()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/payment/discounts');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private updatediscount() {
        this.loading = true;
        this.discountsService.updateDiscount(this.creatediscount()).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/payment/discounts');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private populateModel(data: any) {
        this.model.name = data.name;
        this.model.code = data.code;
        this.model.percentage = data.percentage;
        // @ts-ignore
        this.model.is_active = data.is_active;
    }

    private resetModel() {
        this.model.name = appConstants.emptyEntry;
        this.model.code = appConstants.emptyEntry;
        this.model.percentage = 0;
        this.model.is_active = appConstants.emptyEntry;
    }

    private formatdiscount(data: any) {
        this.discounts = [];
        for (let i = 0; i < data.length; i++) {
            let discountsModel = new DiscountsModel();
            discountsModel.name = data[i].name;
            discountsModel.code = data[i].code;
            discountsModel.percentage = data[i].percentage;
            discountsModel.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
            discountsModel.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
            discountsModel.is_active = data[i].is_active;
            discountsModel.uuid = data[i].uuid;
            this.discounts.push(discountsModel);
        }
    }

}
