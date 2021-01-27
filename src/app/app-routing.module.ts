import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConvertMoneyComponent } from './views/convert-money/convert-money.component';
import { ListMoneyComponent } from './views/list-money/list-money.component';

const routes: Routes = [
  {
    path: "list",
    component: ListMoneyComponent
  },
  {
    path: "convert",
    component: ConvertMoneyComponent,
  },
  {
    path: '**',
    redirectTo: '/list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
