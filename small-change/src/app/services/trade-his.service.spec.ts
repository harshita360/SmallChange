import { TestBed } from '@angular/core/testing';

import { TradeHisService } from './trade-his.service';

describe('TradeHisService', () => {
  let service: TradeHisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeHisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
