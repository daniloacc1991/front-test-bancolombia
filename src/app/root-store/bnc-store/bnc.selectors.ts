import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NameStore } from "~core/enums";
import { AuthBNC, Asset, AssetTicker } from "~models";
import { BncState } from "./bnc.state";

export const getAuth = (state: BncState): AuthBNC => state.auth;
export const getAssets = (state: BncState): Asset[] => state.assets;
export const getAssetPrimary = (state: BncState): Asset => state.assetPrimary;
export const getAssetTicketPrimary = (state: BncState): AssetTicker => state.assetTicketPrimary;
export const getAssetSecundary = (state: BncState): Asset => state.assetSecundary;
export const getAssetTicketSecundary = (state: BncState): AssetTicker => state.assetTicketSecundary;
export const getIsLoadingAll = (state: BncState): boolean => state.isLoadingAll;

export const slBncState = createFeatureSelector<BncState>(NameStore.BNC)

export const slAuth = createSelector(slBncState, getAuth);
export const slAssets = createSelector(slBncState, getAssets);
export const slAssetPrimary = createSelector(slBncState, getAssetPrimary);
export const slAssetTicketPrimary = createSelector(slBncState, getAssetTicketPrimary);
export const slAssetSecundary = createSelector(slBncState, getAssetSecundary);
export const slAssetTicketSecundary = createSelector(slBncState, getAssetTicketSecundary);
export const slIsLoadingAll = createSelector(slBncState, getIsLoadingAll);
