import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BncService } from './bnc.service';
import { Asset, AssetTicker, AuthBNC } from '../models';
import { assetsMocks, authMock } from '../mock';
import { assetTicketMock } from '../mock/asset-ticket.mock';
import { EndPoints } from '~core/enums';
import { environment } from '~environment';

describe('BncService', () => {
  let service: BncService;
  let httpMock: HttpTestingController;
  let assetsMockLocal: Asset[] = assetsMocks;
  let api: string = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BncService],
    });
    service = TestBed.inject(BncService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Debe crear el BncServicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debe llamar el metodo auth y retornar el token', () => {
    service.auth().subscribe((auth: AuthBNC) => {
      expect(auth).toEqual(authMock);
      expect(auth.access_token).toBeDefined();
      expect(auth.expires_in).toBeDefined();
      expect(auth.scope).toBeDefined();
    });

    const _httpMock = httpMock.expectOne(`${api}${EndPoints.AUTH}`);
    expect(_httpMock.request.method).toBe('POST');
    _httpMock.flush(authMock);
  })

  it('Debe llamar el metodo getAllAssets y retornar los assets', () => {
    service.getAllAssets().subscribe((assets: Asset[]) => {
      expect(assets.length).toBeGreaterThanOrEqual(20);
      expect(assets).toEqual(assetsMockLocal);
      expect(assets[0].id).toBeDefined();
      expect(assets[0].name).toBeDefined();
      expect(assets[0].type).toBeDefined();
    });

    const _httpMock = httpMock.expectOne(`${api}${EndPoints.ASSET}?type=CRYPTO`);
    expect(_httpMock.request.method).toBe('GET');
    _httpMock.flush(assetsMockLocal);
  })

  it('Debe llamar el metodo getAssetTicker y retornar un assetTicket', () => {
    service.getAssetTicker(assetTicketMock.assetId).subscribe((assetTicket: AssetTicker) => {
      expect(assetTicket).toEqual(assetTicketMock);
      expect(assetTicket.price).toBeDefined();
      expect(assetTicket.id).toBeDefined();
      expect(assetTicket.assetId).toBeDefined();
      expect(assetTicket.assetId).toEqual(assetTicketMock.assetId);
    });

    const _httpMock = httpMock.expectOne(`${api}${EndPoints.ASSET_TICKET}?assetId=${assetTicketMock.assetId}`);
    expect(_httpMock.request.method).toBe('GET');
    _httpMock.flush(assetsMockLocal);
  })

});
