/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {appConstants} from '../../../../_helpers';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(
        private http: HttpClient
    ) {
    }

    uploadImage(image: any, userId: string) {
        return this.http.post(appConstants.baseApiV1Url + appConstants.uploadAvatarUrl + userId, {icon: image});
    }

    deactivateAccount(userDetails: any) {
        return this.http.post(appConstants.baseApiV1Url + appConstants.deactivateAccountUrl + userDetails.entity, userDetails);
    }

}
