import { TestBed } from '@angular/core/testing';

import { TradeHisService } from './trade-his.service';
import { UserServiceService } from './user-service.service';

describe('TradeHisService', () => {
  let service: TradeHisService;
  let mockUserService;

  beforeEach(() => {
    mockUserService=jasmine.createSpyObj(['getLoginUserId'])
    TestBed.configureTestingModule({
      providers:[{provide:UserServiceService, useValue:mockUserService}]
    });
    service = TestBed.inject(TradeHisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
