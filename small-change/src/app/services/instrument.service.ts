import { Injectable } from '@angular/core';
import { delay, map, mergeMap, Observable, of, tap } from 'rxjs';
import { Instrument } from '../models/instrument';
import { InstrumentCategory } from '../models/instrument-category';
import { InstrumentPrice } from '../models/instrument-price';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  instruments:Instrument[]=[
    {
      instrumentId:'123-123-456',
      description:'Apple Inc.' ,
      externalIdType:'CUSIP',
      externalId:'037833100',
      categoryId:'1',
      minQuantity:1 ,
      maxQuantity:200
    },
    {
      instrumentId:'678-123-456',
      description:'Alphabet Inc.' ,
      externalIdType:'CUSIP',
      externalId:'02079K107',
      categoryId:'2',
      minQuantity:3 ,
      maxQuantity:19
    },
    {
      instrumentId:'768-345-556',
      description:'Alaska Air Group' ,
      externalIdType:'CUSIP',
      externalId:'011659109',
      categoryId:'1',
      minQuantity:1 ,
      maxQuantity:20
    },
    {
      instrumentId:'123-456-456',
      description:'Walmart Stores, Inc. ' ,
      externalIdType:'CUSIP',
      externalId:'931142103',
      categoryId:'2',
      minQuantity:1 ,
      maxQuantity:200
    }
  ]

  categories:InstrumentCategory[]=[
    {
      categoryId:'1',
      categoryName:'Cat -1'
    },
    {
      categoryId:'2',
      categoryName:'Cat -2'
    }
  ]

  instrumentPrices :InstrumentPrice[]  = [
    {
      'instrumentId':'123-123-456',
      askPrice:34,
      bidPrice:33.56,
      timestamp:new Date(Date.now()),
      instrument:this.instruments[0],
    },
    {
      'instrumentId':'678-123-456',
      askPrice:40,
      bidPrice:41.56,
      timestamp:new Date(Date.now()),
      instrument:this.instruments[1],
    },
    {
      'instrumentId':'768-345-556',
      askPrice:120,
      bidPrice:121.56,
      timestamp:new Date(Date.now()),
      instrument:this.instruments[2],
    },
    {
      'instrumentId':'123-456-456',
      askPrice:180,
      bidPrice:182.12,
      timestamp:new Date(Date.now()),
      instrument:this.instruments[3],
    },

  ]



  constructor() { }

  getAllCategories():Observable<InstrumentCategory[]>{
    return of(this.categories);
  }

  getInstrumentsByCategory(categoryId:string) :Observable<InstrumentPrice[]> {
    return of(this.instruments.filter(i => i.categoryId===categoryId))
    .pipe(
      mergeMap(data=> {
        let instrumentIds:string[]=data.map(i => i.instrumentId);
        return this.getTheInstrumentPriceDetails(instrumentIds).pipe(
          map(prices=> { return prices;}),
          delay(2000)
        )
      })
    )
  }

  getTheInstrumentPriceDetails(instrumentIds:string[]): Observable<InstrumentPrice[]>{
    return of(this.instrumentPrices.filter( ip => instrumentIds.includes(ip.instrumentId))).pipe(
      delay(2000)
    )
  }
}
