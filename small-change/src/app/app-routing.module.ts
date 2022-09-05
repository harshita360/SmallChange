import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PortfolioPageComponent } from './portfolio/portfolio-page/portfolio-page.component';

const routes: Routes = [
  // {path:'login',component:LoginPageComponent},
  // {path:'portfolio',component:PortfolioPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
