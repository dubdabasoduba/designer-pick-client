/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {Default} from './default';

export class Funding extends Default {
	name: string;
	amount: string;
	funding_date: string;
	entity: string;
	entityId: string;
	funding_type: string;
	funding_typeId: string;
	numberOfSponsors: string;
	sponsors: any;
	isLargest: string;
	sponsorName: string;
	sponsorId: string;
	sponsorType: boolean;
}

