import {Injectable} from '@angular/core';
import {appConstants} from "../../../_helpers";
import {Observable} from "rxjs";
import {LogoUsesModel} from "../../../_models";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LogoUsesService {

    constructor(private http: HttpClient) {
    }

    getLogoUses() {
        return this.http.get(appConstants.baseApiV1Url + '/logo-uses');
    }

    getLogoUse(id: string): Observable<LogoUsesModel> {
        // @ts-ignore
        return this.http.get(appConstants.baseApiV1Url + '/logo-use/' + id);
    }

    removeLogoUse(id: string) {
        return this.http.delete(appConstants.baseApiV1Url + '/logo-use/' + id);
    }

    addLogoUse(category: LogoUsesModel) {
        return this.http.post(appConstants.baseApiV1Url + '/logo-use', category);
    }

    updateLogoUse(category: LogoUsesModel) {
        return this.http.put(appConstants.baseApiV1Url + '/logo-use/' + category.uuid, category);
    }
}
