/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {appConstants} from '../../../_helpers';
import {Observable} from 'rxjs';
import {LogoUsesModel} from '../../../_models';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class LogoUsesService {
	
	constructor(private http: HttpClient) {
	}
	
	getLogoUses() {
		return this.http.get(appConstants.baseApiV1Url + '/logo-uses');
	}
	
	getLogoUse(id: string): Observable<LogoUsesModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/logo-use/' + id);
	}
	
	removeLogoUse(id: string) {
		return this.http.delete(appConstants.baseApiV1Url + '/logo-use/' + id);
	}
	
	addLogoUse(category: LogoUsesModel) {
		return this.http.post(appConstants.baseApiV1Url + '/logo-use', category);
	}
	
	updateLogoUse(category: LogoUsesModel) {
		return this.http.put(appConstants.baseApiV1Url + '/logo-use/' + category.uuid, category);
	}
}
