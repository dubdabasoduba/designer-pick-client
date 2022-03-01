/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {appConstants} from '../../../_helpers';
import {Observable} from 'rxjs';
import {ApiKeyModel} from '../../../_models';

@Injectable({
	providedIn: 'root'
})
export class ApiKeysService {
	
	constructor(private http: HttpClient) {
	}
	
	getApiKeys() {
		return this.http.get(appConstants.baseApiV1Url + '/api-keys');
	}
	
	getApiKey(id: string): Observable<ApiKeyModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/api-key/' + id);
	}
	
	removeApiKey(id: string) {
		return this.http.delete(appConstants.baseApiV1Url + '/api-key/' + id);
	}
	
	addApiKey(apiKey: ApiKeyModel) {
		return this.http.post(appConstants.baseApiV1Url + '/api-key', apiKey);
	}
	
	updateApiKey(apiKey: ApiKeyModel) {
		return this.http.put(appConstants.baseApiV1Url + '/api-key/' + apiKey.uuid, apiKey);
	}
}
