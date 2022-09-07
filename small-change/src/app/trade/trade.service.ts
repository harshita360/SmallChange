import { Injectable } from '@angular/core';
import { delay, Observable, of,  throwError } from 'rxjs';
import { Order } from '../models/order';
import { UserServiceService } from '../services/user-service.service';
import * as uuid from "uuid";

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private userService:UserServiceService) {
   }

  buyAInstrument(order:Order) : Observable<Order> {
    const userId=this.userService.getLoginUserId()
    if(userId){
      order.setClientId(userId);
      order.serOrderId(uuid.v4())
      return of(order).pipe(
        delay(3000)
      )
    }else{
      return throwError(()=>'Please re login to buy a instrument')
    }

  }
}
