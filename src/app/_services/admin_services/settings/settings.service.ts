import {Injectable} from '@angular/core';
import {appConstants} from "../../../_helpers";
import {Observable} from "rxjs";
import {SettingsModel} from "../../../_models";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(private http: HttpClient) {
    }

    getSettings(): Observable<Array<SettingsModel>> {
        // @ts-ignore
        return this.http.get(appConstants.baseApiV1Url + '/settings');
    }

    addSetting(setting: SettingsModel) {
        return this.http.post(appConstants.baseApiV1Url + '/setting', setting);
    }

    getSettingById(id: string): Observable<SettingsModel> {
        // @ts-ignore
        return this.http.get(appConstants.baseApiV1Url + '/setting/' + id);
    }

    updateSetting(setting: SettingsModel) {
        return this.http.put(appConstants.baseApiV1Url + '/setting/' + setting.uuid, setting);
    }
}
