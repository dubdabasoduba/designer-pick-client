/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {DefaultModel} from './default.model';

export class DiscountsModel extends DefaultModel {
	name: string;
	code: string;
	percentage: number;
	main: any;
	discountId: string;
}
