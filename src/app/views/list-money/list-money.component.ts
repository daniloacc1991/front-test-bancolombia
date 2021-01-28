import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Route } from '~core/enums';
import { Asset } from '~models';
import { BncStoreActions, BncStoreSelectors, BncStoreState } from '~root-store/bnc-store';

@Component({
  selector: 'app-list-money',
  templateUrl: './list-money.component.html',
  styleUrls: ['./list-money.component.sass'],
})
export class ListMoneyComponent implements OnDestroy {

  throttle = 50;
  scrollDistance = 2;

  // Borrar
  sum = 20;
  sliceAsset: number = 20;
  assetsLoad: Asset[] = [];
  assetsView: Asset[] = [];

  unSubject$: Subject<any> = new Subject();

  constructor(
    private store: Store<BncStoreState.BncState>,
    private router: Router,
  ) {
    this.subcriptions();
  }

  onScrollDown(ev) {
    this.sum += this.sliceAsset;
    this.appendItems(0, this.sum);
  }

  appendItems(startIndex: number, endIndex: number) {
    for (let i = startIndex; i < endIndex; i++) {
      this.assetsView.push({ ...this.assetsLoad[i], price: +(Math.random() * (99 - 10) + 10).toFixed(0) });
    }
  }

  goConvert(asset: Asset) {
    this.store.dispatch(BncStoreActions.LoadAssetTickerSecundary({ asset }));
    this.router.navigate(['/convert']);
  }

  getPrice(): number {
    return +(Math.random() * (99 - 10) - 10).toFixed(0);
  }

  subcriptions() {
    this.store.select(BncStoreSelectors.slAssets)
      .pipe(
        takeUntil(this.unSubject$),
      )
      .subscribe(assets => {
        this.assetsLoad = assets;
        if (assets.length === 0) {
          this.store.dispatch(BncStoreActions.LoadAll());
        } else {
          this.appendItems(0, this.sum);
        }
      });
  }

  ngOnDestroy(): void {
    this.unSubject$.next();
    this.unSubject$.complete();
    this.unSubject$.unsubscribe();
  }

}
