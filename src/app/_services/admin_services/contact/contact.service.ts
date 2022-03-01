/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {appConstants} from '../../../_helpers';
import {Observable} from 'rxjs';
import {ContactModel} from '../../../_models';

@Injectable({
	providedIn: 'root'
})
export class ContactService {
	
	constructor(private http: HttpClient) {
	}
	
	getContacts(id: string) {
		return this.http.get(appConstants.baseApiV1Url + '/contacts/' + id);
	}
	
	getContact(contactId: string): Observable<ContactModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/contact/' + contactId);
	}
	
	removeContact(id: string) {
		return this.http.delete(appConstants.baseApiV1Url + '/contact/' + id);
	}
	
	addContact(contact: ContactModel) {
		return this.http.post(appConstants.baseApiV1Url + '/contact', contact);
	}
	
	updateContact(contact: ContactModel) {
		return this.http.put(appConstants.baseApiV1Url + '/contact/' + contact.uuid, contact);
	}
}
