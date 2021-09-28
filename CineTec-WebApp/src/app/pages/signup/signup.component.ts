import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

/**
 * Esta pagina se encarga del login del usurio
 */
export class SignupComponent implements OnInit {
    username: string;
    password: string;
    test : Date = new Date();
    focus;
    focus1;
    constructor() { }

    ngOnInit() {}


   /**
   * Esta funcion valida si las entradas del usuario coinciden con alguno de los usuarios en base de datos
   * y redirecciona de manera acorde. Si el usuario ingresa un nombre de usuario y contraseña que 
   * se encuentren en la base de datos le ingresa como cliente. 
   * Si el usuario es admin le redirecciona al la pagina de administrador
   * @returns void
   */
  onSubmit(): void {

    const user = {
        username: this.username,
        password:this.password,
    }

    console.log(user);

    this.username = '';
    this.password = ''; 


  }
}
