import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EndPoints } from '~core/enums';
import { environment } from '~environment';
import { AssetTicker, AuthBNC, Asset } from '~models';

@Injectable()
export class BncService {

  private url: string;

  constructor(
    private readonly http: HttpClient,
  ) {
    this.url = environment.api;
  }

  auth(): Observable<AuthBNC> {
    const body = {
      audience: "https://api.bravenewcoin.com",
      client_id: "oCdQoZoI96ERE9HY3sQ7JmbACfBf55RY",
      grant_type: "client_credentials"
    };
    return this.http.post<AuthBNC>(`${this.url}${EndPoints.AUTH}`, body);
  }

  getAllAssets(): Observable<Asset[]> {
    return this.http.get(`${this.url}${EndPoints.ASSET}?type=CRYPTO`).pipe(map((res: any) => res.content))
  }

  getAssetTicker(id: string): Observable<AssetTicker> {
    return this.http.get(`${this.url}${EndPoints.ASSET_TICKET}?assetId=${id}`).pipe(map((res: any) => res.content[0]))
  }
}
