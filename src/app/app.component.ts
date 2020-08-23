/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
	loadThirdPartyJsFiles;

	constructor(
		private route: ActivatedRoute,
		private router: Router) {
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
					'assets/js/jquery/jquery.min.js',
					'assets/js/jquery/jquery-ui.min.js',
					'assets/js/bootstrap/popper.min.js',
					'assets/js/bootstrap/bootstrap.min.js',
					'assets/js/modernizr.js',
					'assets/js/theme/pcoded.min.js',
					'assets/js/theme/theme.js',
					'assets/js/social/facebook.min.js',
					'assets/js/social/linkedin.min.js'
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
	}

	ngAfterViewInit() {
	}

	ngOnDestroy(): void {
		if (this.loadThirdPartyJsFiles) {
			this.loadThirdPartyJsFiles.unsubscribe();
		}
	}
}
