import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

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

  constructor(private apiService : ApiService, private router:Router ,private global : GlobalService) {

    this.url = router.url

   }

  ngOnInit(): void {

    this.suscription = this.global.onToggleEdit().subscribe((value)=>(this.showEditItem = value));
    this.suscription = this.global.onToggleAdd().subscribe((value)=>(this.showAddItem = value));

    this.apiService.get_employees().subscribe((employees) => this.items = employees);




  }



  /**
   * accede al servicio de UI cuando un item se quiere agregar o editar
   * esto con el fin de mostar el componente de add-item
   */
  toggleAddItem(){
    this.global.toggleAddItem();
  }

  add_item(item:any){

      this.apiService.post_employees(item).subscribe(()=> this.items.push(item));


    }

    

  edit_item(item:any){
    this.apiService.put(item).subscribe(() => {

      this.items = this.items.filter(i => i.cedula !== this.global.getCurrentItem().cedula)
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
    this.apiService.delete().subscribe(() => this.items = this.items.filter(i => i.cedula !== this.global.getCurrentItem().cedula));
  }






}
