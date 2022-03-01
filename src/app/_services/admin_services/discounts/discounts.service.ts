/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {appConstants} from '../../../_helpers';
import {Observable} from 'rxjs';
import {DiscountsModel} from '../../../_models';

@Injectable({
	providedIn: 'root'
})
export class DiscountsService {
	
	constructor(private http: HttpClient) {
	}
	
	getDiscounts() {
		return this.http.get(appConstants.baseApiV1Url + '/discounts');
	}
	
	getDiscount(id: string): Observable<DiscountsModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/discount/' + id);
	}
	
	removeDiscount(id: string) {
		return this.http.delete(appConstants.baseApiV1Url + '/discount/' + id);
	}
	
	addDiscount(discountsModel: DiscountsModel) {
		return this.http.post(appConstants.baseApiV1Url + '/discount', discountsModel);
	}
	
	updateDiscount(discountsModel: DiscountsModel) {
		return this.http.put(appConstants.baseApiV1Url + '/discount/' + discountsModel.uuid, discountsModel);
	}
}
