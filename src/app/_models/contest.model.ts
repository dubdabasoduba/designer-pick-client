import {LogoBriefModel} from "./logo-brief.model";

export class ContestModel extends LogoBriefModel {
	style: string;
	logo_uses: string;
	start_date: string;
	end_date: string;
	amount: string;
	stage: string;
	logo_brief: string;
	contest_period: string;
	is_featured: boolean;
	is_featured_charged_amount: number;
	is_private: boolean;
	is_private_amount_charged: number;
	is_highlighted: boolean;
	is_highlighted_amount_charged: number;
}
