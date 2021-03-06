import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { GlobalService } from '../../services/global.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

/**
 * Este componente es una abstraccion de un item de la base de datos, posee todos los 
 * atributos posibles para los objetos de la base de datos y los muestra segun 
 * el url donde se encuentre el usuario
 */
export class ItemComponent implements OnInit {
  @Input() item: any;
  @Output() onEditItem: EventEmitter<any> = new EventEmitter()

  in_clients = false;
  in_employees = false;
  in_branches = false;
  in_movies = false;
  in_rooms = false;
  in_projections = false;

  
  constructor(private router:Router, private global : GlobalService) {

    switch (this.router.url) {
      case "/branches":
        this.in_branches = true;
        break;

      case "/clients":
        this.in_clients = true;
        break;

      case "/employees":
        this.in_employees = true;
        break;

      case "/movies":
        this.in_movies = true;
        break;

      case "/rooms":
        this.in_rooms = true;
        break;

      case "/projections":
        this.in_projections = true;
        break;
    
      default:
        break;
    }

   }

  ngOnInit(): void {}

  /**
   * Esta funcion se ejecuta cuando a un item especifico se le selecciona la opcion de edicion
   * @param item Emite el item que se esta editando
   */
  onEdit(item:any){
    this.global.setCurrentItem(item);
    this.onEditItem.emit(item)
  }

}