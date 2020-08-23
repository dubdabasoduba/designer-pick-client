/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {appConstants} from '../../_helpers/app.constants';
import {HttpClient} from '@angular/common/http';
import {FundingTypes} from '../../_models';

@Injectable()
export class FundingTypesService {

	constructor(private http: HttpClient) {
	}

	getFundingTypeOrganisations(fundingTypeId: string) {
		return this.http.get(appConstants.baseApiV1Url + appConstants.fundingTypeEntityUrl + fundingTypeId);
	}

	getFundingType(fundingTypeId: string) {
		return this.http.get(appConstants.baseApiV1Url + appConstants.fundingTypeUrl + fundingTypeId);
	}

	getFundingTypes(paginate: boolean) {
		return this.http.get<FundingTypes>(
			appConstants.baseApiV1Url + appConstants.fundingTypesUrl + '?' + appConstants.pagination + paginate);
	}
}
