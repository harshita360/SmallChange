import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeComponent } from './trade/trade.component';
import { BuyInstrumentComponent } from './buy-instrument/buy-instrument.component';
import { Route, RouterModule } from '@angular/router';
import { IsLoggedInGuard } from '../guards/is-logged-in.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { InstrumentDetailComponent } from './instrument-detail/instrument-detail.component';

const tradeRoutes: Route[]=[
  {path:'trade', component: TradeComponent, canActivate:[IsLoggedInGuard], children:[
    {path:'buy',component:BuyInstrumentComponent}
  ]}
]

@NgModule({
  declarations: [
    TradeComponent,
    BuyInstrumentComponent,
    InstrumentDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(tradeRoutes)
  ],
  exports:[
    TradeComponent,
    RouterModule
  ]
})
export class TradeModule { }
