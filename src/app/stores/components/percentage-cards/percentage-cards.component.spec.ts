import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageCardsComponent } from './percentage-cards.component';

describe('PercentageCardsComponent', () => {
  let component: PercentageCardsComponent;
  let fixture: ComponentFixture<PercentageCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
