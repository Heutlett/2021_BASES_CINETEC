import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'app/services/global.service';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})

/**
 * Pantalla de seleccion de ticketes 
 */
export class TicketsComponent implements OnInit {

  Img :string;
  Name: string;
  Precio : number;
  Subtotal : number;
  Cantidad = 1;

  constructor(private globalService : GlobalService, private router: Router) { }

  ngOnInit(): void {

    this.Img = "assets/img/"  + this.globalService.current_movie + ".jpg";
    this.Name = this.globalService.current_movie;
    this.Precio = this.globalService.current_price;
    this.Subtotal = this.Precio * this.Cantidad;

  }
  
  /**
   * Aumenta la cantidad de ticketes seleccionados
   */
  add(){

    this.Cantidad ++;
    this.Subtotal = this.Precio * this.Cantidad;

  }

   /**
   * Disminuye la cantidad de ticketes seleccionados
   */
  delete(){

    this.Cantidad --;
    this.Subtotal = this.Precio * this.Cantidad;

  }
  
  /**
   * Confirma la cantidad de entradas que se van a comprar
   */
  seats(){

    this.globalService.current_tickets = this.Cantidad;
    this.globalService.current_subtotal = this.Subtotal;
    this.globalService.clear_seats();
    this.router.navigateByUrl('/seats');

  }

}
