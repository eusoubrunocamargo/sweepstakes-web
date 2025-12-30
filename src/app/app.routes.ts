import { Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
// import { CompleteProfileComponent } from './pages/complete-profile/complete-profile.component';
// import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',
    loadComponent: () => import('./pages/login/login.component')
      .then(m => m.LoginComponent),
    // component: LoginComponent,
    canActivate: [publicGuard]
  },
  { path: 'complete-profile',
    loadComponent: () => import('./pages/complete-profile/complete-profile.component')
      .then(m => m.CompleteProfileComponent),
    // component: CompleteProfileComponent,
    canActivate: [authGuard]
  },
  { path: 'home',
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent),
    // component: HomeComponent,
    canActivate: [authGuard]
  },
];
