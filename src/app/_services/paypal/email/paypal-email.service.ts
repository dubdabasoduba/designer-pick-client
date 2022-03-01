/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {appConstants} from '../../../_helpers';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PaypalEmailModel} from '../../../_models';

@Injectable({
	providedIn: 'root'
})
export class PaypalEmailService {
	
	constructor(private http: HttpClient) {
	}
	
	getPayPalEmails(id: string) {
		return this.http.get(appConstants.baseApiV1Url + '/paypal-details/' + id);
	}
	
	getPayPalEmail(paypalDetailId: string): Observable<PaypalEmailModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/paypal-detail/' + paypalDetailId);
	}
	
	removePayPalEmail(id: string) {
		return this.http.delete(appConstants.baseApiV1Url + '/paypal-detail/' + id);
	}
	
	addPayPalEmail(paypalDetail: PaypalEmailModel) {
		return this.http.post(appConstants.baseApiV1Url + '/paypal-detail', paypalDetail);
	}
	
	updatePayPalEmail(paypalDetail: PaypalEmailModel) {
		return this.http.put(appConstants.baseApiV1Url + '/paypal-detail/' + paypalDetail.uuid, paypalDetail);
	}
}
