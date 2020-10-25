import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appConstants} from "../../../_helpers/app.constants";
import {Observable} from "rxjs";
import {ContactModel} from "../../../_models";

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private http: HttpClient) {
    }

    getContacts(id: string) {
        return this.http.get(appConstants.baseApiV1Url + "/contacts/" + id);
    }

    getContact(contactId: string): Observable<ContactModel> {
        // @ts-ignore
        return this.http.get(appConstants.baseApiV1Url + "/contact/" + contactId);
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
