/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserContactsComponent} from './user-contacts.component';

describe('ContactsComponent', () => {
	let component: UserContactsComponent;
	let fixture: ComponentFixture<UserContactsComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [UserContactsComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(UserContactsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
