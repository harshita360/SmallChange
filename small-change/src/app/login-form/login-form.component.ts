import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  userName:string="";
  password:string='';


  constructor(private userService:UserServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  login(){
    if(this.userService.authenticateUser(this.userName,this.password)){
      alert('Logged In Successful');
      //this.route.n
    }else{
      alert('User Name or password wrong')
    }

  }

}
