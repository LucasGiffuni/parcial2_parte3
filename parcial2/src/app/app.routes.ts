import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'empresaList',
	loadComponent: () =>
	  import('./tab2/empresa-list/empresa-list.component').then((m) => m.EmpresaListComponent)
  },
  {
	path: 'empresa/:id',
	loadComponent: () =>
		import('./tab2/empresa-list/empresa/empresa.component').then((m) => m.EmpresaComponent)
  },
];
