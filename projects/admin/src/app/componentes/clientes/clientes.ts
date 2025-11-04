import { Component, inject } from '@angular/core';
import { ClientesService } from '../../../../../shared/src/lib/clientes-service';
import { RouterLink } from "@angular/router";
import { DetalleCliente } from "./detalle-cliente/detalle-cliente";
import { Cliente } from '../../../../../shared/src/lib/modelos/cliente';

@Component({
  selector: 'app-clientes',
  imports: [RouterLink, DetalleCliente],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes {

  // Inyectar servicio de clientes y recuperar la lista del cientes
  private clientesService = inject(ClientesService);
  listaClientes: Cliente[] = this.clientesService.getClientes();
  clienteSeleccionado: Cliente | null = null;

  verCliente(unCliente: Cliente) {
    console.log('unCLiente es -> ',unCliente);

    this.clienteSeleccionado = unCliente;
  }

}
