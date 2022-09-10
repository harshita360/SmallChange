import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { Instrument } from 'src/app/models/instrument';
import { InstrumentCategory } from 'src/app/models/instrument-category';
import { InstrumentPrice } from 'src/app/models/instrument-price';
import { Order } from 'src/app/models/order';
import { InstrumentService } from 'src/app/services/instrument.service';
import { TradeService } from '../trade.service';
import * as uuid from "uuid";

import { BuyInstrumentComponent } from './buy-instrument.component';

describe('BuyInstrumentComponent', () => {
  let component: BuyInstrumentComponent;
  let fixture: ComponentFixture<BuyInstrumentComponent>;
  let mockInstrumentService,mockSpinnerService,mockRouter,mockTradeService;

  let instruments:Instrument[]=[
    {
      instrumentId:'abc-frd-def',
      description:'Apple Inc.' ,
      externalIdType:'CUSIP',
      externalId:'037833100',
      categoryId:'10',
      minQuantity:1 ,
      maxQuantity:200
    },
    {
      instrumentId:'76t-dse-123',
      description:'Alphabet Inc.' ,
      externalIdType:'CUSIP',
      externalId:'02079K107',
      categoryId:'20',
      minQuantity:3 ,
      maxQuantity:19
    },
    {
      instrumentId:'uytd-trf',
      description:'Alaska Air Group' ,
      externalIdType:'CUSIP',
      externalId:'011659109',
      categoryId:'10',
      minQuantity:1 ,
      maxQuantity:20
    },
    {
      instrumentId:'hgd-hgd-trd',
      description:'Walmart Stores, Inc. ' ,
      externalIdType:'CUSIP',
      externalId:'931142103',
      categoryId:'20',
      minQuantity:1 ,
      maxQuantity:200
    }
  ]

  let categories:InstrumentCategory[]=[
    {
      categoryId:'10',
      categoryName:'Cat -10'
    },
    {
      categoryId:'12',
      categoryName:'Cat -20'
    }
  ]

  let instrumentPrices :InstrumentPrice[]  = [
    {
      'instrumentId':'abc-frd-def',
      askPrice:34,
      bidPrice:33.56,
      timestamp:new Date(Date.now()),
      instrument:instruments[0],
    },
    {
      'instrumentId':'76t-dse-123',
      askPrice:40,
      bidPrice:41.56,
      timestamp:new Date(Date.now()),
      instrument:instruments[1],
    },
    {
      'instrumentId':'uytd-trf',
      askPrice:60,
      bidPrice:60.56,
      timestamp:new Date(Date.now()),
      instrument:instruments[2],
    },
    {
      'instrumentId':'hgd-hgd-trd',
      askPrice:181,
      bidPrice:184.12,
      timestamp:new Date(Date.now()),
      instrument:instruments[3],
    },

  ]

  beforeEach(async () => {

    mockRouter=jasmine.createSpyObj(['navigate'])
    mockRouter.navigate.and.callFake(()=>{})

    mockInstrumentService=jasmine.createSpyObj(['getAllCategories','getInstrumentsByCategory'])


    mockInstrumentService.getAllCategories.and.returnValue(of(categories))
    mockInstrumentService.getInstrumentsByCategory.and.callFake((catId:string)=>{
      return of(instrumentPrices.filter(i=> i.instrument.categoryId===catId))
    })

    mockSpinnerService=jasmine.createSpyObj(['show','hide'])
    mockSpinnerService.show.and.callFake(()=>{})
    mockSpinnerService.hide.and.callFake(()=>{})

    mockTradeService=jasmine.createSpyObj(['buyAInstrument'])
    mockTradeService.buyAInstrument.and.callFake((order:Order)=>{
      order.orderId=uuid.v4()
      return of(order)
    })

    await TestBed.configureTestingModule({

      declarations: [ BuyInstrumentComponent ],
      providers:[FormBuilder,{provide:Router,useValue:mockRouter},
        {provide:InstrumentService, useValue: mockInstrumentService},
        {provide:TradeService,useValue:mockTradeService},
        {provide:NgxSpinnerService,useValue:mockSpinnerService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should place a order successful on filling of data and submit of order',fakeAsync(()=>{

  }))
});
