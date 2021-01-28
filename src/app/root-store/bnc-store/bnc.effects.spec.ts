import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { BncService } from '~services';

import { BncEffect } from './bnc.effects';
import { assetsMocks, assetTicketMock, authMock } from 'src/app/mock';
import { BncStoreActions } from '.';

describe('BncEffects', () => {
  let actions$: Observable<any>;
  let effects: BncEffect;
  let service: BncService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BncEffect,
        BncService,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.inject(BncEffect);
    service = TestBed.inject(BncService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('Debería ejecutar el efecto Auth', () => {
    actions$ = of(BncStoreActions.Auth)
    const spy = spyOn(service, 'auth').and.returnValue(of(authMock));
    effects.auth$.subscribe((res) => {
      expect(res).toEqual(BncStoreActions.AuthSuccess({ data: authMock }));
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });

  it('Debería ejecutar el efecto loadAll', () => {
    actions$ = of(BncStoreActions.LoadAll)
    const spy = spyOn(service, 'getAllAssets').and.returnValue(of(assetsMocks));
    effects.loadAll$.subscribe((res) => {
      expect(res).toEqual(BncStoreActions.LoadAllSuccess({ items: assetsMocks }));
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });

  it('Debería ejecutar el efecto loadAssetTicketPrimary', () => {
    actions$ = of(BncStoreActions.LoadAssetTickerPrimary)
    const spy = spyOn(service, 'getAssetTicker').and.returnValue(of(assetTicketMock));
    effects.loadAssetTicketPrimary$.subscribe((res) => {
      expect(res).toEqual(BncStoreActions.LoadAssetTickerPrimarySuccess({ assetTicker: assetTicketMock }));
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });

  it('Debería ejecutar el efecto loadAssetTicketSecundary', () => {
    actions$ = of(BncStoreActions.LoadAssetTickerSecundary)
    const spy = spyOn(service, 'getAssetTicker').and.returnValue(of(assetTicketMock));
    effects.loadAssetTicketSecundary$.subscribe((res) => {
      expect(res).toEqual(BncStoreActions.LoadAssetTickerSecundarySuccess({ assetTicker: assetTicketMock }));
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });
});
