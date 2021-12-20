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
