import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupSellerPrioritiesComponent } from '../../components/seller/setup-seller-priorities/setup-seller-priorities.component';
import { UnitDetailsComponent } from '../../components/seller/unit-details/unit-details.component';

const routes: Routes = [
  { path: '', component: SetupSellerPrioritiesComponent },
  { path: 'property-details', component: UnitDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
