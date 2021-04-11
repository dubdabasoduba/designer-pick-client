import {DefaultModel} from "./default.model";

export class RolesModel extends DefaultModel {
    name: string;
    description: string;
    permissions: string;
}
