import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { NameStore } from '~core/enums';
import { reducer } from './bnc.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BncEffect } from './bnc.effects';
import { BncService } from '~services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(NameStore.BNC, reducer),
    EffectsModule.forFeature([BncEffect]),
  ],
  providers: [BncService],
})
export class BncStoreModule { }
