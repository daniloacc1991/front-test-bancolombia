import { createAction, props } from "@ngrx/store";
import { AssetTicker, AuthBNC, Asset } from "~models";
import { BncState } from './bnc.state'

export const InitState = createAction(
  '[Bnc] Init State',
  props<{ initState: BncState }>(),
);

export const Auth = createAction(
  '[BNC] Auth',
);
export const AuthSuccess = createAction(
  '[BNC] Auth Success',
  props<{ data: AuthBNC }>(),
);
export const AuthFailure = createAction(
  '[BNC] AuthFailure',
);

export const LoadAll = createAction(
  '[BNC] Load All',
);
export const LoadAllSuccess = createAction(
  '[BNC] Load All Success',
  props<{ items: Asset[] }>(),
);
export const LoadAllFailure = createAction(
  '[BNC] Load All Failure',
);

export const LoadAssetTickerPrimary = createAction(
  '[BNC] Load Asset Ticker Primary',
  props<{ asset: Asset }>(),
);
export const LoadAssetTickerPrimarySuccess = createAction(
  '[BNC] Load Asset Ticker Primary Success',
  props<{ assetTicker: AssetTicker }>(),
);
export const LoadAssetTickerPrimaryFailure = createAction(
  '[BNC] Load Asset Ticker Primary Failure',
);

export const LoadAssetTickerSecundary = createAction(
  '[BNC] Load Asset Ticker Secundary',
  props<{ asset: Asset }>(),
);
export const LoadAssetTickerSecundarySuccess = createAction(
  '[BNC] Load Asset Ticker Secundary Success',
  props<{ assetTicker: AssetTicker }>(),
);
export const LoadAssetTickerSecundaryFailure = createAction(
  '[BNC] Load Asset Ticker Secundary Failure',
);
