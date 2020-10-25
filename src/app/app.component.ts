/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {AlertService, AuthenticationService} from "./_services";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    loadThirdPartyJsFiles;
    public date;
    loading = false;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        /**
         * @desc this piece is to enable the dynamic addition of the 3rd party js files for enable execution of the js
         * related functions event after route change
         * @author dubdabasoduba
         */
        this.loadThirdPartyJsFiles = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                const jsFiles = [
                    'assets/lib/jquery/jquery.min.js',
                    'assets/lib/bootstrap/js/bootstrap.bundle.min.js',
                    'assets/lib/feather-icons/feather.min.js',
                    'assets/lib/perfect-scrollbar/perfect-scrollbar.min.js',
                    'assets/lib/jquery.flot/jquery.flot.js',
                    'assets/lib/jquery.flot/jquery.flot.stack.js',
                    'assets/lib/jquery.flot/jquery.flot.resize.js',
                    'assets/lib/chart.js/Chart.bundle.min.js',
                    'assets/lib/jqvmap/jquery.vmap.min.js',
                    'assets/lib/jqvmap/maps/jquery.vmap.usa.js',
                    'assets/js/dashforge.js',
                    'assets/js/dashforge.sampledata.js',
                    'assets/js/dashboard-one.js',
                    'assets/lib/js-cookie/js.cookie.js',
                    'assets/js/tooltip.js',
                    "assets/vendor/jquery.easing/jquery.easing.min.js",
                    "assets/vendor/php-email-form/validate.js",
                    "assets/vendor/waypoints/jquery.waypoints.min.js",
                    "assets/vendor/counterup/counterup.min.js",
                    "assets/vendor/isotope-layout/isotope.pkgd.min.js",
                    "assets/vendor/venobox/venobox.min.js",
                    "assets/vendor/owl.carousel/owl.carousel.min.js",
                    "assets/vendor/aos/aos.js",
                    "assets/js/main.js"
                ];

                jsFiles.forEach((jsFile) => {
                    const script: HTMLScriptElement = document.createElement('script');
                    script.setAttribute('type', 'text/javascript');
                    script.setAttribute('src', jsFile);
                    script.async = false;
                    script.charset = 'utf-8';
                    document.getElementsByTagName('head')[0].appendChild(script);
                });
            }
        });

        this.date = new Date().getFullYear();
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
        if (this.loadThirdPartyJsFiles) {
            this.loadThirdPartyJsFiles.unsubscribe();
        }
    }
}
