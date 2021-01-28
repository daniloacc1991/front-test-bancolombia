import { NameStore } from "~core/enums";
import { BncStoreState } from "~root-store/bnc-store";
import { State } from "~root-store/root-store";
import { assetTicketMock } from "./asset-ticket.mock";
import { authMock } from "./auth-bnc.mock";
import { assetsMocks } from "./crypto.mock";

export type BncState = {
  [NameStore.BNC]: BncStoreState.BncState,
};

export const initialStateMock: State = {
  bnc: BncStoreState.initialBncState
};

export const initialBncStateMock: BncState = {
  ...initialStateMock,
  bnc: BncStoreState.initialBncState,
};


export const companyStateMock: BncStoreState.BncState = {
  assetPrimary: assetsMocks[0],
  assetSecundary: assetsMocks[0],
  assetTicketPrimary: assetTicketMock,
  assetTicketSecundary: assetTicketMock,
  assets: assetsMocks,
  auth: authMock,
  isLoadingAll: false,
};

export const newStateMock: State = {
  bnc: companyStateMock,
};
