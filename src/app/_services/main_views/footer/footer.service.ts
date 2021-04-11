import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewsLettersModel} from "../../../_models";
import {Observable} from "rxjs";
import {appConstants} from "../../../_helpers";

@Injectable({
    providedIn: 'root'
})
export class FooterService {

    constructor(private http: HttpClient) {
    }

    subscribeToNewsLetter(newsLetter: NewsLettersModel): Observable<NewsLettersModel> {
        return this.http.post<NewsLettersModel>(appConstants.baseApiV1Url + appConstants.subscribeToNewsLetterUrl, newsLetter);
    }
}
