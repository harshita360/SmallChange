import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  userName:string="";
  password:string='';


  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.userService.authenticateUser(this.userName,this.password)){
      alert('Logged In Successful');
    }else{
      alert('User Name or password wrong')
    }

  }

}
