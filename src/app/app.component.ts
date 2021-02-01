import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { TranslationService } from '~core/i18n/translation.service';
import { BncStoreActions, BncStoreState } from '~root-store/bnc-store';

import { locale as esLang } from '~core/i18n/config/es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    private jwtHelper: JwtHelperService,
    private translationService: TranslationService,
    private store: Store<BncStoreState.BncState>,
  ) {
    this.translationService.loadTranslations(esLang);
  }

  ngOnInit(): void {
    if (this.jwtHelper.isTokenExpired() || !this.jwtHelper.tokenGetter()) {
      this.store.dispatch(BncStoreActions.Auth());
    }
  }
}
