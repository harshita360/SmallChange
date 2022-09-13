import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  userName:string="";
  password:string='';


  constructor(private userService:UserServiceService,private router:Router) { }

  ngOnInit(): void {
  }

  login(){

    this.userService.authenticateUser(this.userName,this.password).subscribe(data=>{
      if(data){
        alert('Logged In Successful');
        this.router.navigate(['/portfolio']);
      }else{
        alert('User Name or password wrong')
      }
    })

  }

}
