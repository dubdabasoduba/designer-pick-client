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

    saveCommissions() {
        this.loading = false;
        let model = this.commissionModel;
        this.saveSettings(model);
    }

    private saveSettings(model: { is_active: string; name: string; value: string }) {
        if (model.name == appConstants.emptyEntry || model.name == undefined) {
            this.alertService.error(appConstants.nameError);
        } else if (model.is_active === appConstants.emptyEntry || model.is_active == undefined) {
            this.alertService.error(appConstants.statusError);
        } else if (model.value === appConstants.emptyEntry || model.value == undefined) {
            this.alertService.error("The value is required");
        } else {
        }
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
                SettingsComponent.setModel(data[i], this.commissionModel);
            } else if (data[i].setting_key == appConstants.privateListingAmount) {
                SettingsComponent.setModel(data[i], this.privateListingModel);
            } else if (data[i].setting_key == appConstants.highlightAmount) {
                SettingsComponent.setModel(data[i], this.highLightingModel);
            } else if (data[i].setting_key == appConstants.listingAmount) {
                SettingsComponent.setModel(data[i], this.listingModel);
            } else if (data[i].setting_key == appConstants.featuringAmount) {
                SettingsComponent.setModel(data[i], this.featuringModel);
            } else if (data[i].setting_key == appConstants.handlingAmount) {
                SettingsComponent.setModel(data[i], this.handlingFeeModel);
            } else if (data[i].setting_key == appConstants.supportHours) {
                SettingsComponent.setModel(data[i], this.supportHoursModel);
            }
        }
    }

    private static setModel(data: any, model: any) {
        let setting_value = JSON.parse(data.setting_value);
        model.name = setting_value.settings.name;
        model.value = setting_value.settings.value;
        model.is_active = data.is_active;
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
