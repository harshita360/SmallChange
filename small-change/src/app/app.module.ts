import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LogintextComponent } from './logintext/logintext.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { PortfolioPageComponent } from './portfolio/portfolio-page/portfolio-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderLogoComponent,
    FooterBarComponent,
    NavigationComponent,
    LogintextComponent,
    LoginFormComponent,
    LoginPageComponent,
    PortfolioPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
