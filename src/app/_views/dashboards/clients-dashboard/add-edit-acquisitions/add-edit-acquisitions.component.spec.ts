/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEditAcquisitionsComponent} from './add-edit-acquisitions.component';

describe('AddEditAcquisitionsComponent', () => {
	let component: AddEditAcquisitionsComponent;
	let fixture: ComponentFixture<AddEditAcquisitionsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddEditAcquisitionsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddEditAcquisitionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
