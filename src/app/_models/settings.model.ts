import {DefaultModel} from "./default.model";

export class SettingsModel extends DefaultModel {
	setting_key: string;
	setting_value: {
		settings: {
			name: string;
			value: string;
		}
	}
}
