import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import * as uuid from "uuid";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  users:User[]=[
    {
      userId:'123-123',
      email:'user1@email.com',
      userName:'Nikhil V',
      dateOfBirth:new Date('1999-09-11'),
      country:'IN',
      postalCode:'560061',
      password:'Nikhil@123'
    },
    {
      userId:'123-121',
      userName:'Raski Kumari',
      email:'user2@email.com',
      dateOfBirth:new Date('2000-09-11'),
      country:'IN',
      postalCode:'560064',
      password:'Rashi@123'
    }
  ]

  private loggedInUser?:User;

  constructor() { }


  authenticateUser(email:string,password:string):boolean{
    let user:User | undefined;
    user=this.users.find(u => u.email===email);
    if(user && user.password===password){
      this.loggedInUser=user;
      return true;
    }else{
      return false;
    }
  }

  isLoggedIn():boolean{
    return this.loggedInUser!=undefined;
  }

  registerNewUser(user:User):  Observable<User> {
    const existinUser=this.users.find(u => u.email===user.email);
    if(existinUser){
      throw new Error('Already logged in user');
    }
    user.userId=uuid.v4()
    this.users.push(user)
    return of(user)
  }
}
