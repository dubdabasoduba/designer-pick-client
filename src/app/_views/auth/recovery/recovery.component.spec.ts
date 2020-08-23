/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecoveryComponent} from './recovery.component';

describe('RecoveryComponent', () => {
	let component: RecoveryComponent;
	let fixture: ComponentFixture<RecoveryComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RecoveryComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RecoveryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
