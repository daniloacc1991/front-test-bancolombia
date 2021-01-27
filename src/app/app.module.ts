import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConvertMoneyComponent } from './views/convert-money/convert-money.component';
import { ListMoneyComponent } from './views/list-money/list-money.component';

@NgModule({
  declarations: [
    AppComponent,
    ConvertMoneyComponent,
    ListMoneyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InfiniteScrollModule,
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'COP' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
