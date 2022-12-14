/*
 * Copyright (c) 2019-2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SigninComponent} from './signin.component';

describe('SigninComponent', () => {
	let component: SigninComponent;
	let fixture: ComponentFixture<SigninComponent>;
	
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
				declarations: [SigninComponent]
			})
			.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(SigninComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
