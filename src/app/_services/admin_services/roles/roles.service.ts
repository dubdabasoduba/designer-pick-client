import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {appConstants} from '../../../_helpers';
import {Observable} from 'rxjs';
import {RolesModel} from '../../../_models';

@Injectable({
	providedIn: 'root'
})
export class RolesService {
	
	constructor(private http: HttpClient) {
	}
	
	getRoles() {
		return this.http.get(appConstants.baseApiV1Url + '/roles');
	}
	
	getRole(id: string): Observable<RolesModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/role/' + id);
	}
	
	getRolePermissions(id: string) {
		return this.http.get(appConstants.baseApiV1Url + '/role-permissions/' + id);
	}
	
	removeRole(id: string) {
		return this.http.delete(appConstants.baseApiV1Url + '/role/' + id);
	}
	
	updateRole(Role: RolesModel) {
		return this.http.put(appConstants.baseApiV1Url + '/role/' + Role.uuid, Role);
	}
	
	addRole(Role: RolesModel) {
		return this.http.post(appConstants.baseApiV1Url + '/role', Role);
	}
	
	getSearchRoles(searchQuery: string) {
		return this.http.get(appConstants.baseApiV1Url + '/roles/search?' + searchQuery);
	}
	
	addUserRoles(personId: string, roles: Array<RolesModel>) {
		return this.http.post(appConstants.baseApiV1Url + '/user-roles/' + personId, roles);
	}
}
