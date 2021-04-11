/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs';
import {AlertModel, AlertType} from '../../_models';

@Injectable()
export class AlertService {
    private subject = new Subject<AlertModel>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert message on routes change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                // only keep for a single location change
                this.keepAfterRouteChange = false;
            } else {
                // clear the alert
                this.clear();
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: any, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, keepAfterRouteChange);
    }

    error(message: any, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, keepAfterRouteChange);
    }

    info(message: any, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, keepAfterRouteChange);
    }

    warn(message: any, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, keepAfterRouteChange);
    }

    alert(type: AlertType, message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next(<AlertModel>{
            type: type,
            message: message
        });
    }

    clear() {
        this.subject.next();
    }

}
