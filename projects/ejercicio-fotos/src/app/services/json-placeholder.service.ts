// File: src/app/services/json-placeholder.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  // Utility function to replace problematic image domains with a reliable placeholder
  // This is necessary because via.placeholder.com often fails DNS resolution.
  private sanitizePhotoUrls(photo: Photo): Photo {
    const badDomain = 'via.placeholder.com';
    const goodDomain = 'placehold.co';

    const sanitize = (url: string): string => {
      if (url.includes(badDomain)) {
        // Use regex to extract size and color to reconstruct a working placehold.co URL
        const sizeMatch = url.match(/(\d+)\/([a-fA-F0-9]+)/);
        if (sizeMatch) {
          const size = sizeMatch[1];
          const color = sizeMatch[2];
          // Construct the new URL using the reliable placeholder service
          return `https://${goodDomain}/${size}x${size}/${color}/ffffff?text=Photo+${photo.id}`;
        }
      }
      return url;
    };

    return {
      ...photo,
      // Apply sanitization to both full and thumbnail URLs
      url: sanitize(photo.url),
      thumbnailUrl: sanitize(photo.thumbnailUrl)
    };
  }

  getPhotos(limit: number, start: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}?_start=${start}&_limit=${limit}`).pipe(
      // Map over the array and sanitize each photo's URLs
      map(photos => photos.map(photo => this.sanitizePhotoUrls(photo))),
      catchError(error => {
        console.error('Error fetching photos:', error);
        return of([]);
      })
    );
  }

  getPhotoById(id: number): Observable<Photo | undefined> {
    if (!id || id <= 0) {
      return of(undefined);
    }
    return this.http.get<Photo>(`${this.apiUrl}/${id}`).pipe(
      // Sanitize the single photo's URLs
      map(photo => this.sanitizePhotoUrls(photo)),
      catchError(error => {
        console.error(`Error fetching photo with ID ${id}:`, error);
        return of(undefined);
      })
    );
  }
}