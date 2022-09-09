import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { InstrumentCategory } from '../models/instrument-category';
import { InstrumentPrice } from '../models/instrument-price';

import { InstrumentService } from './instrument.service';

describe('InstrumentService', () => {
  let service: InstrumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstrumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrive all the instrument categories',fakeAsync(()=>{
    service.categories=[
      {
        categoryId:'3',
        categoryName:'Cat -2'
      }
    ]
    let returnedCategories:InstrumentCategory[]=[];
    service.getAllCategories().subscribe(data=> returnedCategories=data);
    tick()
    expect(returnedCategories.length).toBe(1)
  }))

  it('should return instrument pricing based on the category sent to the service',fakeAsync(()=>{
    service.categories=[
      {
        categoryId:'3',
        categoryName:'Cat -2'
      },
      {
        categoryId:'4',
        categoryName:'Cat -4'
      }
    ]
    service.instruments=[
      {
        instrumentId:'123-123-098',
        description:'Apple Inc. dummy' ,
        externalIdType:'CUSIP',
        externalId:'037833101',
        categoryId:'3',
        minQuantity:3 ,
        maxQuantity:180
      },
      {
        instrumentId:'678-123-457',
        description:'Alphabet dummy' ,
        externalIdType:'CUSIP',
        externalId:'02079K104',
        categoryId:'4',
        minQuantity:4 ,
        maxQuantity:20
      },
      {
        instrumentId:'768-345-558',
        description:'Alaska Air Group' ,
        externalIdType:'CUSIP',
        externalId:'011659104',
        categoryId:'4',
        minQuantity:4 ,
        maxQuantity:200
      }]

      service.instrumentPrices  = [
        {
          'instrumentId':'123-123-098',
          askPrice:56,
          bidPrice:56.56,
          timestamp:new Date(Date.now()),
          instrument:service.instruments[0],
        },
        {
          'instrumentId':'678-123-457',
          askPrice:48,
          bidPrice:49.56,
          timestamp:new Date(Date.now()),
          instrument:service.instruments[1],
        },
        {
          'instrumentId':'768-345-558',
          askPrice:121,
          bidPrice:124.56,
          timestamp:new Date(Date.now()),
          instrument:service.instruments[2],
        }]

      let returnedInstruments: InstrumentPrice[]=[]
      service.getInstrumentsByCategory('3').subscribe(data=> returnedInstruments=data);
      tick(4000)
      console.log(returnedInstruments)
      expect(returnedInstruments.length).toEqual(1)
      expect(returnedInstruments[0].instrument.instrumentId).toBe('123-123-098')

  }))
});
