import { Action, createReducer, on } from '@ngrx/store';
import { BncState, initialBncState } from "./bnc.state";
import * as fromActionsBnc from './bnc.actions';

const bncReducer = createReducer<BncState>(
  initialBncState,
  on(fromActionsBnc.Auth, () => ({ ...initialBncState })),
  on(fromActionsBnc.AuthSuccess, (state, { data }) => ({ ...state, auth: data })),
  // LoadAll Assets
  on(fromActionsBnc.LoadAll, (state) => ({ ...state, isLoadingAll: true })),
  on(fromActionsBnc.LoadAllSuccess, (state, { items }) => ({ ...state, assets: items, isLoadingAll: false })),
  on(fromActionsBnc.LoadAllFailure, (state) => ({ ...state, isLoadingAll: false })),
  // Load Asset Primary
  on(fromActionsBnc.LoadAssetTickerPrimary, (state, { asset }) => ({ ...state, assetPrimary: asset })),
  on(fromActionsBnc.LoadAssetTickerPrimarySuccess, (state, { assetTicker }) => ({ ...state, assetTicketPrimary: assetTicker })),
  on(fromActionsBnc.LoadAllFailure, (state) => ({ ...state, assetPrimary: undefined })),
  // Load Asset Secundary
  on(fromActionsBnc.LoadAssetTickerSecundary, (state, { asset }) => ({ ...state, assetSecundary: asset })),
  on(fromActionsBnc.LoadAssetTickerSecundarySuccess, (state, { assetTicker }) => ({ ...state, assetTicketSecundary: assetTicker })),
  on(fromActionsBnc.LoadAllFailure, (state) => ({ ...state, assetSecundary: undefined })),
  on(fromActionsBnc.InitState, (state, { initState }) => ({ ...initState })),
);

export function reducer(state: BncState | undefined, action: Action) {
  return bncReducer(state, action);
}
