export interface AssetTicker {
  id: string;
  assetId: string;
  timestamp: string;
  marketCapRank: number;
  volumeRank: number;
  price: number;
  volume: number;
  totalSupply: number;
  freeFloatSupply: number;
  marketCap: number;
  totalMarketCap: number;
}
