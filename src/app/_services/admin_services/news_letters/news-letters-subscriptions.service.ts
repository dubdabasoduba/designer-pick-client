/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {appConstants} from '../../../_helpers';
import {Observable} from 'rxjs';
import {NewsLettersSubscriptionsModel} from '../../../_models';

@Injectable({
	providedIn: 'root'
})
export class NewsLettersSubscriptionsService {
	
	constructor(private http: HttpClient) {
	}
	
	getNewsLettersSubscriptions() {
		return this.http.get(appConstants.baseApiV1Url + '/news-letters-subscriptions');
	}
	
	getNewsLetterSubscriptions(id: string): Observable<NewsLettersSubscriptionsModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/news-letters-subscriptions/' + id);
	}
	
	removeNewsLettersSubscriptions(id: string) {
		return this.http.delete(appConstants.baseApiV1Url + '/news-letters-subscriptions/' + id);
	}
	
	addNewsLettersSubscription(newsLettersSubscriptions: NewsLettersSubscriptionsModel) {
		return this.http.post(appConstants.baseApiV1Url + '/news-letters-subscriptions', newsLettersSubscriptions);
	}
	
	updateNewsLettersSubscription(newsLettersSubscriptions: NewsLettersSubscriptionsModel) {
		return this.http.put(appConstants.baseApiV1Url + '/news-letters-subscriptions/' + newsLettersSubscriptions.uuid, newsLettersSubscriptions);
	}
}
