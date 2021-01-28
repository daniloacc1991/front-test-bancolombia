import { assetsMocks, assetTicketMock, authMock } from 'src/app/mock';
import { BncStoreActions, BncStoreState } from '.';
import { reducer } from './bnc.reducer';
import { initialBncState } from './bnc.state';

describe('Bnc Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialBncState, action);

      expect(result).toBe(initialBncState);
    });
  });

  describe('an auth action', () => {
    it('should return the previous state', () => {
      const action = BncStoreActions.Auth();

      const result = reducer(initialBncState, action);

      expect(result).toEqual(initialBncState);
    });
  });

  describe('an authSuccess action', () => {
    it('should return the previous state', () => {

      const newState: BncStoreState.BncState = {
        ...initialBncState,
        auth: authMock,
      }

      const action = BncStoreActions.AuthSuccess({ data: authMock });
      const result = reducer(initialBncState, action);

      expect(result).toEqual(newState);
    });
  });

  describe('an LoadAll action', () => {
    it('should return the previous state', () => {

      const newState: BncStoreState.BncState = {
        ...initialBncState,
        isLoadingAll: true,
      }

      const action = BncStoreActions.LoadAll();
      const result = reducer(initialBncState, action);

      expect(result).toEqual(newState);
      expect(result.isLoadingAll).toBeTruthy();
    });
  });

  describe('an LoadAll action', () => {
    it('should return the previous state', () => {

      const newState: BncStoreState.BncState = {
        ...initialBncState,
        assets: assetsMocks,
        isLoadingAll: false,
      }

      const action = BncStoreActions.LoadAllSuccess({ items: assetsMocks });
      const result = reducer(initialBncState, action);

      expect(result).toEqual(newState);
    });
  });

  describe('an LoadAllFailure action', () => {
    it('should return the previous state', () => {

      const newState: BncStoreState.BncState = {
        ...initialBncState,
        isLoadingAll: false,
      }

      const action = BncStoreActions.LoadAllFailure();
      const result = reducer(initialBncState, action);

      expect(result).toEqual(newState);
    });
  });

  describe('an LoadAssetTickerPrimary action', () => {
    it('should return the previous state', () => {

      const newState: BncStoreState.BncState = {
        ...initialBncState,
        assetPrimary: assetsMocks[0],
      }

      const action = BncStoreActions.LoadAssetTickerPrimary({ asset: assetsMocks[0] });
      const result = reducer(initialBncState, action);

      expect(result).toEqual(newState);
    });
  });

  describe('an LoadAssetTickerPrimary action', () => {
    it('should return the previous state', () => {

      const newState: BncStoreState.BncState = {
        ...initialBncState,
        assetTicketPrimary: assetTicketMock,
      }

      const action = BncStoreActions.LoadAssetTickerPrimarySuccess({ assetTicker: assetTicketMock });
      const result = reducer(initialBncState, action);

      expect(result).toEqual(newState);
    });
  });

  describe('an LoadAssetTickerSecundary action', () => {
    it('should return the previous state', () => {
      const newState: BncStoreState.BncState = {
        ...initialBncState,
        assetSecundary: assetsMocks[0],
      }
      const action = BncStoreActions.LoadAssetTickerSecundary({ asset: assetsMocks[0] });
      const result = reducer(initialBncState, action);
      expect(result).toEqual(newState);
    });
  });

  describe('an LoadAssetTickerSecundary action', () => {
    it('should return the previous state', () => {
      const newState: BncStoreState.BncState = {
        ...initialBncState,
        assetTicketSecundary: assetTicketMock,
      }
      const action = BncStoreActions.LoadAssetTickerSecundarySuccess({ assetTicker: assetTicketMock });
      const result = reducer(initialBncState, action);
      expect(result).toEqual(newState);
    });
  });

});
