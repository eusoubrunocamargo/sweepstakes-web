import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CompleteProfileComponent } from './pages/complete-profile/complete-profile.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'complete-profile', component: CompleteProfileComponent },
  { path: 'home', component: HomeComponent },
];
