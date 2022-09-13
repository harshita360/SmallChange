import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { InstrumentCategory } from '../models/instrument-category';
import { InstrumentPrice } from '../models/instrument-price';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { InstrumentService } from './instrument.service';

describe('InstrumentService', () => {
  let service: InstrumentService;
  let httpController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(InstrumentService);
    httpController=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should retrive all the instrument categories',fakeAsync(()=>{
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

  xit('should return instrument pricing based on the category sent to the service',fakeAsync(()=>{
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
        instrumentDescription:'Apple Inc. dummy' ,
        externalIdType:'CUSIP',
        externalId:'037833101',
        categoryId:'3',
        minQuantity:3 ,
        maxQuantity:180
      },
      {
        instrumentId:'678-123-457',
        instrumentDescription:'Alphabet dummy' ,
        externalIdType:'CUSIP',
        externalId:'02079K104',
        categoryId:'4',
        minQuantity:4 ,
        maxQuantity:20
      },
      {
        instrumentId:'768-345-558',
        instrumentDescription:'Alaska Air Group' ,
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
          priceTimestamp:new Date(Date.now()),
          instrument:service.instruments[0],
        },
        {
          'instrumentId':'678-123-457',
          askPrice:48,
          bidPrice:49.56,
          priceTimestamp:new Date(Date.now()),
          instrument:service.instruments[1],
        },
        {
          'instrumentId':'768-345-558',
          askPrice:121,
          bidPrice:124.56,
          priceTimestamp:new Date(Date.now()),
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
