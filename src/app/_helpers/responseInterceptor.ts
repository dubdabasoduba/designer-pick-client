/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {catchError, map, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppCommons} from './app.commons';
import {appConstants} from './app.constants';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
	constructor(private router: Router) {
	}
	
	/**
	 * @desc Formats the response to a more usable form other than the API format
	 * @param body -- API response
	 * @return {any} -- Angular usable format
	 * @author dubdabasoduba
	 */
	private static formatResponse(body) {
		return body.response.data;
	}
	
	/**
	 *  @desc Intercepts all the responses from the API. Checks to see the response type then formats it to the correct type
	 * @param {@link HttpRequest<any>} request -- The response request
	 * @param {@link HttpHandler} next
	 * @return {@link Observable<HttpEvent<any>>}
	 * @author dubdabasoduba
	 */
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401 || error.status === 403) {
					this.redirectToLogin(request.url);
				} else {
					if (error instanceof HttpErrorResponse) {
						error = ResponseInterceptor.formatResponse(error.error);
					}
				}
				return throwError(error);
			}), map((event: HttpEvent<any>) => {
					if (!AppCommons.isObjectEmpty(event)) {
						if (event instanceof HttpResponse) {
							if (event.body.response) {
								event = event.clone({body: ResponseInterceptor.formatResponse(event.body)});
							}
						}
						
						return event;
					}
				}
			)
		);
	}
	
	/**
	 * @desc Redirects the user if they are not logged or their application is forbidden from accessing re.kast io
	 * @param url
	 * @author dubdabasoduba
	 */
	private redirectToLogin(url: string) {
		this.router.navigate([appConstants.authSIgnInUrl], {
			queryParams: {
				returnUrl: url
			}
		});
	}
}

