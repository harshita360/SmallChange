import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvestmentPreference } from 'src/app/models/investment-preference';
import { ToastService } from 'src/app/toast/toast.service';
import { PreferenceService } from '../preference.service';

@Component({
  selector: 'app-preference-details',
  templateUrl: './preference-details.component.html',
  styleUrls: ['./preference-details.component.css']
})
export class PreferenceDetailsComponent implements OnInit {

  currentUserInvestment?:InvestmentPreference;

  constructor(private preferenceService:PreferenceService,private router:Router,
    private toastService:ToastService) {
   }

  ngOnInit(): void {

    this.loadInvestmentPreference();
  }

  loadInvestmentPreference(){
    this.preferenceService.getInvestmentPreferenceOfuser().subscribe(data=>{
      if(data==undefined){
        this.toastService.showInformation('You have not set your Investment Preference, please set know')
        this.router.navigate(['/preference','edit'])
      }else{
        this.currentUserInvestment=data
      }
    })
  }

}
