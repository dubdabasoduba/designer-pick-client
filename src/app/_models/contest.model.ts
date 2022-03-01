/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {LogoBriefModel} from './logo-brief.model';

export class ContestModel extends LogoBriefModel {
	style: string;
	logo_uses: string;
	start_date: string;
	end_date: string;
	amount: string;
	stage: string;
	logo_brief: string;
	duration: string;
	is_featured: boolean;
	is_featured_charged_amount: number;
	is_private: boolean;
	is_private_amount_charged: number;
	is_highlighted: boolean;
	is_highlighted_amount_charged: number;
	title: string;
	entries: string;
}
