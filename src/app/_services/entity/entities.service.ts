/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {appConstants} from '../../_helpers/app.constants';
import {HttpClient} from '@angular/common/http';
import {Entity} from '../../_models';

@Injectable()
export class EntitiesService {
	constructor(private http: HttpClient) {
	}

	getEntities(paginate: boolean) {
		return this.http.get(
			appConstants.baseApiV1Url + appConstants.entitiesUrl + '?' + appConstants.pagination + paginate);
	}

	getEntityById(entityId: string) {
		return this.http.get(appConstants.baseApiV1Url + appConstants.entityUrl + entityId);
	}

	getOrganisationsCount() {
		return <any>this.http.get(appConstants.baseApiV1Url + appConstants.organisationCount);
	}

	updateEntity(entity: Entity) {
		return this.http.put<Entity>(appConstants.baseApiV1Url + appConstants.entityUrl + entity._id, entity);
	}

	addEntity(entity: Entity) {
		return this.http.post<Entity>(appConstants.baseApiV1Url + appConstants.entityUrl, entity);
	}
}


