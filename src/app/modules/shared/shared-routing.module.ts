import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../shared/components/home/home.component';
import { MyVisitsComponent } from '../../shared/components/my-visits/my-visits.component';
import { MyUnitsComponent } from '../../shared/components/my-units/my-units.component';
import { BlogComponent } from '../../shared/components/blog/blog.component';
import { AboutUsComponent } from '../../shared/components/about-us/about-us.component';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';
import { ResultsComponent } from '../../shared/components/results/results.component';
import { SingleBlogComponent } from '../../shared/components/single-blog/single-blog.component';
import { HowItWorksComponent } from '../../shared/components/how-it-works/how-it-works.component';
import { TermsAndConditionsComponent } from '../../shared/components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from '../../shared/components/privacy-policy/privacy-policy.component';
import { SinglePropertyComponent } from '../../shared/components/single-property/single-property.component';
import { FavouritesComponent } from '../../shared/components/favourites/favourites.component';
import { NotificationsComponent } from '../../shared/components/notifications/notifications.component';
import { EditProfileComponent } from '../../shared/components/edit-profile/edit-profile.component';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'visits', component: MyVisitsComponent, canActivate: [AuthGuard] },
  { path: 'units', component: MyUnitsComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'blog', component: BlogComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'terms-condition', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'single-property', component: SinglePropertyComponent },
  { path: 'single-blog', component: SingleBlogComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavouritesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
