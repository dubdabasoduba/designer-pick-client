import {Injectable} from '@angular/core';
import {appConstants} from "../../../_helpers";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PaymentModeModel} from "../../../_models";

@Injectable({
    providedIn: 'root'
})
export class PaymentModesService {

    constructor(private http: HttpClient) {
    }

    getPaymentModes() {
        return this.http.get(appConstants.baseApiV1Url + '/payment-modes');
    }

    getPaymentMode(id: string): Observable<PaymentModeModel> {
        // @ts-ignore
        return this.http.get(appConstants.baseApiV1Url + '/payment-mode/' + id);
    }

    removePaymentMode(id: string) {
        return this.http.delete(appConstants.baseApiV1Url + '/payment-mode/' + id);
    }

    addPaymentMode(paymentModeModel: PaymentModeModel) {
        return this.http.post(appConstants.baseApiV1Url + '/payment-mode', paymentModeModel);
    }

    updatePaymentMode(paymentModeModel: PaymentModeModel) {
        return this.http.put(appConstants.baseApiV1Url + '/payment-mode/' + paymentModeModel.uuid, paymentModeModel);
    }
}
