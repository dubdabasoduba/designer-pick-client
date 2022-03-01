/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEditRolesComponent} from './add-edit-roles.component';

describe('AddEditRolesComponent', () => {
	let component: AddEditRolesComponent;
	let fixture: ComponentFixture<AddEditRolesComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [AddEditRolesComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(AddEditRolesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
