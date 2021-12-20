/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {DefaultModel} from './default.model';

export class UserModel extends DefaultModel {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	verificationCode: string;
	verify: boolean;
	type: string;
	forceUpdate: boolean;
	person: string;
	name: string;
	account_type: number;
}
