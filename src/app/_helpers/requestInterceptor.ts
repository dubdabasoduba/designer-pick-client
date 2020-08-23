/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {appConstants} from './app.constants';
import {AuthenticationService} from '../_services';
import {Injectable} from '@angular/core';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

	constructor(public authService: AuthenticationService) {
	}

	/**
	 * @desc Intercepts the http request and adds in the authorization headers for the server
	 * @param request {@link HttpRequest<any>}
	 * @param next
	 * @return request with headers
	 * @author dubdabasoduba
	 */
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const apiKey = '$2y$10$WxHfCRVuddwDKO88pwK5VOsSOiKYNxufCDyJwcywDKInCFwOM3GKO';

		if (this.authService.getCurrentUser() && this.authService.getToken()) {
			const requestType = request.method;
			let httpRequest = null;
			httpRequest = this.attachTokens(requestType, httpRequest, request, apiKey);
			return next.handle(httpRequest);
		} else {
			const httpRequest = request.clone({setHeaders: {token: apiKey}});
			return next.handle(httpRequest);
		}
	}

	/**
	 * Attaches the auth tokens to allow the CRUD functions to run.
	 * @param requestType {@link String}
	 * @param httpRequest {@link Object}
	 * @param request {@link Request}
	 * @param apiKey {@link String}
	 * @author dubdabasoduba
	 */
	private attachTokens(requestType: string, httpRequest, request: HttpRequest<any>, apiKey: string) {
		if (requestType === appConstants.put || requestType === appConstants.post || requestType === appConstants.delete) {
			httpRequest = request.clone({
				setHeaders: {
					Authorization: this.authService.getToken(),
					token: apiKey
				}
			});
			this.setCurrentUser(httpRequest);
		} else {
			httpRequest = request.clone({
				setHeaders: {
					token: apiKey
				}
			});
		}
		return httpRequest;
	}

	/**
	 * Sets the currently logged in user id to request body
	 * @param httpRequest {@link Object}
	 * @author dubdabasoduba
	 */
	private setCurrentUser(httpRequest) {
		if (httpRequest.body !== null) {
			httpRequest.body.currentUser = this.authService.getCurrentUser().id;
		}
	}
}

