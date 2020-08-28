/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {appConstants} from '../../../_helpers/app.constants';
import {HttpClient} from '@angular/common/http';
import {Acquisitions} from '../../../_models';
import {AppCommons} from '../../../_helpers/app.commons';

@Injectable()
export class AcquisitionsService {
	constructor(private http: HttpClient) {
	}

	getAcquisitions(page, limit, paginate) {
		const paging = AppCommons.getPagingUrl(AppCommons.getPagingInfo(page, limit, paginate));
		return this.http.get(appConstants.baseApiV1Url + appConstants.acquisitionUrl + paging);
	}

	getInvestments(investorId: string, investorType: string) {
		return this.http.get(appConstants.baseApiV1Url + '/clients-dashboard/' + investorId + '/' + investorType);
	}

	getAcquisition(acquisitionId: string) {
		return this.http.get(appConstants.baseApiV1Url + '/acquisition/' + acquisitionId);
	}


	addAcquisition(acquisition: Acquisitions) {
		return this.http.post<Acquisitions>(appConstants.baseApiV1Url + appConstants.acquisitionAddUrl, acquisition);
	}

	updateAcquisition(acquisition: Acquisitions) {
		return this.http.put<Acquisitions>(appConstants.baseApiV1Url + appConstants.acquisitionUpdateUrl + acquisition._id,
			acquisition);
	}

	getDatedAcquisitions(timeline: string) {
		if (timeline == appConstants.yearly) {
			return <any>this.http.get(appConstants.baseApiV1Url + appConstants.annualAcquisitionsCount);
		} else if (timeline == appConstants.monthly) {
			return <any>this.http.get(appConstants.baseApiV1Url + appConstants.monthlyAcquisitionsCount);
		} else {
			return <any>this.http.get(appConstants.baseApiV1Url + appConstants.weeklyAcquisitionsCount);
		}
	}
}


