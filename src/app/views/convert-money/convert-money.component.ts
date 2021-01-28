import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Asset, AssetTicker } from '~models';
import { BncStoreActions, BncStoreSelectors, BncStoreState } from '~root-store/bnc-store';

@Component({
  selector: 'app-convert-money',
  templateUrl: './convert-money.component.html',
  styleUrls: ['./convert-money.component.sass']
})
export class ConvertMoneyComponent implements OnInit, OnDestroy {

  unSubject$: Subject<any> = new Subject();
  fgConvert: FormGroup;

  assets: Asset[] = [];

  assetTicketPrimary: AssetTicker;
  assetTicketSecundary: AssetTicker;

  constructor(
    private fb: FormBuilder,
    private store: Store<BncStoreState.BncState>
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getSubcriptions();
  }

  createForm(): void {
    this.fgConvert = this.fb.group({
      mount: [undefined, [Validators.required, Validators.min(1)]],
      primaryCoin: [undefined, [Validators.required]],
      secundaryCoin: [undefined, [Validators.required]]
    });
  }

  selectPrimary(ev: NgbTypeaheadSelectItemEvent) {
    this.store.dispatch(BncStoreActions.LoadAssetTickerPrimary({ asset: ev.item }));
  }

  selectSecundary(ev: NgbTypeaheadSelectItemEvent) {
    this.store.dispatch(BncStoreActions.LoadAssetTickerSecundary({ asset: ev.item }));
  }

  convert(): void {
    if (!this.fgConvert.valid) return;
    const mount = this.fgConvert.value.mount;
    const convertOne: number = (this.assetTicketPrimary.price * mount) / 1;
    const convertionFinal: number = (convertOne * 1) / this.assetTicketSecundary.price;
    document.getElementById('total').setAttribute('value', convertionFinal.toFixed(2));
  }

  getSubcriptions(): void {
    this.store.select(BncStoreSelectors.slAssetSecundary)
      .pipe(takeUntil(this.unSubject$))
      .subscribe(asset => {
        if (asset) {
          this.fgConvert.patchValue({ secundaryCoin: asset });
        }
      });

    this.store.select(BncStoreSelectors.slAssetTicketPrimary)
      .pipe(takeUntil(this.unSubject$))
      .subscribe(asset => {
        if (asset) {
          this.assetTicketPrimary = asset;
        }
      });

    this.store.select(BncStoreSelectors.slAssetTicketSecundary)
      .pipe(takeUntil(this.unSubject$))
      .subscribe(asset => {
        if (asset) {
          this.assetTicketSecundary = asset;
        }
      });

    this.store.select(BncStoreSelectors.slAssets)
      .pipe(takeUntil(this.unSubject$))
      .subscribe(assets => {
        if (assets) {
          this.assets = assets;
        }
      });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.assets.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: Asset) => x.name;

  ngOnDestroy(): void {
    this.unSubject$.next();
    this.unSubject$.complete();
    this.unSubject$.unsubscribe();
  }
}
