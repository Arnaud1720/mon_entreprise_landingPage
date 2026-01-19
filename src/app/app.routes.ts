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
    path: 'cgv',
    loadComponent: () => import('./pages/cgv/cgv.component').then(m => m.CgvComponent)
  },
  {
    path: 'mentions-legales',
    loadComponent: () => import('./pages/mentions-legales/mentions-legales.component').then(m => m.MentionsLegalesComponent)
  },
  {
    path: 'mon-approche',
    loadComponent: () => import('./pages/mon-approche/mon-approche.component').then(m => m.MonApprocheComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
