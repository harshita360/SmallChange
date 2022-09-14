import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { of, throwError } from 'rxjs';
import { Instrument } from 'src/app/models/instrument';
import { InstrumentCategory } from 'src/app/models/instrument-category';
import { InstrumentPrice } from 'src/app/models/instrument-price';
import { Order } from 'src/app/models/order';
import { InstrumentService } from 'src/app/services/instrument.service';
import { TradeService } from '../trade.service';
import * as uuid from "uuid";

import { OrderInstrumentComponent } from './order-instrument.component';
import { By } from '@angular/platform-browser';
import { ToastService } from 'src/app/toast/toast.service';

describe('BuyInstrumentComponent', () => {
  let component: OrderInstrumentComponent;
  let fixture: ComponentFixture<OrderInstrumentComponent>;
  let mockInstrumentService,mockSpinnerService,mockRouter,mockTradeService:any;
  let mockToastService:any;

  let portfolios=[
    {id:'123-fth-123',name:'portfolio 1',balance:1000,
    holdings:[
      {instrumentId:'abc-frd-def',quantity:10},
      {instrumentId:'T67878',quantity:2000}
    ]},
    {id:'123-fth-drt',name:'portfilio 2',balance:10}
  ]

  let instruments:Instrument[]=[
    {
      instrumentId:'abc-frd-def',
      instrumentDescription:'Apple Inc.' ,
      externalIdType:'CUSIP',
      externalId:'037833100',
      categoryId:'10',
      minQuantity:1 ,
      maxQuantity:200
    },
    {
      instrumentId:'76t-dse-123',
      instrumentDescription:'Alphabet Inc.' ,
      externalIdType:'CUSIP',
      externalId:'02079K107',
      categoryId:'20',
      minQuantity:3 ,
      maxQuantity:19
    },
    {
      instrumentId:'uytd-trf',
      instrumentDescription:'Alaska Air Group' ,
      externalIdType:'CUSIP',
      externalId:'011659109',
      categoryId:'10',
      minQuantity:1 ,
      maxQuantity:20
    },
    {
      instrumentId:'hgd-hgd-trd',
      instrumentDescription:'Walmart Stores, Inc. ' ,
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
      priceTimestamp:new Date(Date.now()),
      instrument:instruments[0],
    },
    {
      'instrumentId':'76t-dse-123',
      askPrice:40,
      bidPrice:41.56,
      priceTimestamp:new Date(Date.now()),
      instrument:instruments[1],
    },
    {
      'instrumentId':'uytd-trf',
      askPrice:60,
      bidPrice:60.56,
      priceTimestamp:new Date(Date.now()),
      instrument:instruments[2],
    },
    {
      'instrumentId':'hgd-hgd-trd',
      askPrice:181,
      bidPrice:184.12,
      priceTimestamp:new Date(Date.now()),
      instrument:instruments[3],
    },

  ]

  beforeEach(async () => {

    mockToastService=jasmine.createSpyObj(['showError','showSuccess'])
    mockToastService.showError.and.callFake((args:any)=>{})
    mockToastService.showSuccess.and.callFake((args:any)=>{})

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

      declarations: [ OrderInstrumentComponent ],
      providers:[FormBuilder,{provide:Router,useValue:mockRouter},
        {provide:InstrumentService, useValue: mockInstrumentService},
        {provide:TradeService,useValue:mockTradeService},
        {provide:NgxSpinnerService,useValue:mockSpinnerService},
      {provide:ToastService, useValue:mockToastService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should place a buy order successful on filling of data and submit of order',fakeAsync(()=>{

    component.portfolios=portfolios
    fixture.detectChanges()
    component.ngOnInit()
    expect(component.orderInstrumentForm.valid).toBeFalsy()


    expect(component.orderInstrumentForm.get('direction')?.disabled).toBeTruthy()

    component.orderInstrumentForm.get('portfolioId')?.setValue(portfolios[0].id)
    // byt and sell options have been enabled , let it be buy
    expect(component.orderInstrumentForm.get('direction')?.disabled).toBeFalsy()

    // seleting the cat 10 instruments
    expect(component.orderInstrumentForm.get('instrumentId')?.disabled).toBeTruthy()
    component.orderInstrumentForm.get('instrumentCategoryId')?.setValue('10')
    fixture.detectChanges()

    // gefter getting the filters
    expect(component.instrumentsOfCategory.length).toBe(2)

    //after selecting the category
    expect(component.orderInstrumentForm.get('instrumentId')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('instrumentId')?.setValue('abc-frd-def')
    fixture.detectChanges()

    // selecting of quantity that user can buy
    expect(component.orderInstrumentForm.get('quantity')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('quantity')?.setValue(10)
    fixture.detectChanges()
    expect(component.orderInstrumentForm.valid).toBeTruthy()

    const button=fixture.debugElement.query(By.css('#buy-trade-link')).nativeElement
    expect(button.disabled).toBeFalsy()
    button.dispatchEvent(new Event('click'))
    expect(mockTradeService.buyAInstrument).toHaveBeenCalled()


  }))

  it('should handle invalid quantity value',fakeAsync(()=>{

    component.portfolios=portfolios
    fixture.detectChanges()
    component.ngOnInit()
    expect(component.orderInstrumentForm.valid).toBeFalsy()


    expect(component.orderInstrumentForm.get('direction')?.disabled).toBeTruthy()

    component.orderInstrumentForm.get('portfolioId')?.setValue(portfolios[0].id)
    // byt and sell options have been enabled , let it be buy
    expect(component.orderInstrumentForm.get('direction')?.disabled).toBeFalsy()

    // seleting the cat 10 instruments
    expect(component.orderInstrumentForm.get('instrumentId')?.disabled).toBeTruthy()
    component.orderInstrumentForm.get('instrumentCategoryId')?.setValue('10')
    fixture.detectChanges()

    // gefter getting the filters
    expect(component.instrumentsOfCategory.length).toBe(2)

    //after selecting the category
    expect(component.orderInstrumentForm.get('instrumentId')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('instrumentId')?.setValue('abc-frd-def')
    fixture.detectChanges()

    // selecting of quantity that user can buy
    expect(component.orderInstrumentForm.get('quantity')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('quantity')?.setValue(50)
    fixture.detectChanges()
    expect(component.orderInstrumentForm.valid).toBeFalsy()

    const button=fixture.debugElement.query(By.css('#buy-trade-link')).nativeElement
    expect(button.disabled).toBeTruthy()


  }))


  it('should place a sell order successful on filling of data and submit of order',fakeAsync(()=>{

    component.portfolios=portfolios
    fixture.detectChanges()
    component.ngOnInit()
    expect(component.orderInstrumentForm.valid).toBeFalsy()


    expect(component.orderInstrumentForm.get('direction')?.disabled).toBeTruthy()

    component.orderInstrumentForm.get('portfolioId')?.setValue(portfolios[0].id)
    // byt and sell options have been enabled , let it be buy
    expect(component.orderInstrumentForm.get('direction')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('direction')?.setValue('S')
    // seleting the cat 10 instruments
    expect(component.orderInstrumentForm.get('instrumentId')?.disabled).toBeTruthy()
    component.orderInstrumentForm.get('instrumentCategoryId')?.setValue('10')
    fixture.detectChanges()

    // gefter getting the filters
    expect(component.instrumentsOfCategory.length).toBe(2)

    //after selecting the category
    expect(component.orderInstrumentForm.get('instrumentId')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('instrumentId')?.setValue('abc-frd-def')
    fixture.detectChanges()

    // selecting of quantity that user can buy
    expect(component.orderInstrumentForm.get('quantity')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('quantity')?.setValue(8)
    fixture.detectChanges()
    expect(component.orderInstrumentForm.valid).toBeTruthy()

    const button=fixture.debugElement.query(By.css('#buy-trade-link')).nativeElement
    expect(button.disabled).toBeFalsy()
    button.dispatchEvent(new Event('click'))
    expect(mockTradeService.buyAInstrument).toHaveBeenCalled()


  }))

  it('should handle error when user trying to sell more than current holdings',fakeAsync(()=>{

    component.portfolios=portfolios
    fixture.detectChanges()
    component.ngOnInit()
    expect(component.orderInstrumentForm.valid).toBeFalsy()


    expect(component.orderInstrumentForm.get('direction')?.disabled).toBeTruthy()

    component.orderInstrumentForm.get('portfolioId')?.setValue(portfolios[0].id)
    // byt and sell options have been enabled , let it be buy
    expect(component.orderInstrumentForm.get('direction')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('direction')?.setValue('S')
    // seleting the cat 10 instruments
    expect(component.orderInstrumentForm.get('instrumentId')?.disabled).toBeTruthy()
    component.orderInstrumentForm.get('instrumentCategoryId')?.setValue('10')
    fixture.detectChanges()

    // gefter getting the filters
    expect(component.instrumentsOfCategory.length).toBe(2)

    //after selecting the category
    expect(component.orderInstrumentForm.get('instrumentId')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('instrumentId')?.setValue('abc-frd-def')
    fixture.detectChanges()

    // selecting of quantity that user can buy
    expect(component.orderInstrumentForm.get('quantity')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('quantity')?.setValue(12)
    fixture.detectChanges()
    expect(component.orderInstrumentForm.valid).toBeFalsy()

    const button=fixture.debugElement.query(By.css('#buy-trade-link')).nativeElement
    expect(button.disabled).toBeTruthy()

  }))

  it('should handle buy order error',()=>{

    mockTradeService.buyAInstrument.and.returnValue(throwError(()=>"The trade price was changed more than 5%, please review order"))

    component.portfolios=portfolios
    fixture.detectChanges()
    component.ngOnInit()
    expect(component.orderInstrumentForm.valid).toBeFalsy()


    expect(component.orderInstrumentForm.get('direction')?.disabled).toBeTruthy()

    component.orderInstrumentForm.get('portfolioId')?.setValue(portfolios[0].id)
    // byt and sell options have been enabled , let it be buy
    expect(component.orderInstrumentForm.get('direction')?.disabled).toBeFalsy()

    // seleting the cat 10 instruments
    expect(component.orderInstrumentForm.get('instrumentId')?.disabled).toBeTruthy()
    component.orderInstrumentForm.get('instrumentCategoryId')?.setValue('10')
    fixture.detectChanges()

    // gefter getting the filters
    expect(component.instrumentsOfCategory.length).toBe(2)

    //after selecting the category
    expect(component.orderInstrumentForm.get('instrumentId')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('instrumentId')?.setValue('abc-frd-def')
    fixture.detectChanges()

    // selecting of quantity that user can buy
    expect(component.orderInstrumentForm.get('quantity')?.disabled).toBeFalsy()
    component.orderInstrumentForm.get('quantity')?.setValue(10)
    fixture.detectChanges()
    expect(component.orderInstrumentForm.valid).toBeTruthy()

    const button=fixture.debugElement.query(By.css('#buy-trade-link')).nativeElement
    expect(button.disabled).toBeFalsy()
    button.dispatchEvent(new Event('click'))
    expect(mockTradeService.buyAInstrument).toHaveBeenCalled()
    expect(mockToastService.showError).toHaveBeenCalled()
  })
});
