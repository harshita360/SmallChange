import { Component } from '@angular/core';
import { UserServiceService } from './services/user-service.service';
import { ToastService } from './toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService:UserServiceService,private toastService:ToastService){}

  title = 'small-change';

  isLoggedIn():boolean{
    return this.userService.isLoggedIn()
  }

  showToast(){
    this.toastService.show('I am a success toast', { classname: 'bg-danger text-light', delay: 10000 });
  }
}
