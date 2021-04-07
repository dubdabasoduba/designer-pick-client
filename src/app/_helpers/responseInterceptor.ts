/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppCommons} from './app.commons';
import {appConstants} from './app.constants';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
	constructor(private router: Router, private commons: AppCommons) {
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
		return next.handle(request).map(data => {
			if (!this.commons.isObjectEmpty(data)) {
				if (data instanceof HttpResponse) {
					data = data.clone({
						body: ResponseInterceptor.formatResponse(data.body)
					});
				}
				return data;
			}
		}).catch((error: any) => {
			if (error.status === 401 || error.status === 403) {
				this.redirectToLogin(error.url);
			} else {
				if (error instanceof HttpErrorResponse) {
					error = ResponseInterceptor.formatResponse(error.error);
				}
			}
			return throwError(error);
		});
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

