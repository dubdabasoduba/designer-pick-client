/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {appConstants} from '../../../_helpers';
import {HttpClient} from '@angular/common/http';
import {ContestStageModel} from '../../../_models';
import {Observable} from 'rxjs';

@Injectable()
export class ContestStagesService {
	
	constructor(private http: HttpClient) {
	}
	
	getContentsStages(): Observable<Array<ContestStageModel>> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/contest-stages');
	}
	
	getContentsStage(id: string): Observable<ContestStageModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/contest-stage/' + id);
	}
	
	removeContentsStage(id: string) {
		return this.http.delete(appConstants.baseApiV1Url + '/contest-stage/' + id);
	}
	
	addContentsStage(contestStage: ContestStageModel) {
		return this.http.post(appConstants.baseApiV1Url + '/contest-stage', contestStage);
	}
	
	updateContentsStage(contestStage: ContestStageModel) {
		return this.http.put(appConstants.baseApiV1Url + '/contest-stage/' + contestStage.uuid, contestStage);
	}
}
