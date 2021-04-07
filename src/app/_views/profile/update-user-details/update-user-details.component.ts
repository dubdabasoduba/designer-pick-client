import {Component, OnInit} from '@angular/core';
import {AppCommons, appConstants} from "../../../_helpers";
import {AlertService, AuthenticationService, PersonsService, ProfileService} from "../../../_services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-update-user-details',
	templateUrl: './update-user-details.component.html',
	styleUrls: ['./update-user-details.component.css']
})
export class UpdateUserDetailsComponent implements OnInit {
	public imageIcon = appConstants.defaultImageIcon;
	loading = false;
	public model: any = {};
	public person: any;
	public personUuid: string;
	public returnUrl: string;
	private oldEmail: string;
	private contactUuid: string;
	private userUuid: string;

	constructor(
		private authenticationService: AuthenticationService,
		private profileService: ProfileService,
		private personService: PersonsService,
		private commons: AppCommons,
		private alertService: AlertService,
		private router: Router,
		private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.personUuid = params[appConstants.id];
		});
		this.returnUrl = this.router.url;
		if (!AppCommons.isStringEmpty(this.personUuid)) {
			this.getPerson();
		} else {
			this.router.navigateByUrl(this.returnUrl);
		}

		this.setEmptyModel();
	}

	updateModelObject(personObject: any) {
		this.person = personObject;
		this.model.uuid = personObject.uuid;
		this.model.name = personObject.name;
		this.model.email = personObject.email;
		this.oldEmail = personObject.email;
		this.model.phone_number = personObject.phone_number;
		this.model.dob = personObject.dob;
		this.model.gender = personObject.gender === null || personObject.gender === undefined ? appConstants.emptyEntry : personObject.gender;
		this.model.account_type = personObject.account_type;
		this.model.profile_image = personObject.profile_image;
		this.contactUuid = personObject.contact_uuid;
		this.userUuid = personObject.user_uuid;
	}

	editPerson() {
		if (AppCommons.isStringEmpty(this.model.name)) {
			this.alertService.error('Person name cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.account_type)) {
			this.alertService.error('Account type cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.dob)) {
			this.alertService.error('Date of birth cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.email)) {
			this.alertService.error('Email Address cannot be empty');
		} else if (AppCommons.isStringEmpty(this.model.phone_number)) {
			this.alertService.error('Phone number cannot be empty');
		} else if (!AppCommons.isStringEmpty(this.model.gender) &&
			(this.model.gender < 0 || this.model.gender > 3)) {
			this.alertService.error('Please select gender from the list provided');
		} else {
			this.updatePerson();
		}
	}

	private setEmptyModel() {
		this.model.uuid = appConstants.emptyEntry;
		this.model.name = appConstants.emptyEntry;
		this.model.phone_number = appConstants.emptyEntry;
		this.model.account_type = appConstants.emptyEntry;
		this.model.email = appConstants.emptyEntry;
		this.model.dob = appConstants.emptyEntry;
		this.model.gender = appConstants.emptyEntry;
		this.model.account_type = appConstants.emptyEntry;
		this.model.profile_image = appConstants.emptyEntry;
	}

	private getPerson() {
		this.loading = true;
		this.personService.getPersonById(this.personUuid).subscribe(
			data => {
				this.updateModelObject(data[0]);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}

	private updatePerson() {
		this.loading = true;
		this.personService.updatePerson(this.updateEntityObject()).subscribe(
			data => {
				this.authenticationService.setForceUpdateState(false);
				this.authenticationService.setName(this.model.name);
				this.alertService.success("User details updated successfully");
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}


	private updateEntityObject() {
		if (!AppCommons.isStringEmpty(this.personUuid)) {
			this.person.name = this.model.name;
			this.person.description = this.model.description;
			this.person.email = this.model.email;
			this.person.force_update = false;
			this.person.dob = this.model.dob;
			this.person.gender = this.model.gender;
			this.person.account_type = this.model.account_type;
			this.person.iconImage = this.model.profile_image;
			this.person.uuid = this.personUuid;
			this.person.phone_number = this.model.phone_number;
			this.person.contact_uuid = this.contactUuid;
			this.person.user_uuid = this.userUuid;
			return this.person;
		}
	}
}
