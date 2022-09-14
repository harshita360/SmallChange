import { Instrument } from "./instrument";

export class InstrumentPrice {

  constructor(
    public instrumentId:string,
    public bidPrice:number,
    public askPrice:number,
    public timestamp:Date,
    public instrument:Instrument
  ){}
}
