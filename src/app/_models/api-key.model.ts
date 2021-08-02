import {DefaultModel} from "./default.model";

export class ApiKeyModel extends DefaultModel {
	api_key: string;
	name: string;
	expiry: string;
}
