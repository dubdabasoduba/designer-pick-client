import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appConstants} from "../../../_helpers";
import {Observable} from "rxjs";
import {ContestModel, PersonModel} from "../../../_models";

@Injectable({
    providedIn: 'root'
})
export class ContestsService {

    constructor(private http: HttpClient) {
    }


    getContests() {
        return this.http.get(appConstants.baseApiV1Url + '/designers');
    }

    getContestById(personId: string): Observable<PersonModel> {
        // @ts-ignore
        return this.http.get(appConstants.baseApiV1Url + '/designer/' + personId);
    }

    getContestsByPersonId(personId: string): Observable<Array<ContestModel>> {
        // @ts-ignore
        return this.http.get(`${appConstants.baseApiV1Url}/display-live-contests/${personId}`);
    }

    getDisplayContests() {
        return this.http.get(`${appConstants.baseApiV1Url}/display-contests`);
    }

    getDisplayContestById(contestId: string): Observable<ContestModel> {
        // @ts-ignore
        return this.http.get(`${appConstants.baseApiV1Url}/display-contest/${contestId}`);
    }

    getDraftContestById(contestId: string): Observable<ContestModel> {
        // @ts-ignore
        return this.http.get(`${appConstants.baseApiV1Url}/draft-contest/${contestId}`);
    }

    updateContest(contest: ContestModel): Observable<ContestModel> {
        return this.http.put<ContestModel>(appConstants.baseApiV1Url + appConstants.contestsUrl + contest.uuid, contest);
    }

    addContest(contest: ContestModel): Observable<ContestModel> {
        return this.http.post<ContestModel>(appConstants.baseApiV1Url + appConstants.contestsUrl, contest);
    }
}
