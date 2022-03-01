/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Injectable} from '@angular/core';

import {UserModel} from '../../../_models';
import {appConstants} from '../../../_helpers';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
	
	constructor(private http: HttpClient) {
	}
	
	getUserById(id: string) {
		return this.http.get(appConstants.baseApiV1Url + '/user/' + id);
	}
	
	createUser(user: UserModel) {
		return this.http.post(appConstants.baseApiV1Url + '/authentication/register', user);
	}
}
