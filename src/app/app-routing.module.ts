import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { OopsComponent } from './shared/components/oops/oops.component';
import { MyVisitsComponent } from './shared/components/my-visits/my-visits.component';
import { MyUnitsComponent } from './shared/components/my-units/my-units.component';
import { BlogComponent } from './shared/components/blog/blog.component';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ResultsComponent } from './shared/components/results/results.component'
import { SetPrioritesComponent } from './shared/components/set-priorites/set-priorites.component';
import { SetupBuyerPrioritiesComponent } from './components/buyer/setup-buyer-priorities/setup-buyer-priorities.component'
import { SingleBlogComponent } from './shared/components/single-blog/single-blog.component'
import { NotificationsComponent } from './shared/components/notifications/notifications.component'
import { SetupSellerPrioritiesComponent } from './components/seller/setup-seller-priorities/setup-seller-priorities.component'
import { AuthGuard } from './shared/guards/auth.guard'
import { SinglePropertyComponent } from './shared/components/single-property/single-property.component';
import { HowItWorksComponent } from './shared/components/how-it-works/how-it-works.component';
import { EditProfileComponent } from './shared/components/edit-profile/edit-profile.component';
import { UnitDetailsComponent } from './components/seller/unit-details/unit-details.component'
import { BuyerUnitDetailsComponent } from './components/buyer/unit-details/unit-details.component'
import { TermsAndConditionsComponent } from './shared/components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { FavouritesComponent } from './shared/components/favourites/favourites.component'
const routes: Routes = [
  { path: 'home', component: HomeComponent, },
  { path: 'visits', component: MyVisitsComponent, canActivate: [AuthGuard] },
  { path: 'units', component: MyUnitsComponent, canActivate: [AuthGuard]  },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]  },
  { path: 'blog', component: BlogComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'terms-condition', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'sell/property-details', component: UnitDetailsComponent },
  { path: 'buy/property-details', component: BuyerUnitDetailsComponent },
  { path: 'single-property', component: SinglePropertyComponent },
  { path: 'set-priorities', component: SetPrioritesComponent },
  { path: 'priorities-form', component: SetupBuyerPrioritiesComponent },
  { path: 'single-blog', component: SingleBlogComponent },
  { path: 'sell', component: SetupSellerPrioritiesComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]  },
  { path: 'favorites', component: FavouritesComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: OopsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
