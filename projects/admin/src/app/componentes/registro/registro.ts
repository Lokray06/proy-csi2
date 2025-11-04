import { FormsModule } from '@angular/forms';
import { User } from './../../../../../shared/src/lib/modelos/usr.model';
import { Component } from '@angular/core';


@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
// 1. Inicializa un objeto para el modelo de datos del formulario
  public user: User = {
    username: '',
    email: '',
    role: 'user', // Valor por defecto
    acceptTerms: false
  };

  // 2. Propiedad para mostrar el resultado al enviar
  public submitted: boolean = false;
  public userResult: User | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  // 3. Método para manejar el envío del formulario
  // Los alumnos deben completar la lógica para capturar los datos.
  onSubmit(formValue: any) {
    // Alumno: Completa este método.
    // Debe establecer 'submitted' a true y guardar los datos
    // del usuario en 'userResult'.

    // Pista: El objeto 'formValue' que recibe el método ya contiene
    // todos los datos del formulario si usaste ngModel correctamente.

    // ⬇️ ¡LÍNEAS A COMPLETAR POR EL ALUMNO!
    this.submitted = true;
    this.userResult = formValue;
    console.log('Datos enviados:', formValue);
    // ⬆️ ¡FIN DE LÍNEAS A COMPLETAR POR EL ALUMNO!
  }

  // Opcional: Para mostrar los datos actuales del modelo
  get diagnostic() {
    return JSON.stringify(this.user, null, 2);
  }
}
