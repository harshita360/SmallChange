import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyInstrumentComponent } from './buy-instrument.component';

describe('BuyInstrumentComponent', () => {
  let component: BuyInstrumentComponent;
  let fixture: ComponentFixture<BuyInstrumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyInstrumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
