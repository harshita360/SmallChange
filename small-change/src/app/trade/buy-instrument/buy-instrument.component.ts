import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstrumentCategory } from 'src/app/models/instrument-category';
import { InstrumentPrice } from 'src/app/models/instrument-price';
import { Order } from 'src/app/models/order';
import { InstrumentService } from 'src/app/services/instrument.service';
import { TradeService } from '../trade.service';
import {NgxSpinnerService} from 'ngx-spinner'

@Component({
  selector: 'app-buy-instrument',
  templateUrl: './buy-instrument.component.html',
  styleUrls: ['./buy-instrument.component.css']
})
export class BuyInstrumentComponent implements OnInit {

  loaderMessage:string=''

  errorMessage :{[key:string]:string} ={
    'portfolioId':'',
    'instrumentCategoryId':'',
    'instrumentId':'',
    'quantity':''
  }

  canFormBeSubmitted:boolean=false;

  errorMessageTexts:{[key:string]:{[key:string]:string}}  ={
    'portfolioId':{
      'required':'Please select portfolio'
    },
    'instrumentCategoryId':{
      'required':'please select a instrument category'
    },
    'instrumentId':{
      'required':'please select a instrument to buy'
    },
    'quantity':{
      'required':'Please type quantity of selected instrument to buy',
      'min':'you need to minimum number of selected instruments as specified above',
      'max':'you can a maximum number of selected instruments as specified above'
    }
  }


  portfolios=[
    {id:'123-fth-123',name:'portfolio 1',balance:1000},
    {id:'123-fth-drt',name:'portfilio 2',balance:10}
  ]
  categories: InstrumentCategory[]=[]
  instrumentsOfCategory:InstrumentPrice[]=[]
  selectedInstrument?: InstrumentPrice;
  buyInstrumentForm: FormGroup;
  currentPortfolio:any;
  maxQuantityCanBuy:number=0;

  constructor(private router:Router,private formBuilder:FormBuilder,
    private instrumentService:InstrumentService,private tradeService:TradeService,
    private spinnerSerice:NgxSpinnerService) {
    this.buyInstrumentForm=formBuilder.group({
      'portfolioId':['',Validators.required],
      'instrumentCategoryId':[{value:'',disabled:true}, Validators.required],
      'instrumentId':[{value:'',disabled:true},Validators.required],
      'quantity':[{value:0,disabled:true},Validators.required],
      'targetPrice':[{value:0,disabled:true}, Validators.required]
    })
    this.instrumentService.getAllCategories().subscribe(categories=>{
      this.categories=categories;
    })
   }

  ngOnInit(): void {

    // executing when the suer changes to another portfolio
    this.buyInstrumentForm.get('portfolioId')?.valueChanges.subscribe(portfolioId=>{
      this.currentPortfolio=this.portfolios.find(p => p.id==portfolioId);
      this.validateInstrumentBuyEligibility();
      this.enableInstrumentCategorySelect();
      this.setErrorOfControl('portfolioId')
    })

    this.buyInstrumentForm.get('instrumentCategoryId')?.valueChanges.subscribe(categoryId=>{

      if(categoryId==''){
        return
      }

      this.disableInstrumentSelect()
      this.loaderMessage=`instruments of selected category loading`
      this.spinnerSerice.show()
      this.buyInstrumentForm.get('instrumentId')?.setValue('')
        this.buyInstrumentForm.get('instrumentId')?.updateValueAndValidity();
        this.buyInstrumentForm.get('quantity')?.setValue(0);
        this.buyInstrumentForm.get('quantity')?.updateValueAndValidity();
        this.buyInstrumentForm.updateValueAndValidity();
        this.setErrorOfControl('instrumentId')
        this.setErrorOfControl('instrumentCategoryId')
        this.disableQuantity()
        this.selectedInstrument=undefined;
        this.canFormBeSubmitted=false;
      this.instrumentService.getInstrumentsByCategory(categoryId).subscribe( data=>{
       // console.log('instruments receied',data)
        this.instrumentsOfCategory=data;
        this.selectedInstrument=undefined;
        this.enableInstrumentSelect()
        this.canFormBeSubmitted=true
        this.spinnerSerice.hide()
      })
    })

    this.buyInstrumentForm.get('instrumentId')?.valueChanges.subscribe(instrumentId=>{
      this.validateInstrumentBuyEligibility();
      this.setErrorOfControl('instrumentId')
      this.setErrorOfControl('quantity')
    })

    this.buyInstrumentForm.get('quantity')?.valueChanges.subscribe(newQuantity=>{
      if(this.selectedInstrument){
        this.buyInstrumentForm.get('targetPrice')?.setValue(newQuantity*this.selectedInstrument.askPrice)
        this.buyInstrumentForm.get('targetPrice')?.updateValueAndValidity()
        this.buyInstrumentForm.updateValueAndValidity()
        this.setErrorOfControl('quantity')
      }
    })


  }

