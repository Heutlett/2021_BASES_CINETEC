import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'app-movie-time-button',
  templateUrl: './movie-time-button.component.html',
  styleUrls: ['./movie-time-button.component.css']
})

/**
 * Componente boton de utilidad para la seleccion de proyecciones 
 */
export class MovieTimeButtonComponent implements OnInit {

  @Input() Time: string;
  @Input() projection_id: number;
  @Input() Room_id: number;
  @Input() Name: string;
  @Input() Price: number;

  constructor(private globalService:GlobalService, private router : Router) { }

  ngOnInit(): void {
  }

  /**
   * Funcion que se ejecuta al seleccionar una proyeccion
   */
  onClick(){

    this.globalService.current_movie = this.Name;
    this.globalService.current_time = this.Time;
    this.globalService.current_projection = this.projection_id;
    this.globalService.current_price = this.Price;
    this.globalService.current_room = this.Room_id;
    this.router.navigateByUrl("/tickets")

  }

}
