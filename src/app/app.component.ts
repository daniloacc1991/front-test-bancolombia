import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { BncStoreActions, BncStoreState } from '~root-store/bnc-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(
    private jwtHelper: JwtHelperService,
    private store: Store<BncStoreState.BncState>,
  ) {
    if (this.jwtHelper.isTokenExpired() || !this.jwtHelper.tokenGetter()) {
      this.store.dispatch(BncStoreActions.Auth());
    }
  }
}
