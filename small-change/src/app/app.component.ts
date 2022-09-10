import { Component } from '@angular/core';
import { UserServiceService } from './services/user-service.service';
import { ToastService } from './toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService:UserServiceService){}

  title = 'small-change';

  isLoggedIn():boolean{
    return this.userService.isLoggedIn()
  }
}
