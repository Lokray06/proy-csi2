import { Component, inject, Input } from '@angular/core';
import { Articulo } from '../../../../../../shared/src/lib/modelos/articulo';
import { ActivatedRoute } from '@angular/router';
import { Articles } from '../../../../../../shared/src/lib/articles';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-articulo',
  imports: [FormsModule],
  templateUrl: './detalle-articulo.html',
  styleUrl: './detalle-articulo.css'
})
export class DetalleArticulo {

  private rutaActiva = inject(ActivatedRoute);
  private articuloId: string | null = this.rutaActiva.snapshot.paramMap.get('id');
  private articulosService = inject(Articles);

  articulo: any = {};

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.articulo = this.articulosService.getOneArticle(this.articuloId ? parseInt(this.articuloId) : 0);
    console.log('articulo -> ', this.articulo);
  }
}
