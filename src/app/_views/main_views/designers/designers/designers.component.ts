/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthenticationService, PersonsService} from "../../../../_services";
import {PersonModel} from "../../../../_models";

@Component({
    selector: 'app-entity',
    templateUrl: './designers.component.html',
    styleUrls: ['./designers.component.css']
})

export class DesignersComponent implements OnInit {
    loading = false;
    public people: Array<PersonModel> = [];

    constructor(private personsService: PersonsService, private alertService: AlertService,
                private authenticationService: AuthenticationService, private router: Router,
                private route: ActivatedRoute) {
    }

    private static getPersonInitials(data: any, i: number) {
        let initials = data[i].name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    ngOnInit() {
        this.getPersons("1")
    }

    /**
     * Get the permissions in the system
     */
    private getPersons(accountType: string) {
        this.loading = true;
        this.personsService.getDesigners(accountType).subscribe(
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
            let initials = DesignersComponent.getPersonInitials(data, i);

            person.name = data[i].name;
            person.username = data[i].username;
            person.uuid = data[i].uuid;
            person.initials = initials;
            this.people.push(person);
        }
    }
}
