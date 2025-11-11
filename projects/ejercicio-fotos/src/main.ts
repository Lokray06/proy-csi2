// File: src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { appConfig } from './app/app.config';

// NOTE: This file is provided for context.
// In your real project, this is the file that bootstraps Angular.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));