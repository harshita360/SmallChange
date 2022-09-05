import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserServiceService } from './user-service.service';
import * as uuid from "uuid";
import { of } from 'rxjs';
import { User } from '../models/user';

describe('UserServiceService', () => {
  let service: UserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successful for esisting user',()=>{
    service.users=[
      {
        userId:'123-123-235',
        email:'testSER@email.com',
        userName:'Test Nikhil V1',
        dateOfBirth:new Date('1999-09-11'),
        country:'IN',
        postalCode:'560061',
        password:'Nikhil1@123'
      }
    ];

    const resp=service.authenticateUser('testSER@email.com','Nikhil1@123')
    expect(resp).toBe(true);
  })

  it('should return false while authenticating with incorrect password',()=>{
    service.users=[
      {
        userId:'123-123-235',
        email:'testSER@email.com',
        userName:'Test Nikhil V1',
        dateOfBirth:new Date('1999-09-11'),
        country:'IN',
        postalCode:'560061',
        password:'Nikhil1@123'
      }
    ];

    const resp=service.authenticateUser('testSER@email.com','Nikhil1@1234')
    expect(resp).toBe(false);
  })

  it('should create new user on non existing user registration', fakeAsync( ()=>{
    service.users=[
      {
        userId:'123-123-235',
        email:'testSER@email.com',
        userName:'Test Nikhil V1',
        dateOfBirth:new Date('1999-09-11'),
        country:'IN',
        postalCode:'560061',
        password:'Nikhil1@123'
      }
    ];
    let userIdDummy=uuid.v4();
    spyOn(service,'registerNewUser').and.callFake((user:User)=>{
      user.userId=userIdDummy;
      return of(user)
    })

    let returnedUser:User|undefined;
    let newUser:User=new User(undefined,'dummy@gmail.com',new Date('1999-09-11'),'IN','560043','pass@#A','Dummy User');
    service.registerNewUser(newUser).subscribe(data=>returnedUser=data)
    tick()
    if(returnedUser){
      expect(newUser.userName).toEqual(returnedUser.userName)
      expect(returnedUser.userId).toEqual(userIdDummy)
    }else{
      fail('The returned user should not be null')
    }
  }))

  it('should throw error on create new user of an existing user registration', fakeAsync( ()=>{
    service.users=[
      {
        userId:'123-123-235',
        email:'testSER@email.com',
        userName:'Test Nikhil V1',
        dateOfBirth:new Date('1999-09-11'),
        country:'IN',
        postalCode:'560061',
        password:'Nikhil1@123'
      }
    ];
    let userIdDummy=uuid.v4();
    // spyOn(service,'registerNewUser').and.callFake((user:User)=>{
    //   user.userId=userIdDummy;
    //   return of(user)
    // })
    let errorMessage:string|undefined;
    let returnedUser:User|undefined;
    let newUser:User=new User(undefined,'testSER@email.com',new Date('1999-09-11'),'IN','560043','pass@#A','Dummy User');
    service.registerNewUser(newUser).subscribe({
      next:()=> fail('It should not create new user'),
      error: (e)=> errorMessage=e
    })
    tick()
    expect(errorMessage).toEqual('Already user with is email present')
  }))


});
