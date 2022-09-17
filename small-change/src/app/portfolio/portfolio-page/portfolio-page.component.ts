import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {
  portfolio:any[]=[];
  length:number=0;
  userid:number=1;

  constructor(private portfolioService:PortfolioService) { }

  ngOnInit(): void {
   
    this.getUserPortfolioData();
    // this.getUserPortfolioDataNew();
    //this.portfolioService.getTradeDetails();
   
  }


  getUserPortfolioData()
  {
    this.portfolioService.getPortfolioData().subscribe(portfolio=>{
      (this.portfolio=portfolio.filter(t=>t.user_id ===this.userid));
      console.log(this.portfolio);
      this.length=Object.keys(this.portfolio).length;
      this.portfolio.map(elem=>(console.log(elem.stocks)));
    });
  }

  getUserPortfolioDataNew()
  {
    this.portfolioService.getPortfolioData().subscribe(portfolio=>{
      console.log(this.portfolio);
      this.length=Object.keys(this.portfolio).length;
      this.portfolio.map(elem=>(console.log(elem.stocks)));
    });
  }

}
