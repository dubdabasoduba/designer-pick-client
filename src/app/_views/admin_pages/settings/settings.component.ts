/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {CommissionsModel, SettingsModel} from "../../../_models";
import {AlertService, CommissionsService, SettingsService} from "../../../_services";
import {ActivatedRoute, Router} from "@angular/router";
import {AppCommons, appConstants} from "../../../_helpers";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    loading = false;
    public settings: Array<SettingsModel> = [];
    public commissions: Array<CommissionsModel> = [];
    public commissionModel = {name: "", value: "", is_active: 1, uuid: "", setting_key: ""};
    public privateListingModel = {name: "", value: "", is_active: 1, uuid: "", setting_key: ""};
    public highLightingModel = {name: "", value: "", is_active: 1, uuid: "", setting_key: ""};
    public featuringModel = {name: "", value: "", is_active: 1, uuid: "", setting_key: ""};
    public listingModel = {name: "", value: "", is_active: 1, uuid: "", setting_key: ""};
    public handlingFeeModel = {name: "", value: "", is_active: 1, uuid: "", setting_key: ""};
    public supportHoursModel = {name: "", value: "", is_active: 1, uuid: "", setting_key: ""};
    public countryId: string;
    mySubscription: any;
    setting = new SettingsModel();
    loggedInUser: string;

    constructor(
        private settingsService: SettingsService,
        private commissionsService: CommissionsService,
        private alertService: AlertService,
        private route: ActivatedRoute, private router: Router
    ) {
    }

    private static createSettingsModel(model: { is_active: number; name: string; value: string; uuid: string; setting_key: string }) {
        let setting = new SettingsModel();
        setting.uuid = model.uuid;
        setting.settings_key = model.setting_key;
        setting.is_active = model.is_active;
        setting.settings_value = {
            settings: {
                name: model.name, value: model.value
            }
        };
        return setting;
    }

    private static setModel(data: any, model: any) {
        let setting_value = JSON.parse(data.setting_value);
        model.uuid = data.uuid;
        model.setting_key = data.setting_key;
        model.name = setting_value.settings.name;
        model.value = setting_value.settings.value;
        model.is_active = data.is_active;
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

    savePrivateListing() {
        this.loading = false;
        let model = this.privateListingModel;
        this.saveSettings(model);
    }

    saveHighLightAmount() {
        this.loading = false;
        let model = this.highLightingModel;
        this.saveSettings(model);
    }

    saveListing() {
        this.loading = false;
        let model = this.listingModel;
        this.saveSettings(model);
    }

    saveFeaturing() {
        this.loading = false;
        let model = this.featuringModel;
        this.saveSettings(model);
    }

    saveHandling() {
        this.loading = false;
        let model = this.handlingFeeModel;
        this.saveSettings(model);
    }

    saveSupportHour() {
        this.loading = false;
        let model = this.supportHoursModel;
        this.saveSettings(model);
    }

    private saveSettings(model: { is_active: number; name: string; value: string; uuid: string; setting_key: string }) {
        if (model.name == appConstants.emptyEntry || model.name == undefined) {
            this.alertService.error(appConstants.nameError);
        } else if (model.is_active == undefined) {
            this.alertService.error(appConstants.statusError);
        } else if (model.value === appConstants.emptyEntry || model.value == undefined) {
            this.alertService.error("The value is required");
        } else {
            if (AppCommons.isStringEmpty(model.uuid)) {
                this.createSettings(model);
            } else {
                this.updateSettings(model);
            }
        }
    }

    private createSettings(model: { is_active: number; name: string; value: string; uuid: string; setting_key: string }) {
        this.loading = true;
        this.settingsService.addSetting(SettingsComponent.createSettingsModel(model)).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/settings');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private updateSettings(model: { is_active: number; name: string; value: string; uuid: string; setting_key: string }) {
        this.loading = true;
        this.settingsService.updateSetting(SettingsComponent.createSettingsModel(model)).subscribe(
            data => {
                this.loading = false;
                this.router.navigateByUrl('/settings');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
    }

    private getSettings() {
        this.loading = true;
        this.settingsService.getSettings().subscribe(
            data => {
                this.assignSettings(data);
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    private assignSettings(data: any) {
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
