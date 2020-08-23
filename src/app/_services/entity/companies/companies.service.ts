/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {appConstants} from '../../../_helpers/app.constants';

@Injectable()
export class CompaniesService {
	constructor(private http: HttpClient) {
	}

	getCompanies() {
		return this.http.get(appConstants.baseApiV1Url + appConstants.companiesUrl);
	}
}


