import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConvertMoneyComponent } from './views/convert-money/convert-money.component';
import { ListMoneyComponent } from './views/list-money/list-money.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, metaReducers } from './root-store/root-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RootStoreModule } from '~root-store/root-store.module';
import { BncInterceptor } from '~core/interceptors';
import { AuthBNC } from './models/auth-bnc.interface';
import { NameStore } from '~core/enums';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function tokenGetter() {
  const auth: AuthBNC = JSON.parse(localStorage.getItem(NameStore.BNC)).auth || undefined;
  return auth ? auth.access_token : '';
}

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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ["bravenewcoin.p.rapidapi.com"],
        disallowedRoutes: ['https://bravenewcoin.p.rapidapi.com/oauth/token', 'https://bravenewcoin.p.rapidapi.com/asset'],
      },
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    RootStoreModule,
    NgbModule,
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'COP' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BncInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
