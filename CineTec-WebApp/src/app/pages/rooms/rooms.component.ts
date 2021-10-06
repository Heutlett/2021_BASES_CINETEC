import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  url:string;
  suscription: Subscription;
  showAddItem:boolean;
  showEditItem: boolean;

  items = [
    {
      "column_quantity":"2",
      "row_quantity":"3",
      "capacity":"3"

    },

  ];


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

  }


  deleteItem(){}



}
