/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {AuthenticationService} from '../_services';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

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
		if (this.authService.getCurrentUser() && this.authService.getToken()) {
			let httpRequest = null;
			httpRequest = this.attachTokens(httpRequest, request, environment.apiKey);
			return next.handle(httpRequest);
		} else {
			const httpRequest = request.clone({setHeaders: {Authorization: environment.apiKey}});
			return next.handle(httpRequest);
		}
	}
	
	/**
	 * Attaches the authentication tokens to allow the CRUD functions to run.
	 * @param httpRequest {@link Object}
	 * @param request {@link Request}
	 * @param apiKey {@link String}
	 * @author dubdabasoduba
	 */
	private attachTokens(httpRequest, request: HttpRequest<any>, apiKey: string) {
		httpRequest = request.clone({
			setHeaders: {
				Authorization: 'Bearer ' + this.authService.getToken() + apiKey
			}
		});
		this.setCurrentUser(httpRequest);
		return httpRequest;
	}
	
	/**
	 * Sets the currently logged in user id to request body
	 * @param httpRequest {@link Object}
	 * @author dubdabasoduba
	 */
	private setCurrentUser(httpRequest) {
		if (httpRequest.body !== null) {
			httpRequest.body.currentUser = this.authService.getCurrentUser().user.uuid;
		}
	}
}

