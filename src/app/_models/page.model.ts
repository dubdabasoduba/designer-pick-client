/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

export class PageModel {
	totalItems: number;
	currentPage: number;
	pageSize: number;
	totalPages: number;
	startPage: number;
	endPage: number;
	startIndex: number;
	endIndex: number;
	pages: number[];
	page: number;
	limit: number;
	paginate: boolean;
}
