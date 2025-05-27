import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OopsComponent } from './shared/components/oops/oops.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./modules/shared/shared-routing.module').then(m => m.SharedRoutingModule)
  },
  {
    path: 'buy',
    loadChildren: () => import('./modules/buyer/buyer-routing.module').then(m => m.BuyerRoutingModule)
  },
  {
    path: 'sell',
    loadChildren: () => import('./modules/seller/seller-routing.module').then(m => m.SellerRoutingModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  { path: '**', component: OopsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
