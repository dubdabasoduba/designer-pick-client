/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {AlertService, CountriesService} from '../../../_services';
import {ActivatedRoute} from '@angular/router';
import {AppCommons} from '../../../_helpers/app.commons';
import {appConstants} from "../../../_helpers/app.constants";
import {Country} from "../../../_models/country";

@Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countires.component.css']
})
export class CountriesComponent implements OnInit {
    loading = false;
    public countries: Array<Country> = [];
    public model = {
        name: "",
        code: "",
        shortName: "",
        is_active: ""
    };
    public countryId: string;

    constructor(
        private countriesService: CountriesService,
        private alertService: AlertService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.countryId = params[appConstants.id];
        });
        this.getCountries();
        if (AppCommons.isStringEmpty(this.countryId)) {
            this.getCountry();
        }
    }


    /**
     * Get the given categories
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

    private getCountry() {

    }

    private formatCountries(data: any) {
        for (let i = 0; i < data.length; i++) {
            let country = new Country();
            country.name = data[i].name;
            country.code = data[i].code;
            country.shortName = data[i].short_name;
            country.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
            country.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
            country.is_active = data[i].is_active === 1 ? "Yes" : "No";
            country.uuid = data[i].uuid;
            this.countries.push(country);
        }
    }
}
