import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';


@Component({
  selector: 'app-projections',
  templateUrl: './projections.component.html',
  styleUrls: ['./projections.component.css']
})

/**
 * Pagina de edicion y control de proyecciones
 */
export class ProjectionsComponent implements OnInit {

  suscription: Subscription;
  showAddItem:boolean;
  showEditItem: boolean;
  url:string;

  items = [];
  update: boolean;

  constructor(private apiService : ApiService, private router:Router ,private global : GlobalService) {

    this.url = this.router.url

   }

  ngOnInit(): void {

    this.suscription = this.global.onToggleEdit().subscribe((value)=>(this.showEditItem = value));
    this.suscription = this.global.onToggleAdd().subscribe((value)=>(this.showAddItem = value));
    this.apiService.get_projections().subscribe((projections) => this.items = projections);

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

    this.apiService.post(item).subscribe(() => {
      this.apiService.get_projections().subscribe((projections)=> this.items = projections)
    }, (error)=>{
        alert(error.error);
    });
    this.update = !this.update;
  }

  /**
   * Funcion que envia al API la peticion de put para un item. La funcion es llamada
   * con un diferente atributo dependiendo el url del usuario y la llave primaria del objeto
   * @param item El item a editar
   */
  edit_item(item:any){

    this.apiService.put(item).subscribe(() => {
      this.apiService.get_projections().subscribe((projections)=> this.items = projections );
    }, (error)=>{
      alert(error.error);
    });
    this.update = !this.update;
  }

  /**
   * Esconde la barra de edicion de item
   */
  cancelEditItem(){
      this.global.cancelEdit();
      this.update = !this.update;
  }
  
  /**
   * Funcion que envia al API la peticion de delete para un item. La funcion es llamada
   * con un diferente atributo dependiendo el url del usuario y la llave primaria del objeto
   */
  deleteItem(){
    this.cancelEditItem();
    this.apiService.delete().subscribe(()=> { 
      this.apiService.get_projections().subscribe((projections) => this.items = projections)
    },(error)=>{  
        alert(error.error);
      });
      this.update = !this.update;
  }


  /**
   * Funcion que se llama al comenzar a editar un item
   */
   onEditItem(){

    this.update = !this.update;
 
   }

}
