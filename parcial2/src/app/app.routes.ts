import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  // {
  //   path: 'person/:id',
	// loadComponent: () =>
	//   import('./music-player/music-player.component').then((m) => m.MusicPlayerComponent)
  // },
];
