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
    path: 'users',
    loadComponent: () => import('./components/users/users').then(c => c.Users)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];
