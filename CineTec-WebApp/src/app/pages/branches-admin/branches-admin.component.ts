import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-branches-admin',
  templateUrl: './branches-admin.component.html',
  styleUrls: ['./branches-admin.component.css']
})

/**
 * Pagina de edicion y control de sucursales
 */
export class BranchesAdminComponent implements OnInit {

  suscription: Subscription;
  showAddItem:boolean;
  showEditItem: boolean;
  url:string;
  x:any;

  items = [];

  constructor(private apiService : ApiService ,private router:Router ,private global : GlobalService) {

    this.url = this.router.url

  }

  ngOnInit(): void {

    this.suscription = this.global.onToggleEdit().subscribe((value)=>(this.showEditItem = value));
    this.suscription = this.global.onToggleAdd().subscribe((value)=>(this.showAddItem = value));
    this.apiService.get_branches().subscribe((branches) => this.items = branches);

  }

  /**
   * Accede al servicio global cuando un item se quiere agregar o editar
   * esto con el fin de mostar el componente de add-item
   */
  toggleAddItem(){
    this.global.toggleAddItem();
  }

  /**
   * Funcion que se ejecuta cuando se desea agregar un nuevo item a la base de datos
   * @param item nuevo item a agregar
   */
  add_item(item:any){

      this.apiService.post(item).subscribe(()  => {
        this.apiService.get_branches().subscribe((branches) => {
          this.items = branches
        })
      }, (error) =>{alert(error.error)}
    );
  }

  /**
   * Funcion que se ejecuta cuando se desea editar un item
   * @param item nuevos datos del item editado
   */
  edit_item(item:any){

    this.apiService.put(item).subscribe(() =>{                         
      this.apiService.get_branches().subscribe((branches) => this.items = branches);
      }, (error) => {alert(error.error);}); 
                                    
  }

  /**
   * Esconde la barra de edicion de item
   */
  cancelEditItem(){
      this.global.cancelEdit();
  }
  
  /**
   * Funcion que se ejecuta cuando se desea eliminar un item
   */
  deleteItem(){
    this.cancelEditItem();
    this.apiService.delete().subscribe(() =>{
      this.items = this.items.filter(i => i.cinema_name !== this.global.getCurrentItem().cinema_name);
    },(error) =>
         (alert(error.error)));
  }
}
                                              