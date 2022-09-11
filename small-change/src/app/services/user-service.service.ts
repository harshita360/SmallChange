import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import * as uuid from "uuid";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private clientUrl="http://localhost:3000/fmts/client"

  users:User[]=[
    new User(
      NaN,
      'user1@email.com',
      new Date('1999-09-11'),
      'IN',
      '560061',
      'Nikhil@123',
      'Nikhil V',
      [{type:'SSN',value:'87698765'}]
    ),
    new User(
      NaN,
      'user2@email.com',
      new Date('2000-09-11'),
      'IN',
      '560061',
      'Nikhil@123',
      'Nikhil V 2',
      [{type:'SSN',value:'09456433'}]
    )
  ]

  private loggedInUser?:User;

  constructor(private http:HttpClient) { }


  authenticateUser(email:string,password:string): Observable<boolean>{
    let user:User | undefined;
    user=this.users.find(u => u.email===email);
    if(user && user.password===password){
      const httpHeaders=new HttpHeaders({
        'Content-type':'application/json'
      })
      return this.http.post<User>(this.clientUrl,user,{headers:httpHeaders})
      .pipe(
        catchError(this.handleError),
        mergeMap(clientData=>{
          console.log(clientData)
          if(user){
            user.clientId=clientData.clientId
            user.setToken(clientData.token)
            this.loggedInUser=user
            return of(true)
          }
          return of(false)
        })
      )
    }else{
      return of(false);
    }
  }

  isLoggedIn():boolean{
    return this.loggedInUser!=undefined;
  }

  registerNewUser(user:User):  Observable<User> {
    const existinUser=this.users.find(u => u.email===user.email);
    if(existinUser){
      return throwError(()=> 'Already user with is email present')
    }
    user.clientId=Math.floor(Math.random()*1000000)
    this.users.push(user)
    return of(user)
  }

  logout(){
    this.loggedInUser=undefined
  }

  getLoginUserId():number|undefined{
    return this.loggedInUser?.clientId;
  }

  getLogedInUserToken():undefined|number{
    return this.loggedInUser?.getToken()
  }

  getLoginUserEmail():string|undefined{
    return this.loggedInUser?.email;
  }

  handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error("Error occured ",error.error.message)
    }else{
      console.error("Server error status code ",error.status,' with text ', error.statusText)
      if(error.status==406){
        return throwError(()=>'Session timed out, lease login to get services')
      }
    }
    return throwError(()=>'Error occured please try again later')
  }
}
