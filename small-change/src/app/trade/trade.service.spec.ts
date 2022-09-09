import { fakeAsync, TestBed } from '@angular/core/testing';
import { UserServiceService } from '../services/user-service.service';

import { TradeService } from './trade.service';

describe('TradeService', () => {
  let service: TradeService;
  let mockUserService;

  beforeEach(() => {
    let mockUserService=jasmine.createSpyObj(['getLoginUserId'])
    mockUserService.getLoginUserId.and.returnValue('123-123-765')
    TestBed.configureTestingModule({
      providers:[{provide: UserServiceService, useValue:mockUserService}]
    });
    service = TestBed.inject(TradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
