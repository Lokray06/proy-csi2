import { Component, inject, signal } from '@angular/core';
import { Articles } from '../../../../../shared/src/lib/articles';
import { DetalleArticulo } from "./detalle-articulo/detalle-articulo";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-articulos',
  imports: [RouterLink],
  templateUrl: './articulos.html',
  styleUrl: './articulos.css'
})
export class Articulos {

  private articulos = inject(Articles);

  listaArticulos = this.articulos.getArticulos();
  articuloSeleccionado = signal<number | null>(null)

  seleccionaArticulo(id: number) {
    this.articuloSeleccionado.set(id);
  }
}
