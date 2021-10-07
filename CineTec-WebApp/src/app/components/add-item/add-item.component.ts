import { ThrowStmt } from '@angular/compiler';
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
  birth_date : string;
  phone_number : string;
  username : string;
  password : string;


  //Movies
  name:string;
  original_name:string;
  length:string;
  director:string;
  actors:string;
  image:any;



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
  movie_name:string;
  date:string;
  time:string; 
  room:number;
  movies_list:any[];




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
  @Input() items:any;


  in_url:number;
  new_item:any;


  constructor(private global: GlobalService) { 



    



  }

  ngOnInit(): void {
    this.subscrition = this.global.onToggleAdd().subscribe((value)=>(this.showAddItem = value));
    this.subscrition2 = this.global.onToggleEdit().subscribe((value)=>(this.showEditItem = value));


    console.log(this.url)
    if (this.url === "/projections"){


      console.log("ENTRAAA")
      this.movies_list = [

        {id:'1', name:"avengers"},
         {id:'2', name:"batman"}

      ]

      //Se obtienen las peliculas


    }

    
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


          this.branch_name = "";
          this.province = "";
          this.district = "";
          this.room_quantity = "";
    
        break;
      
      case "/clients" :


        if(!this.first_name){
          alert("Por favor indique un primer nombre");
          return;
  
        }
  
        if(!this.first_surname){
          alert("Por favor indique un primer apellido");
          return; 
  
        }
  
        if(!this.second_surname){
          alert("Por favor indique un segundo apellido")
          return;
        }

        if(!this.birth_date){
          alert("Por favor indique una fecha de nacimiento");
          return;
  
        }
  
        if(!this.phone_number){
          alert("Por favor indique un numero de telefono");
          return;
  
        }
  
        if(!this.username){
          alert("Por favor indique un nombre de usuario");
          return; 
  
        }
  
        if(!this.password){
          alert("Por favor indique una contraseña")
          return;
        }
  
       
        this.new_item = { 
          "first_name":this.first_name,
          "middle_name":this.middle_name,
          "first_surname":this.first_surname,
          "second_surname":this.second_surname,
          "birth_date":this.birth_date,
          "phone_number":this.phone_number,
          "username":this.username,
          "password":this.password,
          }


          this.first_name = "";
          this.middle_name = "";
          this.first_surname = "";
          this.second_surname = "";
          this.birth_date = "";
          this.phone_number = "";
          this.username = "";
          this.password = "";
    
        break;


      case "/employees":
       
        if(!this.first_name){
          alert("Por favor indique un primer nombre");
          return;
  
        }
  
        if(!this.first_surname){
          alert("Por favor indique un primer apellido");
          return; 
  
        }
  
        if(!this.second_surname){
          alert("Por favor indique un segundo apellido")
          return;
        }

        if(!this.birth_date){
          alert("Por favor indique una fecha de nacimiento");
          return;
  
        }
  
        if(!this.phone_number){
          alert("Por favor indique un numero de telefono");
          return;
  
        }
  
        if(!this.username){
          alert("Por favor indique un nombre de usuario");
          return; 
  
        }
  
        if(!this.password){
          alert("Por favor indique una contraseña")
          return;
        }
  
       
        this.new_item = { 
          "first_name":this.first_name,
          "middle_name":this.middle_name,
          "first_surname":this.first_surname,
          "second_surname":this.second_surname,
          "birth_date":this.birth_date,
          "phone_number":this.phone_number,
          "username":this.username,
          "password":this.password,
          }


          this.first_name = "";
          this.middle_name = "";
          this.first_surname = "";
          this.second_surname = "";
          this.birth_date = "";
          this.phone_number = "";
          this.username = "";
          this.password = "";
        break;  


      case "/movies":

        if(!this.name){
          alert("Por favor indique un primer apellido");
          return; 
  
        }
  
        if(!this.original_name){
          alert("Por favor indique un segundo apellido")
          return;
        }

        if(!this.length){
          alert("Por favor indique una fecha de nacimiento");
          return;
  
        }
  
        if(!this.director){
          alert("Por favor indique un numero de telefono");
          return;
  
        }
  
        if(!this.actors){
          alert("Por favor indique un nombre de usuario");
          return; 
  
        }
  
        this.new_item = {
          "name":this.name,
          "original_name":this.original_name,
          "length":this.length,
          "director":this.director,
          "actors":this.actors

        }

        this.name = "";
        this.original_name = "";
        this.length = "";
        this.director = "";
        this.actors = "";

        break;

      case "/rooms":
        this.new_item = {

          "row_quantity": this.row_quantity,
          "column_quantity":this.column_quantity,
          "capacity":this.capacity

        }

        this.row_quantity = 0;
        this.column_quantity = 0;
        this.capacity = 0

        break;
      
      case "/projections":




        this.new_item = {

          "movie": this.movie_name,
          "date":this.date,
          "time":this.time,
          "room":this.room
  
        

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