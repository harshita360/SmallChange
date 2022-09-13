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
}
