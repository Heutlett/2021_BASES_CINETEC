import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-branches-admin',
  templateUrl: './branches-admin.component.html',
  styleUrls: ['./branches-admin.component.css']
})
export class BranchesAdminComponent implements OnInit {

  suscription: Subscription;
  showAddItem:boolean;
  showEditItem: boolean;


  items = [];

  url:string;

  constructor(private apiService : ApiService ,private router:Router ,private global : GlobalService) {

    this.url = router.url

   }

  ngOnInit(): void {

    this.suscription = this.global.onToggleEdit().subscribe((value)=>(this.showEditItem = value));
    this.suscription = this.global.onToggleAdd().subscribe((value)=>(this.showAddItem = value));

    this.apiService.get_branches().subscribe((branches) => this.items = branches);

  }



  /**
   * accede al servicio de UI cuando un item se quiere agregar o editar
   * esto con el fin de mostar el componente de add-item
   */
  toggleAddItem(){
    this.global.toggleAddItem();
  }




  add_item(item:any){
      this.apiService.post(item).subscribe(() => this.items.push(item));
    }

    


  edit_item(item:any){

    this.apiService.put(item).subscribe(() => {

      this.items = this.items.filter(i => i.cinema_name !== this.global.getCurrentItem().cinema_name)
      this.items.push(item);
    });

    this.global.toggleEditItem();
    

  }

    /**
   * esconde la barra de edicion de item
   */
  cancelEditItem(){
      this.global.cancelEdit();
  }
  


  deleteItem(){
    this.cancelEditItem();
    this.apiService.delete().subscribe(() => this.items = this.items.filter(i => i.cinema_name !== this.global.getCurrentItem().cinema_name))
  }




}
