import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientJudgingContestsComponent} from './client-judging-contests.component';

describe('ClientJudgingContestsComponent', () => {
    let component: ClientJudgingContestsComponent;
    let fixture: ComponentFixture<ClientJudgingContestsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClientJudgingContestsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientJudgingContestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
