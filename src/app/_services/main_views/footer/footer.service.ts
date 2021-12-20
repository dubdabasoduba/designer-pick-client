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
