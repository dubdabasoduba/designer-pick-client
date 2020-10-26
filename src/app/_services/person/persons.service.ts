/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {appConstants} from '../../_helpers/app.constants';
import {HttpClient} from '@angular/common/http';
import {PersonModel} from '../../_models';
import {Observable} from "rxjs";

@Injectable()
export class PersonsService {
    constructor(private http: HttpClient) {
    }

    getPeople() {
        return this.http.get(appConstants.baseApiV1Url + appConstants.peopleUrl);
    }

    getPersonById(personId: string): Observable<PersonModel> {
        // @ts-ignore
        return this.http.get(appConstants.baseApiV1Url + appConstants.personUrl + personId);
    }

    getPersonEntityById(personId: string) {
        return this.http.get(appConstants.baseApiV1Url + appConstants.personEntityUrl + personId);
    }

    getPersonCount() {
        return <any>this.http.get(appConstants.baseApiV1Url + appConstants.peopleCount);
    }

    updatePerson(person: PersonModel): Observable<PersonModel> {
        return this.http.put<PersonModel>(appConstants.baseApiV1Url + appConstants.personUrl + person.uuid, person);
    }

    addPerson(person: PersonModel): Observable<PersonModel> {
        return this.http.post<PersonModel>(appConstants.baseApiV1Url + appConstants.personUrl, person);
    }

    removePerson(personId: string) {
        return this.http.delete(appConstants.baseApiV1Url + appConstants.personUrl + personId);
    }

    getUserRoles(userId: string) {
        return this.http.get(appConstants.baseApiV1Url + '/person-roles/' + userId);
    }
}


