import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PortfolioPageComponent } from './portfolio/portfolio-page/portfolio-page.component';

const routes: Routes = [
  {path:'login',component:LoginPageComponent,canActivate:[NotLoggedInGuard]},
  {path:'portfolio',component:PortfolioPageComponent,canActivate:[IsLoggedInGuard]},
  {path:'',redirectTo:'/login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
