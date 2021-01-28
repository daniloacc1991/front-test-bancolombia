import { Asset, AssetTicker, AuthBNC } from "~models";

export interface BncState {
  assets: Asset[];
  assetPrimary: Asset;
  assetSecundary: Asset;
  assetTicketPrimary: AssetTicker;
  assetTicketSecundary: AssetTicker;
  auth: AuthBNC;
  isLoadingAll: boolean;
}


export const initialBncState: BncState = {
  assets: [],
  assetPrimary: undefined,
  assetSecundary: undefined,
  assetTicketPrimary: undefined,
  assetTicketSecundary: undefined,
  auth: undefined,
  isLoadingAll: false,
};
