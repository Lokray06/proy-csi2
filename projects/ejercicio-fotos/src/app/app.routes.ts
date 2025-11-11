// File: src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'Home - Photo Gallery' },
    { path: 'photos', component: PhotoListComponent, title: 'Photo Listing' },
    { path: 'detail/:id', component: PhotoDetailComponent, title: 'Photo Detail' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];