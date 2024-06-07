import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupClientComponent } from './basic/components/signup-client/signup-client.component';
import { SignupCompanyComponent } from './basic/components/signup-company/signup-company.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupComponent } from './basic/components/signup/signup.component';
import { ProfileComponent } from './client/pages/profile/profile.component';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './basic/components/home/home.component';
import { HomeDetailedAdComponent } from './basic/components/home-detailed-ad/home-detailed-ad.component';

const routes: Routes = [
  { path: 'register_client', component: SignupClientComponent},
  { path: 'register_company', component: SignupCompanyComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: SignupComponent},
  { path: 'client/profile/:id', component: ProfileComponent},
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) }, 
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'admin/dashboard', component: AdminDashboardComponent},
  { path: 'home', component: HomeComponent},
  { path: 'home-detailedAd/:adId', component: HomeDetailedAdComponent },
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
