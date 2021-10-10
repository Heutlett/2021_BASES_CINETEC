import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  Img :string;
  Name: string;
  Precio : number;
  Cantidad = 1;
  Subtotal : number;

  constructor(private globalService : GlobalService, private router: Router, private apiService : ApiService) { }

  ngOnInit(): void {

    this.Img = "assets/img/"  + this.globalService.current_movie + ".jpg";
    this.Name = this.globalService.current_movie;
    this.Precio = this.globalService.current_price;
    this.Subtotal = this.Precio * this.Cantidad;

  
  }
  
  add(){

    this.Cantidad ++;

    this.Subtotal = this.Precio * this.Cantidad;

  }

  delete(){

    this.Cantidad --;

    this.Subtotal = this.Precio * this.Cantidad;

  }

  seats(){

    this.globalService.current_tickets = this.Cantidad;
    this.globalService.current_subtotal = this.Subtotal;
    this.router.navigateByUrl('/seats');

  }


}
