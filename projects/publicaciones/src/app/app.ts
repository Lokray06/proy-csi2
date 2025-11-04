import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Head } from "./components/head/head";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Head],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('publicaciones');
}
