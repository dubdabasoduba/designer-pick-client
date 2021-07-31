import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersonModel} from "../../../../_models";
import {AlertService, AuthenticationService, PersonsService} from "../../../../_services";
import {AppCommons} from "../../../../_helpers";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
	selector: 'app-view-users',
	templateUrl: './view-users.component.html',
	styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit, OnDestroy {
	loading = false;
	public model = {
		user_account: ""
	}
	public people: Array<PersonModel> = [];
	mySubscription: any;
	private accountType: string;
	
	constructor(private personsService: PersonsService, private alertService: AlertService,
	            private authenticationService: AuthenticationService, private router: Router,
	            private route: ActivatedRoute) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
		
		this.mySubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				// Trick the Router into believing it's last link wasn't previously loaded
				this.router.navigated = false;
			}
		});
	}
	
	ngOnDestroy() {
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
	}
	
	ngOnInit(): void {
		this.route.queryParamMap.subscribe(params => {
			this.accountType = params.get("account_type");
		});
		this.model.user_account = this.accountType;
		if (this.model.user_account != null && !AppCommons.isStringEmpty(this.model.user_account) && this.model.user_account != undefined) {
			this.getPersons(this.model.user_account);
		} else {
			this.people = [];
		}
	}
	
	resetUserCredentials(username: string) {
		this.loading = true;
		this.authenticationService.resetPasswordRequest(username).subscribe(
			data => {
				this.router.navigateByUrl("/users?account_type=" + this.model.user_account)
				this.loading = false;
			},
			error => {
				this.formatPermissions(error);
				this.loading = false;
			}
		);
	}
	
	getUserType(event: any) {
		this.people = [];
		this.model.user_account = event.target.value;
		if (this.model.user_account != null && !AppCommons.isStringEmpty(this.model.user_account) && this.model.user_account != undefined) {
			this.router.navigateByUrl("/users?account_type=" + this.model.user_account)
		}
	}
	
	/**
	 * Get the permissions in the system
	 */
	private getPersons(accountType: string) {
		this.loading = true;
		this.personsService.getPeople(accountType).subscribe(
			data => {
				this.formatPermissions(data);
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
	
	private formatPermissions(data: any) {
		for (let i = 0; i < data.length; i++) {
			let person = new PersonModel();
			person.name = data[i].name;
			person.username = data[i].username;
			person.phone_number = data[i].phone_number;
			person.email = data[i].email;
			let age = String(AppCommons.calculateAge(AppCommons.convertStringToDate(data[i].dob)));
			person.age = age == "undefined" ? "--" : age;
			person.account_type = data[i].account_type;
			person.date_created = AppCommons.formatDisplayDate(new Date(data[i].date_created));
			person.date_updated = AppCommons.formatDisplayDate(AppCommons.convertStringToDate(data[i].date_updated));
			person.is_active = data[i].is_active;
			person.reset = data[i].reset;
			person.user_uuid = data[i].user_uuid;
			person.uuid = data[i].uuid;
			this.people.push(person);
		}
	}
}
