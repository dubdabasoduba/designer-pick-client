import {Component, OnDestroy, OnInit} from '@angular/core';
import {Country} from "../../../_models";
import {AlertService, AuthenticationService, CountriesService} from "../../../_services";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {appConstants} from "../../../_helpers/app.constants";
import {AppCommons} from "../../../_helpers/app.commons";

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit, OnDestroy {

  loading = false;
  public countries: Array<Country> = [];
  public model = {
    name: "",
    code: "",
    short_name: "",
    is_active: ""
  };
  public countryId: string;
  mySubscription: any;
  country = new Country();
  loggedInUser: string;

  constructor(
      private countriesService: CountriesService, private alertService: AlertService,
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
      this.countryId = params[appConstants.id];
    });
    this.getCountries();
    this.resetModel();
    if (!AppCommons.isStringEmpty(this.countryId)) {
      this.getCountry();
    }
    this.loggedInUser = this.authenticationService.getCurrentUser().uuid;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  /**
   * Get the given countries
   */
  private getCountries() {
    this.loading = true;
    this.countriesService.getCountries().subscribe(
        data => {
          this.formatCountries(data);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
    );
  }

  /**
   * Get a specific country
   * @private
   */
  private getCountry() {
    this.loading = true;
    this.countriesService.getCountry(this.countryId).subscribe(
        data => {
          this.country = data;
          this.loading = false;
          this.populateModel(data)
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
    );
  }

  addEditCountry() {
    this.loading = false;
    if (this.model.name == appConstants.emptyEntry || this.model.name == undefined) {
      this.alertService.error(appConstants.nameError);
    } else if (this.model.is_active === appConstants.emptyEntry || this.model.is_active == undefined) {
      this.alertService.error(appConstants.statusError);
    } else {
      if (AppCommons.isStringEmpty(this.countryId)) {
        this.addCountry();
      } else {
        this.updateCountry();
      }
    }
  }

  private createCountry() {
    let country = new Country();
    if (AppCommons.isStringEmpty(this.countryId)) {
      country.created_by = this.loggedInUser;
    } else {
      country = this.country;
      country.updated_by = this.loggedInUser;
    }
    country.name = this.model.name;
    country.code = this.model.code;
    country.short_name = this.model.short_name;
    country.is_active = Number(this.model.is_active);
    country.uuid = this.countryId;
    return country;
  }

  private addCountry() {
    this.loading = true;
    this.countriesService.addCountry(this.createCountry()).subscribe(
        data => {
          this.loading = false;
          this.ngOnInit();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
    )
  }

  private updateCountry() {
    this.loading = true;
    this.countriesService.updateCountry(this.createCountry()).subscribe(
        data => {
          this.loading = false;
          this.router.navigateByUrl('/countries');
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
    )
  }


  removeCountry(countryId: string) {
    if (confirm("Are you sure you want to delete this country?")) {
      this.loading = true;
      this.countriesService.removeCountry(countryId).subscribe(
          data => {
            this.router.navigateByUrl('/countries');
            this.loading = false;
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
      );
    }
  }

  private populateModel(data: any) {
    this.model.name = data.name;
    this.model.code = data.code;
    this.model.short_name = data.short_name;
    // @ts-ignore
    this.model.is_active = data.is_active === 1 ? true : false;
  }

  private resetModel() {
    this.model.name = appConstants.emptyEntry;
    this.model.code = appConstants.emptyEntry;
    this.model.short_name = appConstants.emptyEntry;
    this.model.is_active = appConstants.emptyEntry;
  }

  private formatCountries(data: any) {
    this.countries = [];
    for (let i = 0; i < data.length; i++) {
      let country = new Country();
      country.name = data[i].name;
      country.code = data[i].code;
      country.short_name = data[i].short_name;
      country.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
      country.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
      country.is_active = data[i].is_active;
      country.uuid = data[i].uuid;
      this.countries.push(country);
    }
  }

}
