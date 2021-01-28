import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '~environment';
import { NameStore } from '~core/enums';
import { BncStoreReducer, BncStoreState } from './bnc-store';

export interface State {
  [NameStore.BNC]: BncStoreState.BncState,
}

export const reducers: ActionReducerMap<State> = {
  bnc: BncStoreReducer.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any) => {
    console.log('State', state);
    console.log('Action', action);
    return reducer(state, action);
  };
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  const config: LocalStorageConfig = {
    keys: [NameStore.BNC],
    rehydrate: true,
    removeOnUndefined: true
  };
  return localStorageSync(config)(reducer);
}


export const metaReducers: MetaReducer<State>[] =
  !environment.production ?
    [storeFreeze, logger, localStorageSyncReducer] :
    [localStorageSyncReducer];
