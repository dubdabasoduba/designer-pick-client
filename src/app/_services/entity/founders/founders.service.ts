/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {appConstants} from '../../../_helpers/app.constants';
import {HttpClient} from '@angular/common/http';
import {Founders} from '../../../_models';

@Injectable()
export class FoundersService {
	constructor(private http: HttpClient) {
	}

	getFounders() {
		return this.http.get<Founders>(appConstants.baseApiV1Url + '/founders');
	}

	getEntityFounders(entityId) {
		return this.http.get<Founders>(appConstants.baseApiV1Url + '/entity-founders/' + entityId);
	}

	getFounderById(founderId: string) {
		return this.http.get<Founders>(appConstants.baseApiV1Url + appConstants.founderUrl + '/' + founderId);
	}

	addFounders(founder: Founders) {
		return this.http.post(appConstants.baseApiV1Url + appConstants.founderUrl, founder);
	}

	updateFounders(founder: Founders) {
		return this.http.put(appConstants.baseApiV1Url + appConstants.founderUrl + '/' + founder._id, founder);
	}

	deleteFounders(founder: Founders) {
		return this.http.delete(appConstants.baseApiV1Url + appConstants.founderUrl + '/' + founder._id);
	}
}


