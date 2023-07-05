import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),

  }
  
];
