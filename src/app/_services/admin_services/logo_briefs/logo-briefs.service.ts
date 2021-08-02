import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appConstants} from "../../../_helpers";
import {Observable} from "rxjs";
import {LogoBriefModel} from "../../../_models";

@Injectable({
	providedIn: 'root'
})
export class LogoBriefsService {
	
	constructor(private http: HttpClient) {
	}
	
	getUserLogoBriefs(userId) {
		return this.http.get(appConstants.baseApiV1Url + '/user-logo-briefs/' + userId);
	}
	
	// @ts-ignore
	getLogoBriefById(uuid: string): Observable<LogoBriefModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/logo-brief/' + uuid);
	}
	
	updateLogoBrief(logoBrief: LogoBriefModel): Observable<LogoBriefModel> {
		return this.http.put<LogoBriefModel>(appConstants.baseApiV1Url + "/logo-brief/" + logoBrief.uuid, logoBrief);
	}
	
	addLogoBrief(logoBrief: LogoBriefModel): Observable<LogoBriefModel> {
		return this.http.post<LogoBriefModel>(appConstants.baseApiV1Url + "/logo-brief", logoBrief);
	}
}
