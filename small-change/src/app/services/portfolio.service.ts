import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Trade } from '../models/trade';
import { Order } from '../models/order';
import { Portfolio } from '../models/portfolio';
import { Stock } from '../models/stock';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  PortfolioDetails: any[] = [];
  instrumentDetails: any[] = [];
  combinedDetails: any[] = [];
  portfolioUrl = 'assets/portfolio.json';
  instrumentInfoUrl = 'assets/instruments.json';
  errorMessage: string = '';
  allPortfolio: Portfolio[] = [
    {
      "portfolio_id": "1111",
      "user_id": 1,
      "portfolio_category": "BROKERAGE",
      "portfolio_name": "My new portfolio",
      stocks: [{ "id": 1, "instrumentId": "28738384", "instrument": "APL", "quantity": 450, "value": 89000, "price": 776, "change": -14.07 },
               { "id": 2, "instrumentId": "87738384", "instrument": "AMZ", "quantity": 450, "value": 89000, "price": 776, "change": 5.07 }
      ],
      "portfolio_balance": 100000
    },
    {

      "portfolio_id": "2222",
      "user_id": 1,
      "portfolio_category": "BROKERAGE",
      "portfolio_name": "Demo portfolio",
      stocks: [{ "id": 1, "instrumentId": "28738384", "instrument": "APL", "quantity": 450, "value": 89000, "price": 776, "change": -14.07 },
               { "id": 2, "instrumentId": "87738384", "instrument": "AMZ", "quantity": 450, "value": 89000, "price": 776, "change": 5.07 }
              ],
      "portfolio_balance": 100000
    },
  ]

  constructor(private http: HttpClient) { }

  getPortfolioData(): Observable<any[]> {
    return this.http.get<any[]>(this.portfolioUrl)
      .pipe(
        catchError(this.handleError));
  }

  getPortfolioDataNew(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.portfolioUrl)
      .pipe(
        catchError(this.handleError));
  }

  getTradeDetails() {

    //input received
    let instrument_name="APL";
    let testtrad: Trade =
    {
      "tradeId": "a62375d7-bcb4-46a1-b2f0-5ba6719ae9b5",
      "quantity": 10,
      "executionPrice": 104.75,
      "direction": "S",
      order: new Order('123455', 4, 4.5, '123', 'B'),
      "cashValue": 1052.5,
      "clientId": 1,
      "instrumentId": "28738384",
      "portfolioId": "2222",
      "transactionAt": new Date(),
    }

    let length: number = 0;
    let newport: Portfolio[] = [];
    newport=this.allPortfolio.filter(t=>t.user_id===testtrad.clientId);
    length = Object.keys(newport).length;
    if(length>0)
    {
      console.log("user has exsiting  exisiting portfolios")
      let currPortfolio:Portfolio[];
      currPortfolio=newport.filter(t=>t.portfolio_id===testtrad.portfolioId);
      console.log(currPortfolio);
      let updateStock;
      updateStock=currPortfolio[0].stocks?.filter(t=>t.instrumentId===testtrad.instrumentId);
      // if(testtrad.direction==='B')
      // {
      //   updateStock[0].quantity=updateStock[0].quantity+testtrad.quantity;
      // }
      // else{
      //   updateStock[0].quantity=updateStock[0].quantity-testtrad.quantity;
      // }
      

    }
    else{
      let defaultPort:Portfolio={
        portfolio_id:"6666",
        user_id:testtrad.clientId,
        portfolio_category:"BROKERAGE",
        portfolio_name:"Default Portfolio",
        portfolio_balance:testtrad.quantity*testtrad.executionPrice,
        stocks:[{ "id": 6, "instrumentId": testtrad.instrumentId, "instrument": instrument_name, "quantity": testtrad.quantity, "value": testtrad.cashValue, "price": testtrad.executionPrice, "change": 0 }
      ]
      }
      this.allPortfolio.push(defaultPort);
      console.log(this.allPortfolio);

    }
    // this.getPortfolioData().subscribe(data => {
    //   (newport = data.filter(t => t.user_id === testtrad.clientId));
    //   length = Object.keys(newport).length;
    //   if (length > 0) //user has a existing portfolio
    //   {
    //     let userport: Portfolio = {
    //       portfolio_id: '',
    //       user_id: 0,
    //       portfolio_category: '',
    //       portfolio_name: '',
    //       portfolio_balance: 0,
    //       stocks: undefined
    //     };
    //     userport = newport.filter(t => t.portfolio_id === testtrad.portfolioId);

    //   }
    //   else {
    //     //add a new portfolio with default name
    //   }
    // });


  }

  // getPortfolioData():void
  // {
  //   console.log("portfolio service called");
  //   this.http.get<any>(this.portfolioUrl).subscribe({
  //     next: data => {
  //         this.PortfolioDetails = data;
  //         //console.log(this.PortfolioDetails);


  //     },
  //     error: error => {
  //         this.handleError(error);
  //         console.error('There was an error!', error);

  //     }
  // })
  // }

  getInstrumentData(): void {
    console.log("portfolio service called for insytrument data");
    this.http.get<any>(this.instrumentInfoUrl).subscribe({
      next: data => {
        this.instrumentDetails = data;
        //console.log(this.instrumentDetails);


      },
      error: error => {
        this.handleError(error);
        console.error('There was an error!', error);

      }
    })
  }


  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occured: ${err.error.message}`;
    }

    else {

      errorMessage = `server returned code: ${err.status},error message is :${err.message}`;

    }

    console.log(errorMessage);

    return throwError(() => errorMessage);

  }


}
