import {Component, OnInit} from '@angular/core';
import {Person} from "../../../../_models";
import {AlertService, PersonsService} from "../../../../_services";
import {AppCommons} from "../../../../_helpers/app.commons";
import {Router} from "@angular/router";

@Component({
    selector: 'app-view-users',
    templateUrl: './view-users.component.html',
    styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
    loading = false;
    public people: Array<Person> = [];

    constructor(private personsService: PersonsService,
                private alertService: AlertService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getPersons();
    }

    /**
     * Get the permissions in the system
     */
    private getPersons() {
        this.loading = true;
        this.personsService.getPeople().subscribe(
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
            let person = new Person();
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
            person.user_uuid = data[i].user_uuid;
            person.uuid = data[i].uuid;
            this.people.push(person);
        }
    }

    deactivateUser(personId: string) {

    }

    resetUserCredentials(userId: string) {

    }
}
