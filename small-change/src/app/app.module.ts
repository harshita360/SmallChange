import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderLogoComponent,
    FooterBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
