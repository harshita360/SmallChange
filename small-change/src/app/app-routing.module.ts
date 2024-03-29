import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { LogOutComponent } from './log-out/log-out.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PortfolioPageComponent } from './portfolio/portfolio-page/portfolio-page.component';

const routes: Routes = [
  {path:'login',component:LoginPageComponent,canActivate:[NotLoggedInGuard]},
  {path:'portfolio',component:PortfolioPageComponent,canActivate:[IsLoggedInGuard]},
  {path:'logout',component:LogOutComponent, canActivate:[IsLoggedInGuard]},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
