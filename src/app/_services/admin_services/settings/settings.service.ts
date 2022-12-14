/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {appConstants} from '../../../_helpers';
import {Observable} from 'rxjs';
import {SettingsModel} from '../../../_models';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {
	
	constructor(private http: HttpClient) {
	}
	
	getSettings(): Observable<Array<SettingsModel>> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/settings');
	}
	
	addSetting(setting: SettingsModel) {
		return this.http.post(appConstants.baseApiV1Url + '/setting', setting);
	}
	
	getSettingById(id: string): Observable<SettingsModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/setting/' + id);
	}
	
	updateSetting(setting: SettingsModel) {
		return this.http.put(appConstants.baseApiV1Url + '/setting/' + setting.uuid, setting);
	}
}
