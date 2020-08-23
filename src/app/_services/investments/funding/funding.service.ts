/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {appConstants} from '../../../_helpers/app.constants';
import {HttpClient} from '@angular/common/http';
import {Funding} from '../../../_models';
import {AppCommons} from '../../../_helpers/app.commons';

@Injectable()
export class FundingService {

	constructor(private http: HttpClient) {
	}

	getFundings(page, limit, paginate) {
		const paging = AppCommons.getPagingUrl(AppCommons.getPagingInfo(page, limit, paginate));
		return this.http.get(
			appConstants.baseApiV1Url + appConstants.fundingsUrl + paging);
	}

	getInvestment(investorId: string, investorType: string) {
		return this.http.get(appConstants.baseApiV1Url + appConstants.investmentsUrl + investorId + '/' + investorType);
	}

	getInvestors(investmentId: string) {
		return this.http.get(appConstants.baseApiV1Url + appConstants.investorsUrl + investmentId);
	}

	getFunding(fundingId: string) {
		return this.http.get(appConstants.baseApiV1Url + appConstants.fundingUrl + fundingId);
	}

	addFunding(funding: Funding) {
		return this.http.post<Funding>(appConstants.baseApiV1Url + appConstants.fundingAddUrl, funding);
	}

	updateFunding(funding: Funding) {
		return this.http.put<Funding>(appConstants.baseApiV1Url + appConstants.fundingUpdateUrl + funding._id, funding);
	}

	getDatedFunding(timeline: string) {
		if (timeline == appConstants.yearly) {
			return <any>this.http.get(appConstants.baseApiV1Url + appConstants.annualFundingCount);
		} else if (timeline == appConstants.monthly) {
			return <any>this.http.get(appConstants.baseApiV1Url + appConstants.monthlyFundingCount);
		} else {
			return <any>this.http.get(appConstants.baseApiV1Url + appConstants.weeklyFundingCount);
		}
	}

}


