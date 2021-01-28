import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '~core/enums';
import { ConvertMoneyComponent } from './views/convert-money/convert-money.component';
import { ListMoneyComponent } from './views/list-money/list-money.component';

const routes: Routes = [
  {
    path: Route.LIST,
    component: ListMoneyComponent
  },
  {
    path: Route.CONVERT,
    component: ConvertMoneyComponent,
  },
  {
    path: '**',
    redirectTo: `/${Route.CONVERT}`
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
