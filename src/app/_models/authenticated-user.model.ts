/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

export class AuthenticatedUserModel {
	user: {
		uuid: string;
		username: string;
		status: number,
		person: string;
		account_type: number,
		name: string,
		profile_image: string
		email: string;
		type: string;
	};
	auth: {
		token: string;
		verify: number;
		forceUpdate: number;
		update_on_first_login: number;
		permissions: [];
		password: string;
	};
}
