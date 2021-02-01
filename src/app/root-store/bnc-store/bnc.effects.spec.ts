import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
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

  it('Debería fallar el efecto Auth', () => {
    const error = 'Ocurrio un error';
    actions$ = of(BncStoreActions.Auth)
    const spy = spyOn(service, 'auth').and.returnValue(throwError(error));
    effects.auth$.subscribe(() => { }, err => {
      expect(err).toEqual(BncStoreActions.AuthFailure());
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('Debería ejecutar el efecto loadAll', () => {
    actions$ = of(BncStoreActions.LoadAll)
    const spy = spyOn(service, 'getAllAssets').and.returnValue(of(assetsMocks));
    effects.loadAll$.subscribe((res) => {
      expect(res).toEqual(BncStoreActions.LoadAllSuccess({ items: assetsMocks }));
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });

  it('Debería ejecutar y fallar el efecto loadAll', () => {
    const error = 'Ocurrio un error';
    actions$ = of(BncStoreActions.LoadAll)
    const spy = spyOn(service, 'getAllAssets').and.returnValue(throwError(error));
    effects.loadAll$.subscribe(() => { }, (err) => {
      expect(err).toEqual(BncStoreActions.LoadAllFailure());
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });

  it('Debería ejecutar el efecto loadAssetTicketPrimary', () => {
    actions$ = of(BncStoreActions.LoadAssetTickerPrimary({ asset: assetsMocks[0] }));
    const spy = spyOn(service, 'getAssetTicker').and.returnValue(of(assetTicketMock));
    effects.loadAssetTicketPrimary$.subscribe((res) => {
      expect(res).toEqual(BncStoreActions.LoadAssetTickerPrimarySuccess({ assetTicker: assetTicketMock }));
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });

  it('Debería ejecutar y fallar el efecto loadAssetTicketPrimary', () => {
    const error = 'Ocurrio un error';
    actions$ = of(BncStoreActions.LoadAssetTickerPrimary({ asset: assetsMocks[0] }));
    const spy = spyOn(service, 'getAssetTicker').and.returnValue(throwError(error));
    effects.loadAssetTicketPrimary$.subscribe(() => { }, (err) => {
      expect(err).toEqual(BncStoreActions.LoadAssetTickerPrimaryFailure());
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });

  it('Debería ejecutar el efecto loadAssetTicketSecundary', () => {
    actions$ = of(BncStoreActions.LoadAssetTickerSecundary({ asset: assetsMocks[0] }))
    const spy = spyOn(service, 'getAssetTicker').and.returnValue(of(assetTicketMock));
    effects.loadAssetTicketSecundary$.subscribe((res) => {
      expect(res).toEqual(BncStoreActions.LoadAssetTickerSecundarySuccess({ assetTicker: assetTicketMock }));
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });

  it('Debería ejecutar y fallar el efecto loadAssetTicketSecundary', () => {
    const error = 'Ocurrio un error';
    actions$ = of(BncStoreActions.LoadAssetTickerSecundary({ asset: assetsMocks[0] }))
    const spy = spyOn(service, 'getAssetTicker').withArgs(assetsMocks[0].id).and.returnValue(throwError(error));
    effects.loadAssetTicketSecundary$.subscribe(() => { }, (err) => {
      expect(err).toEqual(BncStoreActions.LoadAssetTickerSecundaryFailure());
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });

});
