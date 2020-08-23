/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {appConstants} from '../../_helpers/app.constants';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {AppCommons} from '../../_helpers/app.commons';
import {User} from '../../_models';

declare const FB: any;

@Injectable()
export class AuthenticationService {
	private _slimUser = 'slimUser';

	constructor(private http: HttpClient) {
		FB.init({
			appId: appConstants.facebookAppId,
			status: false, // the SDK will attempt to get info about the current user immediately after init
			cookie: true,  // enable cookies to allow the server to access
			// the session
			xfbml: false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social
			// plugins that have been added using XFBML
			version: 'v2.11' // use graph api version 2.5
		});
	}

	private static setSession(response) {
		if (response && response.token) {
			localStorage.setItem('slimUser', JSON.stringify(response));
		}
		return response;
	}

	login(username: string, password: string) {
		return this.http.post(appConstants.baseApiV1Url + '/auth/login', {
			username: username, password: AppCommons.generatePasswordHash(password)
		}).pipe(tap(response => AuthenticationService.setSession(response)));
	}

	fbLogin(endPoint) {
		return new Promise((resolve, reject) => {
			FB.login(result => {
				if (result.authResponse) {
					return this.http.post(appConstants.baseApiV1Url + '/auth/' + endPoint, {
						access_token: result.authResponse.accessToken
					}).pipe(tap(response => AuthenticationService.setSession(response)));
				} else {
					reject('Failed to generate token');
				}
			}, {scope: 'public_profile,email'});
		});
	}

	resetPasswordRequest(username: string) {
		return this.http.post(appConstants.baseApiV1Url + '/auth/reset-password', {
			username: username
		});
	}

	passwordChangeRequest(password: string, username: string) {
		return this.http.post(appConstants.baseApiV1Url + appConstants.passwordChangeUrl, {
			username: username, password: AppCommons.generatePasswordHash(password)
		});
	}

	updatePasswordAfterReset(userId: string, verificationCode: string, password: string, confirmPassword: string) {
		return this.http.post(appConstants.baseApiV1Url + '/auth/update-password', {
			userId: userId,
			verificationCode: verificationCode,
			password: AppCommons.generatePasswordHash(password),
			confirmPassword: AppCommons.generatePasswordHash(confirmPassword)
		});
	}

	verifyAccount(userId: string, verificationCode: string) {
		return this.http.post(appConstants.baseApiV1Url + '/auth/verify-account', {
			userId: userId, verificationCode: verificationCode
		});
	}

	logout() {
		localStorage.removeItem(this._slimUser);
		this.http.get(appConstants.baseApiV1Url + '/auth/logout');
	}

	resendVerification(username: string) {
		return this.http.post(appConstants.baseApiV1Url + appConstants.resendCodeUrl, {username: username});
	}

	getToken() {
		const currentUser = JSON.parse(localStorage.getItem(this._slimUser));
		return currentUser.token;
	}

	getCurrentUser(): User {
		return JSON.parse(localStorage.getItem(this._slimUser));
	}

	setUpdatedProfileImage(userImage: string) {
		const user = JSON.parse(localStorage.getItem(this._slimUser));
		user.entityIconImage = userImage;
		AuthenticationService.setSession(user);
	}

	setForceUpdateState(forceUpdate: boolean) {
		const user = JSON.parse(localStorage.getItem(this._slimUser));
		user.forceUpdate = forceUpdate;
		AuthenticationService.setSession(user);
	}
}
