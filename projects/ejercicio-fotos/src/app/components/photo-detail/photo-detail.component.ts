// File: src/app/components/photo-detail/photo-detail.component.ts
import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { Photo } from '../../models/photo.model';
import { JsonPlaceholderService } from '../../services/json-placeholder.service';

@Component({
    selector: 'app-photo-detail',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './photo-detail.component.html',
})
export class PhotoDetailComponent implements OnInit, OnDestroy {
    private jsonService = inject(JsonPlaceholderService);
    private route = inject(ActivatedRoute);
    private fb = inject(FormBuilder);
    private sub?: Subscription;

    public photo = signal<Photo | undefined>(undefined);
    public loading = signal(true);
    public photoForm: FormGroup;

    constructor() {
        this.photoForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            url: ['', [Validators.required, Validators.pattern('https?://.+')]],
        });
    }

    ngOnInit(): void {
        // Get ID from URL and fetch photo details
        this.sub = this.route.paramMap.pipe(
            map(params => params.get('id')),
            filter(id => !!id),
            map(id => parseInt(id!, 10)),
            switchMap(id => {
                this.loading.set(true);
                return this.jsonService.getPhotoById(id);
            }),
            tap(photo => {
                this.loading.set(false);
                this.photo.set(photo);

                // Load photo data into the form
                if (photo) {
                    this.photoForm.patchValue({
                        title: photo.title,
                        url: photo.url
                    });
                }
            })
        ).subscribe();
    }

    saveChanges(): void {
        if (this.photoForm.valid) {
            // Show updated value in console (PUT simulation)
            const updatedData = { ...this.photo(), ...this.photoForm.value };
            console.log('--- Form Updated Data (PUT simulation) ---');
            console.log('Original Photo ID:', this.photo()!.id);
            console.log('New Values:', this.photoForm.value);
            console.log('Complete Updated Object:', updatedData);

            // Update local state to show changes immediately
            this.photo.update(current => current ? updatedData : undefined);
        } else {
            console.warn('Invalid form. Please check the fields.');
        }
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}