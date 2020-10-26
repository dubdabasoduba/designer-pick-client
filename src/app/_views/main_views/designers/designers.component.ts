/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Entity} from '../../../_models';
import {AppCommons} from '../../../_helpers/app.commons';
import {appConstants} from '../../../_helpers/app.constants';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-entity',
    templateUrl: './designers.component.html',
    styleUrls: ['./designers.component.css']
})

export class DesignersComponent implements OnInit, OnDestroy {
    loading = false;
    public entity: Entity;
    public investments: any = [];
    public acquisitions: any = [];
    public investors: any = [];
    public founders: any = [];
    public industry: any = [];
    public social_media: any = [];
    public contacts: any = [];
    public subsidiaries: any = [];
    public pitch_video: any = appConstants.emptyEntry;
    public categories: any = [];
    public showEditButtons = false;
    public claimed = true;
    public display = true;
    navigationEnd;
    private entityId: string;

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
