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

@Injectable()
export class AuthenticationService {
    private _lbsUser = 'lbsUser';

    constructor(private http: HttpClient) {
    }

    private static setSession(response) {
        if (response && response.token) {
            localStorage.setItem('lbsUser', JSON.stringify(response));
        }
        return response;
    }

    login(username: string, password: string) {
        return this.http.post(appConstants.baseApiV1Url + '/auth/login', {
            username: username, password: AppCommons.generatePasswordHash(password)
        }).pipe(tap(response => AuthenticationService.setSession(response)));
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
            uuid: userId,
            reset_code: verificationCode,
            password: AppCommons.generatePasswordHash(password),
            confirmPassword: AppCommons.generatePasswordHash(confirmPassword)
        });
    }

    verifyAccount(userId: string, verificationCode: string) {
        return this.http.post(appConstants.baseApiV1Url + '/auth/verify-account', {
            uuid: userId, verificationCode: verificationCode
        });
    }

    logout() {
        localStorage.removeItem(this._lbsUser);
        this.http.get(appConstants.baseApiV1Url + '/auth/logout');
    }

    resendVerification(username: string) {
        return this.http.post(appConstants.baseApiV1Url + appConstants.resendCodeUrl, {username: username});
    }

    getToken() {
        const currentUser = JSON.parse(localStorage.getItem(this._lbsUser));
        return currentUser.token;
    }

    getCurrentUser(): User {
        return JSON.parse(localStorage.getItem(this._lbsUser));
    }

    setUpdatedProfileImage(userImage: string) {
        const user = JSON.parse(localStorage.getItem(this._lbsUser));
        user.entityIconImage = userImage;
        AuthenticationService.setSession(user);
    }

    setForceUpdateState(forceUpdate: boolean) {
        const user = JSON.parse(localStorage.getItem(this._lbsUser));
        user.forceUpdate = forceUpdate;
        AuthenticationService.setSession(user);
    }

    setName(name: string) {
        const user = JSON.parse(localStorage.getItem(this._lbsUser));
        user.name = name;
        AuthenticationService.setSession(user);
    }
}
