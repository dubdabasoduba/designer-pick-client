/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewsLettersSubscriptionsModel} from '../../../_models';
import {Observable} from 'rxjs';
import {appConstants} from '../../../_helpers';

@Injectable({
	providedIn: 'root'
})
export class FooterService {
	
	constructor(private http: HttpClient) {
	}
	
	subscribeToNewsLetter(newsLettersSubscriptionsModel: NewsLettersSubscriptionsModel): Observable<NewsLettersSubscriptionsModel> {
		return this.http.post<NewsLettersSubscriptionsModel>(appConstants.baseApiV1Url + appConstants.subscribeToNewsLetterUrl, newsLettersSubscriptionsModel);
	}
}
