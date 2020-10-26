/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {appConstants} from '../../_helpers/app.constants';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    entityData: Observable<any>;
    personData: Observable<any>;
    private entityDataSubject = new Subject<any>();
    private personDataSubject = new Subject<any>();

    constructor(private http: HttpClient) {
        this.entityData = this.entityDataSubject.asObservable();
        this.personData = this.personDataSubject.asObservable();
    }

    /**
     * @desc Search entities from the database
     * @param searchTerm {@link String}
     * @author dubdabasoduba
     */
    searchEntity(searchTerm: string) {
        const params = new HttpParams().set('q', searchTerm);
        return this.http.get(appConstants.baseApiV1Url + appConstants.searchEntity, {params});
    }

    /**
     * @desc Search persons from the database
     * @param searchTerm {@link String}
     * @author dubdabasoduba
     */
    searchPerson(searchTerm: string) {
        const params = new HttpParams().set('q', searchTerm);
        return this.http.get(appConstants.baseApiV1Url + appConstants.searchPerson, {params});
    }

    /**
     * @desc passes the contests data from the navigation component to the results component
     * @param data {@link Array}
     * @author dubdabasoduba
     */
    passEntityData(data: any) {
        this.entityDataSubject.next(data);
    }

    /**
     * @desc passes the person data from the navigation component to the results component
     * @param data {@link Array}
     * @author dubdabasoduba
     */
    passPersonData(data: any) {
        this.personDataSubject.next(data);
    }
}
