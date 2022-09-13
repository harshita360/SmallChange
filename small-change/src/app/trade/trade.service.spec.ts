import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Order } from '../models/order';
import { Trade } from '../models/trade';
import { UserServiceService } from '../services/user-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { TradeService } from './trade.service';

describe('TradeService', () => {
  let service: TradeService;
  let mockUserService:any;

  beforeEach(() => {
    mockUserService=jasmine.createSpyObj(['getLoginUserId'])
    TestBed.configureTestingModule({
      providers:[{provide: UserServiceService, useValue:mockUserService}],
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(TradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should place order ', fakeAsync( ()=>{
    mockUserService.getLoginUserId.and.returnValue(78658709)
    const order=new Order('123455',4,4.5,'123','B');
    let respOrder!:Trade
    service.buyAInstrument(order).subscribe(expecutedOrder=>{
      respOrder=expecutedOrder
    })

    tick(4000)
    expect(respOrder.clientId).toBe(78658709)
    expect(respOrder.order?.orderId).not.toBeNull()
  }))

  xit('should throw error on session timeout ', fakeAsync( ()=>{
    mockUserService.getLoginUserId.and.returnValue(undefined)
    const order=new Order('123455',4,4.5,'123','B');
    let errorMessage:string='';
    service.buyAInstrument(order).subscribe({
      next:() =>fail('shoild not be'),
      error: (e)=> errorMessage=e
    })

    tick(4000)
    expect(errorMessage).toBe('Please re login to buy a instrument')
  }))

});
