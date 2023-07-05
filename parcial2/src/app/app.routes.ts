import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'person/:id',
	loadComponent: () =>
	  import('./tab1/person-detail/person-detail.component').then((m) => m.PersonDetailComponent)
  },
];
