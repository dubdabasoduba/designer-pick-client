import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogoUsesComponent} from './logo-uses.component';

describe('LogoUsesComponent', () => {
	let component: LogoUsesComponent;
	let fixture: ComponentFixture<LogoUsesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LogoUsesComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LogoUsesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
