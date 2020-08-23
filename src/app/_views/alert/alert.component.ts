/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Alert, AlertType} from '../../_models';
import {AlertService} from '../../_services';
import {Observable, Subscription} from 'rxjs';
import 'rxjs/add/observable/timer';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
	alerts: Alert[] = [];
	private subscription: Subscription;
	private timer: Observable<any>;
	private alert: Alert;

	constructor(private alertService: AlertService) {
	}

	ngOnInit() {
		this.alertService.getAlert().subscribe((alert: Alert) => {
			if (!alert) {
				this.alerts = [];
				return;
			}

			this.alert = alert;
			this.alerts.push(alert);
		});
		this.setTimer();
	}

	removeAlert(alert: Alert) {
		this.alerts = this.alerts.filter(x => x !== alert);
	}

	cssClass(alert: Alert) {
		if (!alert) {
			return;
		}

		// return css class based on alert type
		switch (alert.type) {
			case AlertType.Success:
				return 'alert alert-success background-success';
			case AlertType.Error:
				return 'alert alert-danger background-danger';
			case AlertType.Info:
				return 'alert alert-info background-info';
			case AlertType.Warning:
				return 'alert alert-warning background-warning';
		}
	}

	ngOnDestroy(): void {
		if (this.subscription && this.subscription instanceof Subscription) {
			this.subscription.unsubscribe();
		}
	}

	public setTimer() {
		this.timer = Observable.timer(5000);
		this.subscription = this.timer.subscribe(() => {
			this.alerts = this.alerts.filter(x => x !== this.alert);
		});
	}
}
