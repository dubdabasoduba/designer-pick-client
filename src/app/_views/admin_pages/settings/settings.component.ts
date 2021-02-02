/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {CommissionsModel, SettingsModel} from "../../../_models";
import {
    AlertService,
    AuthenticationService,
    CommissionsService,
    SettingsService
} from "../../../_services";
import {ActivatedRoute, Router} from "@angular/router";
import {appConstants} from "../../../_helpers";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    loading = false;
    public settings: Array<SettingsModel> = [];
    public commissions: Array<CommissionsModel> = [];
    public commissionModel = {name: "", value: "", is_active: ""};
    public privateListingModel = {name: "", value: "", is_active: ""};
    public highLightingModel = {name: "", value: "", is_active: ""};
    public featuringModel = {name: "", value: "", is_active: ""};
    public listingModel = {name: "", value: "", is_active: ""};
    public handlingFeeModel = {name: "", value: "", is_active: ""};
    public supportHoursModel = {name: "", value: "", is_active: ""};
    public countryId: string;
    mySubscription: any;
    setting = new SettingsModel();
    loggedInUser: string;

    constructor(
        private settingsService: SettingsService,
        private commissionsService: CommissionsService,
        private alertService: AlertService,
        private route: ActivatedRoute, private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.getCommissions();
        this.getSettings();
    }


    private getSettings() {
        this.loading = true;
        this.settingsService.getSettings().subscribe(
            data => {
                this.getCommissionsSetting(data);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private getCommissionsSetting(data: any) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].setting_key == appConstants.commissions) {
                let setting_value = JSON.parse(data[i].setting_value);
                this.commissionModel.name = setting_value.settings.name;
                this.commissionModel.value = setting_value.settings.value;
                this.commissionModel.is_active = data[i].is_active;
            } else if (data[i].setting_key == appConstants.privateListingAmount) {
                let setting_value = JSON.parse(data[i].setting_value);
                this.privateListingModel.name = setting_value.settings.name;
                this.privateListingModel.value = setting_value.settings.value;
                this.privateListingModel.is_active = data[i].is_active;
            } else if (data[i].setting_key == appConstants.highlightAmount) {
                let setting_value = JSON.parse(data[i].setting_value);
                this.highLightingModel.name = setting_value.settings.name;
                this.highLightingModel.value = setting_value.settings.value;
                this.highLightingModel.is_active = data[i].is_active;
            } else if (data[i].setting_key == appConstants.listingAmount) {
                let setting_value = JSON.parse(data[i].setting_value);
                this.listingModel.name = setting_value.settings.name;
                this.listingModel.value = setting_value.settings.value;
                this.listingModel.is_active = data[i].is_active;
            } else if (data[i].setting_key == appConstants.featuringAmount) {
                let setting_value = JSON.parse(data[i].setting_value);
                this.featuringModel.name = setting_value.settings.name;
                this.featuringModel.value = setting_value.settings.value;
                this.featuringModel.is_active = data[i].is_active;
            } else if (data[i].setting_key == appConstants.handlingAmount) {
                let setting_value = JSON.parse(data[i].setting_value);
                this.handlingFeeModel.name = setting_value.settings.name;
                this.handlingFeeModel.value = setting_value.settings.value;
                this.handlingFeeModel.is_active = data[i].is_active;
            } else if (data[i].setting_key == appConstants.supportHours) {
                let setting_value = JSON.parse(data[i].setting_value);
                this.supportHoursModel.name = setting_value.settings.name;
                this.supportHoursModel.value = setting_value.settings.value;
                this.supportHoursModel.is_active = data[i].is_active;
            }
        }
    }

    private getCommissions() {
        this.loading = true;
        this.commissionsService.getCommissions().subscribe(
            data => {
                this.formatCommission(data);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private formatCommission(data: any) {
        this.commissions = [];
        for (let i = 0; i < data.length; i++) {
            let commissionsModel = new CommissionsModel();
            commissionsModel.name = data[i].name;
            commissionsModel.percentage = data[i].percentage;
            commissionsModel.uuid = data[i].uuid;
            this.commissions.push(commissionsModel);
        }
    }
}
