import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JudgingContestsComponent} from './judging-contests.component';

describe('JudgingContestsComponent', () => {
    let component: JudgingContestsComponent;
    let fixture: ComponentFixture<JudgingContestsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [JudgingContestsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JudgingContestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
