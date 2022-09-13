import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Trade } from '../models/trade';
import { User } from '../models/user';

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
      clientId:'U123',
      tradeId:'T123',
      cashValue:3500
    },
    {
      instrumentId:'A2341',
      quantity:20,
      executionPrice:300,
      direction:'S',
      clientId:'U123',
      tradeId:'T234',
      cashValue:4505
    }
  ];

  constructor() { }

  getTradeHis():Observable<Trade[]>{
    return(of(this.trades));

  }
}
