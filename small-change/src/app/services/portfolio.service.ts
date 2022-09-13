import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private PortfolioDetails:any[]=[];
  private instrumentDetails:any[]=[];
  private combinedDetails:any[]=[];
  private portfolioUrl='assets/portfolio.json';
  private instrumentInfoUrl='assets/instruments.json';
   errorMessage:string='';
  constructor(private http:HttpClient) { }

  getPortfolioData():Observable<any[]>{
    return this.http.get<any[]>(this.portfolioUrl)
      .pipe(
        catchError(this.handleError));
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

  getInstrumentData():void{
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

 
  private handleError(err:HttpErrorResponse)

  {
    let errorMessage='';
    if(err.error instanceof ErrorEvent)
    {

      errorMessage=`An error occured: ${err.error.message}`;
     } 

    else{

      errorMessage=`server returned code: ${err.status},error message is :${err.message}`;

    }

    console.log(errorMessage);

    return throwError(()=>errorMessage);

  }


}
