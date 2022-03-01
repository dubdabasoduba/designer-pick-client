/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewRolesComponent} from './view-roles.component';

describe('ViewRolesComponent', () => {
	let component: ViewRolesComponent;
	let fixture: ComponentFixture<ViewRolesComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [ViewRolesComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(ViewRolesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
