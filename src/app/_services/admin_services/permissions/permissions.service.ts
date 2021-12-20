import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {appConstants} from '../../../_helpers';
import {Observable} from 'rxjs';
import {PermissionModel} from '../../../_models';

@Injectable({
	providedIn: 'root'
})
export class PermissionsService {
	
	constructor(private http: HttpClient) {
	}
	
	getPermissions() {
		return this.http.get(appConstants.baseApiV1Url + '/permissions');
	}
	
	getSearchPermissions(searchQuery: string) {
		return this.http.get(appConstants.baseApiV1Url + '/permissions/search?' + searchQuery);
	}
	
	getPermission(id: string): Observable<PermissionModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/permission/' + id);
	}
	
	updatePermission(permission: PermissionModel) {
		return this.http.put(appConstants.baseApiV1Url + '/permission/' + permission.uuid, permission);
	}
}
