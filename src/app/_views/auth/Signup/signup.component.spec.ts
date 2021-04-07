/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SignupComponent} from './signup.component';

describe('SignupComponent', () => {
	let component: SignupComponent;
	let fixture: ComponentFixture<SignupComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SignupComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SignupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
