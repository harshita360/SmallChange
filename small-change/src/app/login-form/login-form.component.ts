import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm!:FormGroup
  errorMessage='';


  constructor(private userService:UserServiceService,private router:Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9-_@\.\-]{3,18}$/)]],
      password:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9-_@\-]{6,24}$/)]]
    })
  }

  login(){

    this.userService.authenticateUser(this.loginForm.get('username')?.value,
    this.loginForm.get('password')?.value).subscribe(data=>{
      if(data){
        this.errorMessage=''
        this.router.navigate(['/portfolio']);
      }else{
        this.errorMessage='User Name or password wrong'
        //alert('User Name or password wrong')
      }
    })

  }

}
