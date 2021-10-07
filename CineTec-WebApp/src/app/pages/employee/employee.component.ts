import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  suscription: Subscription;
  showAddItem:boolean;
  showEditItem: boolean;


  items = [];

  url:string;

  constructor(private router:Router ,private global : GlobalService) {

    this.url = router.url

   }

  ngOnInit(): void {

    this.suscription = this.global.onToggleEdit().subscribe((value)=>(this.showEditItem = value));
    this.suscription = this.global.onToggleAdd().subscribe((value)=>(this.showAddItem = value));
  }



  /**
   * accede al servicio de UI cuando un item se quiere agregar o editar
   * esto con el fin de mostar el componente de add-item
   */
  toggleAddItem(){
    this.global.toggleAddItem();
  }

  add_item(item:any){

      this.items.push(item);


    }

    

  edit_item(item:any){
    this.items = this.items.filter(i => i.username !== this.global.getCurrentItem().username)
    this.items.push(item);
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
    this.items = this.items.filter(i => i.username !== this.global.getCurrentItem().username)
  }






}
