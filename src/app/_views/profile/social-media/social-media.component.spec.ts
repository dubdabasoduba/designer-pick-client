/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SocialMediaComponent} from './social-media.component';

describe('SocialMediaComponent', () => {
	let component: SocialMediaComponent;
	let fixture: ComponentFixture<SocialMediaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SocialMediaComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SocialMediaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
