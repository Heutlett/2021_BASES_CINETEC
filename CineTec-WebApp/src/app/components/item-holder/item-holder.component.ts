import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Router} from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-item-holder',
  templateUrl: './item-holder.component.html',
  styleUrls: ['./item-holder.component.css']
})

/**
 * Este componente esta diseñado especificamente para mostrar una serie de items abstraidos
 * cuenta con las funciones necesarias para editar, agregar o eliminar segun los items emitan
 * o sus propios componentes registren la interaccion del usuario (boton)
 */
export class ItemHolderComponent implements OnInit {

  @Input() items:any[];
  titulo:String;
  url:String;
  suscription: Subscription;
  showAddItem:boolean;
  showEditItem: boolean;

  constructor(private router:Router, private global : GlobalService) { }

  ngOnInit(): void {
    this.suscription = this.global.onToggleEdit().subscribe((value)=>(this.showEditItem = value));
    this.suscription = this.global.onToggleAdd().subscribe((value)=>(this.showAddItem = value));
    this.url = this.router.url;
    switch (this.router.url) {
      case "/branches":
        this.titulo = "Lista de surcursales";
        break;

      case "/clients":
        this.titulo = "Lista de clientes";
        break;

      case "/employees":
        this.titulo = "Lista de empleados";
        break;

      case "/movies":
        this.titulo = "Lista de peliculas";
        break;

      case "/rooms":

        this.titulo = "Lista de salas";
        break;

      case "/projections":
        this.titulo = "Lista de proyecciones";
        break;
      default:
        break;
    }
  }

  /**
   * Funcion que se ejecuta al seleccionar la edicion de un item
   * @param item el item seleccionado
   */
  editItemClicked(item:any){
    this.global.toggleEditItem(); 
  }

}
