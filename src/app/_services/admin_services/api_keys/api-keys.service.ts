import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appConstants} from "../../../_helpers/app.constants";
import {Observable} from "rxjs";
import {ApiKey} from "../../../_models/api-key";

@Injectable({
    providedIn: 'root'
})
export class ApiKeysService {

    constructor(private http: HttpClient) {
    }

    getApiKeys() {
        return this.http.get(appConstants.baseApiV1Url + '/api-keys');
    }

    getApiKey(id: string): Observable<ApiKey> {
        // @ts-ignore
        return this.http.get(appConstants.baseApiV1Url + '/api-key/' + id);
    }

    removeApiKey(id: string) {
        return this.http.delete(appConstants.baseApiV1Url + '/api-key/' + id);
    }

    addApiKey(apiKey: ApiKey) {
        return this.http.post(appConstants.baseApiV1Url + '/api-key', apiKey);
    }

    updateApiKey(apiKey: ApiKey) {
        return this.http.put(appConstants.baseApiV1Url + '/api-key/' + apiKey.uuid, apiKey);
    }
}
