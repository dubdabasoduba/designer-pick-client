import {DefaultModel} from "./default.model";

export class Roles extends DefaultModel {
    name: string;
    description: string;
    permissions: string;
}
