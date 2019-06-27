import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { StoresComponent } from './stores/components/stores/stores.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { StoreDetailComponent } from './stores/components/store-detail/store-detail.component';

const routes: Routes = [
  { path: 'home', component:  HomeComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'signup', component:  SignupComponent},
  { path: 'stores', canActivate: [AuthGuard], component:  StoresComponent},
  { path: 'stores/:storename', canActivate: [AuthGuard], component: StoreDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
