import { Component, OnInit, Output , EventEmitter,Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { StringLiteralLike } from 'typescript';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})


/**
 * Este componente se encarga de mostrar y recibir toda la informacion necesaria 
 * para agragar una nueva entrada o editar alguno de los objetos de la base de datos
 * muestra las barras para llenar la informacion y la emite al API para que sea manejada. 
 */
export class AddItemComponent implements OnInit {
  @Output() onAddItem: EventEmitter<any> = new EventEmitter();
  @Output() onEditItem: EventEmitter<any> = new EventEmitter();
  
  

  //Client and employeee

  first_name: string;
  middle_name : string;
  first_surname : string;
  second_surname: string;
  bith_date : string;
  phone_number : string;
  username : string;
  password : string;


  //Movies
  name:string;
  original_name:string;
  length:string;
  director:string;
  actors:string;


  //Branches
  branch_name:string;
  province:string;
  district:string;
  room_quantity:string;

  //Room
  row_quantity:number;
  column_quantity:number;
  capacity:number; 

  //Projection
  movie:string;
  date:string;
  time:string; 
  room:number;




  in_branches = false;
  in_clients = false;
  in_employees = false;
  in_movies = false;
  in_rooms = false;
  in_projections = false;


  showAddItem: boolean;
  showEditItem: boolean;
  subscrition: Subscription;
  subscrition2: Subscription;
  @Input() url: string;


  in_url:number;
  new_item:any;

  current_item:any; 

  constructor(private global: GlobalService) { }

  ngOnInit(): void {
    this.subscrition = this.global.onToggleAdd().subscribe((value)=>(this.showAddItem = value));
    this.subscrition2 = this.global.onToggleEdit().subscribe((value)=>(this.showEditItem = value));
    
  }


  /**
   * Esta funcion se ejecuta cuando el boton de enviar a base de datos es oprimido
   * envia la informacion que el usuario haya introducido, con el formato correcto dependiendo del
   * url donde se encuentre
   * 
   * @returns Void
   * 
   */
  onSubmit(){

    switch (this.url) {
      case "/branches":

      if(!this.branch_name){
        alert("Por favor indique un nombre");
        return;

      }

      if(!this.province){
        alert("Por favor indique una provincia");
        return;

      }

      if(!this.district){
        alert("Por favor indique un districto");
        return; 

      }

      if(!this.room_quantity){
        alert("Por favor indique una cantidad de salas")
        return;
      }


      this.new_item = { 
          "cinema_name":this.branch_name,
          "province":this.province,
          "district":this.district,
          "room_quantity":this.room_quantity
          }
    
        break;
      
      case "/clients-admin":
       
        this.new_item = {
  
        }
        break;


      case "/employees-admin":
       
          this.new_item = {
    
      }
        break;  


      case "/movies-admin":
    
        this.new_item = {

        }

        break;

      case "/rooms-admin":
        this.new_item = {

        }

        break;
      
      case "/projections-admin":
        this.new_item = {

        }

        break;

        


    

      default:
        break;


    }
    if (this.showEditItem) {
      this.onEditItem.emit(this.new_item);
      this.global.cancelEdit();
    }
    else{
      this.onAddItem.emit(this.new_item);
      this.global.toggleAddItem();
    }

  }



}