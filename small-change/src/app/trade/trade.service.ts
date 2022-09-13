import { Injectable } from '@angular/core';
import { delay, Observable, of,  tap,  throwError } from 'rxjs';
import { Order } from '../models/order';
import { UserServiceService } from '../services/user-service.service';
import * as uuid from "uuid";
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trade } from '../models/trade';
import { TradeHisService } from '../services/trade-his.service';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private tradeUrl:string="http://localhost:3000/fmts/trades/trade"

  constructor(private userService:UserServiceService,private http:HttpClient, private activityService:TradeHisService) {
   }

  buyAInstrument(order:Order) : Observable<Trade> {
    const userId=this.userService.getLoginUserId()
    if(userId){
      order.setClientId(userId);
      const oderData={
        ...order,
        email: this.userService.getLoginUserEmail(),
        clientId:userId,
        token:this.userService.getLogedInUserToken()
      }
      const httpHeaders=new HttpHeaders({
        'Content-type':'application/json'
      })
      return this.http.post<Trade>(this.tradeUrl,oderData,{headers:httpHeaders})
      .pipe(tap((data)=>{ data.transactionAt=new Date(Date.now())  ;this.activityService.addTradeHis(data)}))

    }else{
      return throwError(()=>'Please re login to buy a instrument')
    }

  }
}
