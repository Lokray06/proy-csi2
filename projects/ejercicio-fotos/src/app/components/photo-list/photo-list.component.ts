// File: src/app/components/photo-list/photo-list.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Photo } from '../../models/photo.model';
import { JsonPlaceholderService } from '../../services/json-placeholder.service';

@Component({
    selector: 'app-photo-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './photo-list.component.html',
})
export class PhotoListComponent implements OnInit {
    private jsonService = inject(JsonPlaceholderService);
    public photos = signal<Photo[]>([]);

    ngOnInit(): void {
        // Fetches the first 100 photos
        this.jsonService.getPhotos(100, 0).subscribe({
            next: (data) => this.photos.set(data),
            error: (err) => console.error('Failed to load photo list', err)
        });
    }
}