/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Component, OnInit} from '@angular/core';
import {SettingsModel} from "../../../_models";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    loading = false;
    public countries: Array<SettingsModel> = [];
    public model = {
        name: "",
        value: ""
    };
    public countryId: string;
    mySubscription: any;
    setting = new SettingsModel();
    loggedInUser: string;

    constructor() {
    }

    ngOnInit() {
    }

}
