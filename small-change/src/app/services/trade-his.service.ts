import { Injectable, Pipe,PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Trade } from '../models/trade';
import { User } from '../models/user';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class TradeHisService {

  trades:Trade[]=[
    {
      instrumentId:'A1234',
      quantity:24,
      executionPrice:200,
      direction:'B',
      order:undefined,
      clientId:123,
      tradeId:'T123',
      cashValue:3500,
      portfolioId:"123",
      transactionAt:new Date(Date.now())
    },
    {
      instrumentId:'A2341',
      quantity:20,
      executionPrice:300,
      direction:'S',
      order:undefined,
      clientId:456,
      tradeId:'T234',
      cashValue:4505,
      portfolioId:"123" ,
      transactionAt:new Date(Date.now())
    },
    {
      instrumentId:'A2341',
      quantity:20,
      executionPrice:300,
      direction:'S',
      order:undefined,
      clientId:456,
      tradeId:'T234',
      cashValue:4505,
      portfolioId:"123" ,
      transactionAt:new Date(Date.now())
    },
    {
      instrumentId:'A2341',
      quantity:20,
      executionPrice:300,
      direction:'S',
      order:undefined,
      clientId:456,
      tradeId:'T234',
      cashValue:4505,
      portfolioId:"123" ,
      transactionAt:new Date(Date.now())
    },
    {
      instrumentId:'A2341',
      quantity:20,
      executionPrice:300,
      direction:'S',
      order:undefined,
      clientId:1,
      tradeId:'T234',
      cashValue:4505,
      portfolioId:"123" ,
      transactionAt:new Date(Date.now())
    }
  ];

  constructor(private userService:UserServiceService) { }


  getTradeHis():Observable<Trade[]>{
    return(of(this.trades.filter((trade)=> trade.clientId==this.userService.getLoginUserId())));
  }

  addTradeHis(trade:Trade):Observable<Trade>{
    this.trades= [trade,...this.trades];
    return of(trade);
  }


}


