import {DefaultModel} from "./default.model";

export class SettingsModel extends DefaultModel {
    settings_key: string;
    settings_value: {
        settings: {
            name: string;
            value: string;
        }
    }
}
