
import { Component, OnInit,Output, Input } from '@angular/core';
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
  current_item_name:string;
  current_item_number_c:string;
  current_item_number_t:string;
  current_item_c_name:string;

  constructor(private apiService: ApiService , private router:Router, private global : GlobalService) { }

  ngOnInit(): void {
    this.suscription = this.global.onToggleEdit().subscribe((value)=>(this.showEditItem = value));
    this.suscription = this.global.onToggleAdd().subscribe((value)=>(this.showAddItem = value));
    this.url = this.router.url;
    switch (this.router.url) {
      case "/branches":
        //this.apiService.get_roles().subscribe((roles) => this.items = roles);
        this.titulo = "Lista de salas";
        break;
      case "/clients-admin":
        //this.apiService.get_clientes().subscribe((clientes) => this.items = clientes);
        this.titulo = "Sistema de Gestión de Clientes";
        break;
      case "/employees-admin":
        //this.apiService.get_cuentas().subscribe((cuentas) => this.items = cuentas);
        this.titulo = "Sistema de Gestión de Empleados";
        break;
      case "/movies-admin":
        //this.apiService.get_tarjetas().subscribe((tarjetas) => this.items = tarjetas);
        this.titulo = "Sistema de Gestión de Peliculas";
        break;
      
      case "/room":
        //this.apiService.get_tarjetas().subscribe((tarjetas) => this.items = tarjetas);
        this.titulo = "Sistema de Gestión de Salas";
        break;

      case "/projection-admin":
        //this.apiService.get_tarjetas().subscribe((tarjetas) => this.items = tarjetas);
        this.titulo = "Sistema de Gestión de Proyecciones";
        break;
  
      default:
        break;
    }
  }

  /**
   * accede al servicio de UI cuando un item se quiere agregar o editar
   * esto con el fin de mostar el componente de add-item
   */
  toggleAddItem(){
    this.global.toggleAddItem();
  }

  /**
   * En via al API la accion de post con un item desconocido y lo agrega a la interfaz de ser exitosa la peticion
   * @param item recibe un item cualquiera para enviar al API
   */
  add_item(item:any){

    item = { 
      "cinema_name":"cinepolis",
      "province":"San Jose",
      "district":"Guadalupe",
      "room_quantity":3
    }
    this.items.push(item)
  }

  /**
   * funcion que se ejecuta al seleccionar la edicion de un item
   * @param item el item seleccionado
   */
  editItemClicked(item:any){
    this.global.toggleEditItem();
    //this.apiService.editing(item);
  }

  /**
   * esconde la barra de edicion de item
   */
  cancelEditItem(){
    this.global.cancelEdit();
  }

  /**
   * Funcion que envia al API la peticion de put para un item. La funcion es llamada
   * con un diferente atributo dependiendo el url del usuario y la llave primaria del objeto
   * @param item El item a editar
   */
  edit_item(item:any){

    switch (this.router.url) {
      case "/branches-admin":
        //this.apiService.put(item).subscribe(()=> {
        //  this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)
        //  this.items.push(item)
        //  });
        break;
        //this.apiService.put(item).subscribe(()=> {
        //  this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)
        //  this.items.push(item)
        //  });
        break;
      case "/employees-admin":
        //this.apiService.put(item).subscribe(()=> {
        //  this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)
        //  this.items.push(item)
        //  });
        break;
      case "/movies-admin":
        //this.apiService.put(item).subscribe(()=> {
        //  this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)
        //  this.items.push(item)
        //  });
        break;
      
      case "/room-admin":
        //this.apiService.put(item).subscribe(()=> {
        //  this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)
        //  this.items.push(item)
        //  });
        break;

      case "/projection-admin":
        //this.apiService.put(item).subscribe(()=> {
        //  this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)
        //  this.items.push(item)
        //  });
        break;
  
      default:
        break;
    }
    
  }

  /**
   * Funcion que envia al API la peticion de delete para un item. La funcion es llamada
   * con un diferente atributo dependiendo el url del usuario y la llave primaria del objeto
   */
  deleteItem(){
    //this.uiService.cancelEdit();


        switch (this.router.url) {
      case "/branches-admin":
        //this.apiService.delete().subscribe(() => (this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)));
        break;
        //this.apiService.delete().subscribe(() => (this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)));
        break;
      case "/employees-admin":
        //this.apiService.delete().subscribe(() => (this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)));
        break;
      case "/movies-admin":
        //this.apiService.delete().subscribe(() => (this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)));
        break;
      
      case "/room-admin":
        //this.apiService.delete().subscribe(() => (this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)));
        break;

      case "/projection-admin":
        //this.apiService.delete().subscribe(() => (this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)));
        break;

        }

      }
  


}
