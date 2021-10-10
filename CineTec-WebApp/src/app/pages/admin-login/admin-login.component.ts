import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username: string;
  password: string;
  test : Date = new Date();
  focus;
  focus1;

  constructor() { }

  ngOnInit(): void {
  }

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
