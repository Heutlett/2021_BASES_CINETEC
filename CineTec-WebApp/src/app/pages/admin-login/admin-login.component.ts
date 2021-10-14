import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

/**
 * Pagina de ingreso como administrador
 */
export class AdminLoginComponent implements OnInit {

  username: string;
  password: string;
  test : Date = new Date();
  focus;
  focus1;
  

  constructor(private apiService:ApiService , private router : Router) { }

  ngOnInit(): void {
  }

  /**
   * Esta funcion valida si las entradas del usuario coinciden con alguno de los usuarios en base de datos
   * y redirecciona de manera acorde.
   * @returns void
   */
   onSubmit(): void {

    const user = {
      username: this.username,
      password:this.password,
  }

  this.apiService.get_employee(user).subscribe((user)=> {
    
    this.router.navigateByUrl("/branches");

  }, (error)=> {
    alert(error.error);
  });

  this.username = '';
  this.password = ''; 

  }

}