  checkInstrumentByability(instrument:InstrumentPrice):boolean{
    return this.currentPortfolio.balance > instrument.askPrice*instrument.instrument.minQuantity;
  }

  validateInstrumentBuyEligibility() {

    if(! this.buyInstrumentForm.get('instrumentCategoryId')?.valid || ! this.buyInstrumentForm.get('instrumentId')?.valid){
      return;
    }

    if(this.buyInstrumentForm.get('instrumentId')?.value!=''){
      const instrumentId=this.buyInstrumentForm.get('instrumentId')?.value
      const instrumentDetails=this.instrumentsOfCategory.find(i=> i.instrumentId==instrumentId)
      if(!instrumentDetails){
        this.disableQuantity()
        if(!this.buyInstrumentForm.get('instrumentCategoryId')?.value){
          this.disableInstrumentSelect()
        }
        alert('Instrument not found please try again later')
        return
      }
      const instrument:InstrumentPrice=instrumentDetails;
    if(this.checkInstrumentByability(instrument)){
      this.selectedInstrument=instrument
      const maxQuantity=Math.floor(this.currentPortfolio.balance/instrument.askPrice)
      this.maxQuantityCanBuy=Math.min(maxQuantity,instrument.instrument.maxQuantity);
      this.setQuantityAndUpdate(instrument.instrument.minQuantity,instrument.instrument.minQuantity,this.maxQuantityCanBuy)
      this.buyInstrumentForm.updateValueAndValidity()
      this.enableQuantity()
    }else{
      this.buyInstrumentForm.patchValue({
        'instrumentId':''}
      )
      this.buyInstrumentForm.updateValueAndValidity()
      this.selectedInstrument=undefined;
      this.disableQuantity()
     // alert('you cannot buy this instrument because you are having insufficiends funds in account')
    }
  }

  }

  goToHome(){
    if(confirm('Are you sure you want to leave this page?')){
      this.router.navigate(['/portfolio'])
    }

  }

  disableQuantity(){
    this.buyInstrumentForm.get('quantity')?.disable()
  }

  enableQuantity(){
    this.buyInstrumentForm.get('quantity')?.enable()
  }

  setQuantityAndUpdate(quantity:number,minValue:number,maxValue:number){

    this.buyInstrumentForm.get('quantity')?.clearValidators()
    this.buyInstrumentForm.get('quantity')?.addValidators
      ([Validators.required, Validators.min(minValue),
        Validators.max(maxValue)]);
    this.buyInstrumentForm.get('quantity')?.setValue(quantity);
    this.buyInstrumentForm.get('quantity')?.updateValueAndValidity()
    this.buyInstrumentForm.updateValueAndValidity()

  }

  disableInstrumentSelect(){
    this.buyInstrumentForm.get('instrumentId')?.disable()
  }

  enableInstrumentSelect(){
    this.buyInstrumentForm.get('instrumentId')?.enable()
  }

  enableInstrumentCategorySelect(){
    this.buyInstrumentForm.get('instrumentCategoryId')?.enable()
  }

  setErrorOfControl(controlName:string){
    let control:AbstractControl| null =this.buyInstrumentForm.get(controlName)
    if(!control){
      return
    }
    if(control.pristine || !control.errors){
      this.errorMessage[controlName]=''
      return
    }
    let controlErrorMessage=''
    Object.keys(control.errors).forEach(errorName=>{
      controlErrorMessage+=this.errorMessageTexts[controlName][errorName];
    })
    if(control.errors){
      this.errorMessage[controlName]=controlErrorMessage
    }
  }

  buyInstrument(){
    this.loaderMessage=`Instrument ${this.selectedInstrument?.instrument.description} buy request id submited waiting for respons`
    this.spinnerSerice.show()
    const order=new Order(
      this.buyInstrumentForm.value['instrumentId'],
      this.buyInstrumentForm.value['quantity'],
      this.buyInstrumentForm.get('targetPrice')?.value,
      this.buyInstrumentForm.value['portfolioId'],'B')
    this.tradeService.buyAInstrument(order).subscribe(re=>{
      console.log("order submitted", re)
      this.spinnerSerice.hide()
      this.router.navigate(['/portfolio'])
    })
  }

}
