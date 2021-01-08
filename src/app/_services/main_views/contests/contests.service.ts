import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appConstants} from "../../../_helpers";
import {Observable} from "rxjs";
import {PersonModel} from "../../../_models";

@Injectable({
    providedIn: 'root'
})
export class ContestsService {

    constructor(private http: HttpClient) {
    }

    getContests(accountType: string) {
        return this.http.get(appConstants.baseApiV1Url + '/designers' + "?account_type=" + accountType);
    }

    getContestById(personId: string): Observable<PersonModel> {
        // @ts-ignore
        return this.http.get(appConstants.baseApiV1Url + '/designer/' + personId);
    }

    getDisplayContests(accountType: string) {
        return this.http.get(appConstants.baseApiV1Url + '/designers' + "?account_type=" + accountType);
    }

    getDisplayContestById(personId: string): Observable<PersonModel> {
        // @ts-ignore
        return this.http.get(appConstants.baseApiV1Url + '/designer/' + personId);
    }
}
