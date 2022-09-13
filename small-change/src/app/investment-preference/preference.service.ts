import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InvestmentPreference } from '../models/investment-preference';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private userService:UserServiceService){}

  private investmentPreference: {[key:string]:InvestmentPreference}={
    '123-123-123':{
      investmentPurpose:'Retirement',
      incomeCategory:'20,001 - 40,000',
      riskTolerance:'CONSERVATIVE',
      lengthOfInvestment:'5-7 years'
    }
  }

  public setInestmentPreference(preference:InvestmentPreference): Observable<InvestmentPreference|undefined> {
    const userId=this.userService.getLoginUserId()
    if(userId!=undefined){
      this.investmentPreference[userId]=preference
      return of(preference)
    }
    return of(undefined)
  }

  public getInvestmentPreferenceOfuser() : Observable<InvestmentPreference|undefined>{
    const userId=this.userService.getLoginUserId()
    if(userId!=undefined){
      return of(this.investmentPreference[userId])
    }
    return of(undefined)
  }
}
