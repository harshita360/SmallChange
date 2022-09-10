import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Order } from '../models/order';
import { UserServiceService } from '../services/user-service.service';

import { TradeService } from './trade.service';

describe('TradeService', () => {
  let service: TradeService;
  let mockUserService:any;

  beforeEach(() => {
    mockUserService=jasmine.createSpyObj(['getLoginUserId'])
    TestBed.configureTestingModule({
      providers:[{provide: UserServiceService, useValue:mockUserService}]
    });
    service = TestBed.inject(TradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should place order ', fakeAsync( ()=>{
    mockUserService.getLoginUserId.and.returnValue('123-123-765')
    const order=new Order('123455',4,4.5,'123','B');
    let respOrder!:Order
    service.buyAInstrument(order).subscribe(expecutedOrder=>{
      respOrder=expecutedOrder
    })

    tick(4000)
    expect(respOrder.clientId).toBe('123-123-765')
    expect(respOrder.orderId).not.toBeNull()
  }))

  it('should throw error on session timeout ', fakeAsync( ()=>{
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
