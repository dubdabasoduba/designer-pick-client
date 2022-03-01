/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

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
