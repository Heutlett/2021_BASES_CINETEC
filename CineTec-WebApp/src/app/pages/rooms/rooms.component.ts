import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import { GlobalService } from '../../services/global.service';
import {ApiService} from '../../services/api.service';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

/**
 * Pagina de edicion y control de salas
 */
export class RoomsComponent implements OnInit {

  url:string;
  suscription: Subscription;
  showAddItem:boolean;
  showEditItem: boolean;

  items = [ ];


  constructor(private apiService : ApiService, private router:Router ,private global : GlobalService) {

    this.url = router.url

   }

  ngOnInit(): void {

    this.suscription = this.global.onToggleEdit().subscribe((value)=>(this.showEditItem = value));
    this.suscription = this.global.onToggleAdd().subscribe((value)=>(this.showAddItem = value));
    this.apiService.get_rooms().subscribe((rooms) => this.items = rooms);

  }

  /**
   * Accede al servicio de UI cuando un item se quiere agregar o editar
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

      this.apiService.post(item).subscribe(()=> {        
        this.apiService.get_rooms().subscribe((rooms) => {this.items = rooms})
      }, (error)=> {
        alert(error.error);
      });

    }

  /**
   * Funcion que envia al API la peticion de put para un item. La funcion es llamada
   * con un diferente atributo dependiendo el url del usuario y la llave primaria del objeto
   * @param item El item a editar
   */
  edit_item(item:any){

    this.apiService.put(item).subscribe(() => {
      this.items = this.items.filter(() => this.apiService.get_rooms().subscribe((rooms) => this.items = rooms));
    }, (error) => {
      alert(error.errors);
    });
    
  }

  /**
   * Esconde la barra de edicion de item
   */
     cancelEditItem(){
      this.global.cancelEdit();
  }
  
  /**
   * Funcion que envia al API la peticion de delete para un item. La funcion es llamada
   * con un diferente atributo dependiendo el url del usuario y la llave primaria del objeto
   */  
  deleteItem(){

    this.cancelEditItem();
    this.apiService.delete().subscribe(() => {  
      this.items = this.items.filter(i => i.id !== this.global.getCurrentItem().id)
    }, (error)=>{
      alert(error.error)
     });
  }

}
