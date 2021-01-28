import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, map, switchMap } from "rxjs/operators";
import { BncService } from "~services";

import * as fromActionsBnc from './bnc.actions';

@Injectable()
export class BncEffect {

  auth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionsBnc.Auth),
      switchMap(() =>
        this.bncService.auth().pipe(
          map(data => fromActionsBnc.AuthSuccess({ data })),
          catchError((res: any) => of(fromActionsBnc.AuthFailure()))
        )
      )
    )
  );

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionsBnc.LoadAll),
      switchMap(() =>
        this.bncService.getAllAssets().pipe(
          map(items => fromActionsBnc.LoadAllSuccess({ items })),
          catchError((res: any) => of(fromActionsBnc.LoadAllFailure()))
        )
      )
    )
  );

  loadAssetTicketPrimary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionsBnc.LoadAssetTickerPrimary),
      map(action => action.asset),
      switchMap(asset =>
        this.bncService.getAssetTicker(asset.id).pipe(
          map(assetTicker => fromActionsBnc.LoadAssetTickerPrimarySuccess({ assetTicker })),
          catchError((res: any) => of(fromActionsBnc.LoadAssetTickerPrimaryFailure()))
        )
      )
    )
  );

  loadAssetTicketSecundary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionsBnc.LoadAssetTickerSecundary),
      map(action => action.asset),
      switchMap(asset =>
        this.bncService.getAssetTicker(asset.id).pipe(
          map(assetTicker => fromActionsBnc.LoadAssetTickerSecundarySuccess({ assetTicker })),
          catchError((res: any) => of(fromActionsBnc.LoadAssetTickerSecundaryFailure()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private readonly bncService: BncService,
  ) { }

}
