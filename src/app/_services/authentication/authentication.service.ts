/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {AppCommons, appConstants} from '../../_helpers';
import {HttpClient} from '@angular/common/http';
import {AuthenticatedUserModel, UserModel} from '../../_models';
import {Observable, tap} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private _lbsUser = 'lbsUser';
	
	constructor(private http: HttpClient) {
	}
	
	private static setSession(response) {
		if (response && response.auth && response.auth.token) {
			localStorage.setItem('lbsUser', JSON.stringify(response));
		}
		return response;
	}
	
	login(username: string, password: string): Observable<AuthenticatedUserModel> {
		// @ts-ignore
		return this.http.post(appConstants.baseApiV1Url + '/authentication/login', {
			username: username, password: AppCommons.generatePasswordHash(password)
		}).pipe(tap(response => AuthenticationService.setSession(response)));
	}
	
	resetPasswordRequest(username: string) {
		return this.http.post(appConstants.baseApiV1Url + '/authentication/reset-password', {
			username: username
		});
	}
	
	passwordChangeRequest(password: string, username: string) {
		return this.http.post(appConstants.baseApiV1Url + appConstants.passwordChangeUrl, {
			username: username, password: AppCommons.generatePasswordHash(password)
		});
	}
	
	updatePasswordAfterReset(userId: string, verificationCode: string, password: string, confirmPassword: string) {
		return this.http.post(appConstants.baseApiV1Url + '/authentication/update-password', {
			uuid: userId,
			reset_code: verificationCode,
			password: AppCommons.generatePasswordHash(password),
			confirmPassword: AppCommons.generatePasswordHash(confirmPassword)
		});
	}
	
	verifyAccount(userId: string, verificationCode: string) {
		return this.http.post(appConstants.baseApiV1Url + '/authentication/verify-account', {
			uuid: userId, verification_code: verificationCode
		});
	}
	
	updatePasswordFormProfile(user: UserModel) {
		return this.http.post(appConstants.baseApiV1Url + '/authentication/profile/update-password', {
			uuid: user.uuid,
			password: AppCommons.generatePasswordHash(user.password),
			confirmPassword: AppCommons.generatePasswordHash(user.confirmPassword)
		});
	}
	
	logout() {
		localStorage.removeItem(this._lbsUser);
		this.http.get(appConstants.baseApiV1Url + '/authentication/logout');
	}
	
	resendVerification(username: string) {
		return this.http.post(appConstants.baseApiV1Url + appConstants.resendCodeUrl, {username: username});
	}
	
	getToken() {
		const currentUser = JSON.parse(localStorage.getItem(this._lbsUser));
		return currentUser.auth.token;
	}
	
	getCurrentUser(): AuthenticatedUserModel {
		return JSON.parse(localStorage.getItem(this._lbsUser));
	}
	
	setUpdatedProfileImage(userImage: string) {
		const user = JSON.parse(localStorage.getItem(this._lbsUser));
		user.user.entityIconImage = userImage;
		AuthenticationService.setSession(user);
	}
	
	setForceUpdateState(forceUpdate: boolean) {
		const user = JSON.parse(localStorage.getItem(this._lbsUser));
		user.auth.forceUpdate = forceUpdate;
		AuthenticationService.setSession(user);
	}
	
	setName(name: string) {
		const user = JSON.parse(localStorage.getItem(this._lbsUser));
		user.auth.name = name;
		AuthenticationService.setSession(user);
	}
}
