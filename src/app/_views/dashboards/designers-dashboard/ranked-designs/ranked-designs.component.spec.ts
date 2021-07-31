import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RankedDesignsComponent} from './ranked-designs.component';

describe('RankedDesignsComponent', () => {
	let component: RankedDesignsComponent;
	let fixture: ComponentFixture<RankedDesignsComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [RankedDesignsComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(RankedDesignsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
