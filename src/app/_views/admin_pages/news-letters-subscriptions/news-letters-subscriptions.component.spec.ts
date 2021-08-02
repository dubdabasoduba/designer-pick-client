import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsLettersSubscriptionsComponent} from './news-letters--subscriptions.component';

describe('NewsLettersComponent', () => {
	let component: NewsLettersSubscriptionsComponent;
	let fixture: ComponentFixture<NewsLettersSubscriptionsComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [NewsLettersSubscriptionsComponent]
			})
			.compileComponents();
	});
	
	beforeEach(() => {
		fixture = TestBed.createComponent(NewsLettersSubscriptionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
