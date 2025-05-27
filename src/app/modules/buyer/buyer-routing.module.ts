import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupBuyerPrioritiesComponent } from '../../components/buyer/setup-buyer-priorities/setup-buyer-priorities.component';
import { BuyerUnitDetailsComponent } from '../../components/buyer/unit-details/unit-details.component';
import { SetPrioritesComponent } from '../../shared/components/set-priorites/set-priorites.component';

const routes: Routes = [
  { path: 'property-details', component: BuyerUnitDetailsComponent },
  { path: 'priorities-form', component: SetupBuyerPrioritiesComponent },
  { path: 'set-priorities', component: SetPrioritesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
