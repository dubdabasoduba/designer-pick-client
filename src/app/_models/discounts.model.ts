import {DefaultModel} from './default.model';

export class DiscountsModel extends DefaultModel {
	name: string;
	code: string;
	percentage: number;
	main: any;
	discountId: string;
}
