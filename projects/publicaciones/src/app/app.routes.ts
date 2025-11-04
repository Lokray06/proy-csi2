import { Routes } from '@angular/router';
import { Bienvenido }  from './components/bienvenido/bienvenido';

export const routes: Routes = [
  {
    path: 'home',
    component: Bienvenido
  },
  {
    path: 'publicaciones',
    loadComponent: () => import('./components/posts/posts').then(c => c.Posts)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];
