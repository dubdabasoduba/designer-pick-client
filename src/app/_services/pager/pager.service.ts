/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Injectable} from '@angular/core';
import {PageModel} from '../../_models';

@Injectable()
export class PagerService {
	getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
		// calculate total pages
		const totalPages = Math.ceil(totalItems / pageSize);
		
		// ensure current page isn't out of range
		if (currentPage < 1) {
			currentPage = 1;
		} else if (currentPage > totalPages) {
			currentPage = totalPages;
		}
		
		let startPage: number, endPage: number;
		if (totalPages <= 10) {
			// less than 10 total pages so show all
			startPage = 1;
			endPage = totalPages;
		} else {
			// more than 10 total pages so calculate start and end pages
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		}
		
		// calculate start and end item indexes
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
		
		// create an array of pages to ng-repeat in the pager control
		const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
		
		// return object with all pager properties required by the view
		const page = new PageModel();
		page.totalItems = totalItems;
		page.currentPage = currentPage;
		page.pageSize = pageSize;
		page.totalPages = totalPages;
		page.startPage = startPage;
		page.endPage = endPage;
		page.startIndex = startIndex;
		page.endIndex = endIndex;
		page.pages = pages;
		
		return page;
	}
	
}
