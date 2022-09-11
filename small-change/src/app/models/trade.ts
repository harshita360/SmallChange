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
}
