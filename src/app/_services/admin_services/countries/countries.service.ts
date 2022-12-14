/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {appConstants} from '../../../_helpers';
import {Observable} from 'rxjs';
import {CountryModel} from '../../../_models';

@Injectable()
export class CountriesService {
	
	constructor(private http: HttpClient) {
	}
	
	getCountries() {
		return this.http.get(appConstants.baseApiV1Url + appConstants.countriesUrl);
	}
	
	getCountry(countryId: string): Observable<CountryModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + appConstants.countryUrl + countryId);
	}
	
	removeCountry(id: string) {
		return this.http.delete(appConstants.baseApiV1Url + '/country/' + id);
	}
	
	addCountry(country: CountryModel) {
		return this.http.post(appConstants.baseApiV1Url + '/country', country);
	}
	
	updateCountry(country: CountryModel) {
		return this.http.put(appConstants.baseApiV1Url + '/country/' + country.uuid, country);
	}
}
