<<<<<<< HEAD
import { Order } from "./order";

export class Trade {
    constructor(public instrumentId:string,public quantity:number,
        public executionPrice:number,
        public direction:string,
        public clientId:string,
  //      public order:Order,
        public tradeId:string,
        public cashValue:number
        ){}
=======
import { Order } from "./order"

export class Trade {

  constructor(
  public tradeId:string,
  public quantity: number,
  public executionPrice: number,
  public direction:string,
  public order:Order,
  public  cashValue: number,
  public  clientId: number,
  public  instrumentId: string){}
>>>>>>> origin/nikhil
}
