/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppCommons} from '../../../_helpers/app.commons';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-entity',
    templateUrl: './designers.component.html',
    styleUrls: ['./designers.component.css']
})

export class DesignersComponent implements OnInit, OnDestroy {
    loading = false;
    navigationEnd;

    constructor(
        private commons: AppCommons,
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer) {
        /*this.navigationEnd = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.resetEntries();
                this.getEntityInformation();
            }
        });*/
    }

    ngOnInit() {
        /*if (this.commons.isObjectEmpty(this.entity)) {
            this.getEntityInformation();
        }*/
    }

    ngOnDestroy() {
        if (this.navigationEnd) {
            this.navigationEnd.unsubscribe();
        }
    }
}
