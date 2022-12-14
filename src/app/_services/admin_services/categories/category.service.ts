/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {appConstants} from '../../../_helpers';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../../../_models';
import {Observable} from 'rxjs';

@Injectable()
export class CategoryService {
	
	constructor(private http: HttpClient) {
	}
	
	getCategories() {
		return this.http.get(appConstants.baseApiV1Url + '/categories');
	}
	
	getCategory(id: string): Observable<CategoryModel> {
		// @ts-ignore
		return this.http.get(appConstants.baseApiV1Url + '/category/' + id);
	}
	
	removeCategory(id: string) {
		return this.http.delete(appConstants.baseApiV1Url + '/category/' + id);
	}
	
	addCategory(category: CategoryModel) {
		return this.http.post(appConstants.baseApiV1Url + '/category', category);
	}
	
	updateCategory(category: CategoryModel) {
		return this.http.put(appConstants.baseApiV1Url + '/category/' + category.uuid, category);
	}
	
	getIndustries(paginate: boolean) {
		return this.http.get(appConstants.baseApiV1Url + '/industries' + '?' + appConstants.pagination + paginate);
	}
	
}
