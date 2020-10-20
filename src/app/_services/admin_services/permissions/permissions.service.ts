import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appConstants} from "../../../_helpers/app.constants";
import {Observable} from "rxjs";
import {Permissions} from "../../../_models";

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {

    constructor(private http: HttpClient) {
    }

    getPermissions() {
        return this.http.get(appConstants.baseApiV1Url + '/permissions');
    }

    getPermission(id: string): Observable<Permissions> {
        // @ts-ignore
        return this.http.get(appConstants.baseApiV1Url + '/permission/' + id);
    }

    updatePermission(permission: Permissions) {
        return this.http.put(appConstants.baseApiV1Url + '/permission/' + permission.uuid, permission);
    }
}
