import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { GlobalService } from 'app/services/global.service';

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
    constructor(private apiService:ApiService , private globalService:GlobalService , private router : Router) { }

    ngOnInit() {}


   /**
   * Esta funcion valida si las entradas del usuario coinciden con alguno de los usuarios en base de datos
   * y redirecciona de manera acorde
   * @returns void
   */
  onSubmit(): void {

    const user = {
        username: this.username,
        password:this.password,
    }

    this.apiService.get_client(user).subscribe((user)=> {
      user = user[0]
      this.router.navigateByUrl("/home");
      console.log(user)
      this.globalService.client_id = user.cedula.toString();
      this.globalService.client_name = user.first_name + " " + user.first_surname + " " + user.second_surname;
      this.globalService.client_phone_number = user.phone_number;  
      this.globalService.client_age = user.age.toString();
      this.globalService.b_date = user.birth_date;
      this.globalService.client_username = user.username;
      this.globalService.client_password = user.password;
    }, (error)=> {
      alert(error.error);
    });

    this.username = '';
    this.password = ''; 
  }

}
