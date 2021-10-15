import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/services/global.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    nombre:string;
    cedula:string;
    b_date:string;
    edad:string;
    telefono:string;
    username:string;
    password:string;

    constructor(private globalService : GlobalService) { }

    ngOnInit() {

        this.nombre = this.globalService.client_name;
        this.cedula = this.globalService.client_id;
        this.b_date = this.globalService.b_date;
        this.edad = this.globalService.client_age;
        this.telefono = this.globalService.client_phone_number;
        this.username = this.globalService.client_username;
        this.password = this.globalService.client_password;

    }

}
