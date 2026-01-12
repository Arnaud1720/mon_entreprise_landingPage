import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'saas',
    loadComponent: () => import('./pages/saas/saas.component').then(m => m.SaasComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
