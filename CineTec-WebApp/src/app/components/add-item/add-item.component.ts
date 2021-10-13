import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Output , EventEmitter,Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { ApiService } from '../../services/api.service';

import { HttpClient } from '@angular/common/http';



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
  branch_id:string;
  cedula:number;
  first_name: string;
  middle_name : string;
  first_surname : string;
  second_surname: string;
  birth_date : string;
  phone_number : number;
  username : string;
  password : string;


  //Movies
  name:string;
  original_name:string;
  length:string;
  classification_id:string;
  director:string;
  actorEntered:string;
  actorSelected:string;
  image:any;
  actors = [];
  actorsDB = [];



  //Branches
  cinema_name:string;
  province:string;
  district:string;
  rooms_quantity:string;

  //Room
  branch_name:string;
  row_quantity:number;
  column_quantity:number;
  capacity:number; 

  //Projection
  movie_name:string; 
  movie_id:number;
  date:string;
  schedule:string; 
  room_id:number;
  movies_list:any[];
  rooms_list:any[];
  branch_selected_projection:string;
  covid:number; 
  covidPorcentages = [0, 25 , 50 , 75, 100];




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


  branches:any[];
  classfications = [ 'G', 'PG', 'PG-13','R', 'NC-17','T'];


  constructor(private global: GlobalService, private apiService : ApiService) { 



    



  }

  ngOnInit(): void {
    this.subscrition = this.global.onToggleAdd().subscribe((value)=>(this.showAddItem = value));
    this.subscrition2 = this.global.onToggleEdit().subscribe((value)=>(this.showEditItem = value));


    if(this.url == "/movies"){

      this.apiService.get_actors().subscribe((actors) => this.actorsDB = actors);



    }


    if(this.url == "/projections"){

      this.apiService.get_movies().subscribe((movies) => this.movies_list = movies);

    }

    if(this.url === "/employees" || this.url === "/rooms" || this.url === "/projections"){

      this.apiService.get_branches().subscribe((branches) => this.branches = branches);

  


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

        if(!this.add_or_edit_branches()){
          console.log("No se puede realizar la acciones")
          return;
        };
        break;
      
      case "/clients" :

        if(!this.add_or_update_clients()){
          return;

        };
        break;

      case "/employees":

        if(!this.add_or_edit_employees()){
          return;
        };
        break;  

      case "/movies":

        if(!this.add_or_edit_movies()){
          return;
        };
        break;

      case "/rooms":

        if(!this.add_or_edit_rooms()){
          return;
        };
        break;
      
      case "/projections":
        
        if(!this.add_or_edit_projections()){
          return;
        };
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




  //         __________________________________
  //________/  BRANCHES


  add_or_edit_branches(){

    if(!this.cinema_name && !this.showEditItem){
      alert("Por favor indique un nombre");
      return false;

    }

    if(!this.province){
      alert("Por favor indique una provincia");
      return false;

    }

    if(!this.district){
      alert("Por favor indique un districto");
      return false; 

    }


    if(this.showEditItem){
      this.cinema_name = this.global.getCurrentItem().cinema_name;
    }


    this.new_item = { 
        "cinema_name":this.cinema_name,
        "province":this.province,
        "district":this.district
        }


        this.cinema_name = "";
        this.province = "";
        this.district = "";

    
    return true;
  }



  //         __________________________________
  //________/  CLIENTS


  add_or_update_clients(){

    
    if(!this.first_name){
      alert("Por favor indique un primer nombre");
      return false;

    }

    if(!this.first_surname){
      alert("Por favor indique un primer apellido");
      return false; 

    }

    if(!this.second_surname){
      alert("Por favor indique un segundo apellido")
      return false;
    }

    if(!this.birth_date){
      alert("Por favor indique una fecha de nacimiento");
      return false;

    }

    if(!this.phone_number){
      alert("Por favor indique un numero de telefono");
      return false;

    }

    if(!this.username){
      alert("Por favor indique un nombre de usuario");
      return false; 

    }

    if(!this.password){
      alert("Por favor indique una contraseña")
      return;
    }

    
    if(this.showEditItem){
      this.cedula = this.global.getCurrentItem().cedula;
    }

   
    this.new_item = {
      "cedula":this.cedula, 
      "first_name":this.first_name,
      "middle_name":this.middle_name,
      "first_surname":this.first_surname,
      "second_surname":this.second_surname,
      "birth_date":this.birth_date,
      "phone_number":this.phone_number,
      "username":this.username,
      "password":this.password,
      }


      this.cedula = 0;
      this.first_name = "";
      this.middle_name = "";
      this.first_surname = "";
      this.second_surname = "";
      this.birth_date = "";
      this.phone_number = 0;
      this.username = "";
      this.password = "";


      return true;


  }


    //         __________________________________
  //________/  EMPLOYEES



  add_or_edit_employees(){

       
    if(!this.first_name){
      alert("Por favor indique un primer nombre");
      return false;

    }

    if(!this.first_surname){
      alert("Por favor indique un primer apellido");
      return false; 

    }

    if(!this.second_surname){
      alert("Por favor indique un segundo apellido")
      return false;
    }

    if(!this.birth_date){
      alert("Por favor indique una fecha de nacimiento");
      return false;

    }

    if(!this.phone_number){
      alert("Por favor indique un numero de telefono");
      return false;

    }

    if(!this.username){
      alert("Por favor indique un nombre de usuario");
      return false; 

    }

    if(!this.password){
      alert("Por favor indique una contraseña");
      return false;
    }

    if(!this.branch_id){
      alert("Por favor seleccione una sucursal");
      return false;
    }




    if(this.showEditItem){
      this.cedula = this.global.getCurrentItem().cedula;
    }


    this.new_item = { 
      "branch_id":this.branch_id,
      "cedula":this.cedula,
      "first_name":this.first_name,
      "middle_name":this.middle_name,
      "first_surname":this.first_surname,
      "second_surname":this.second_surname,
      "birth_date":this.birth_date,
      "phone_number":this.phone_number,
      "username":this.username,
      "password":this.password,
      }


      this.branch_id = "";
      this.first_name = "";
      this.middle_name = "";
      this.first_surname = "";
      this.second_surname = "";
      this.birth_date = "";
      this.phone_number = 0;
      this.username = "";
      this.password = "";


      return true;
  }




  //         __________________________________
  //________/  MOVIES


    add_or_edit_movies(){

      if(!this.name){
        alert("Por favor indique  el nombre de la pelicula");
        return false; 

      }

      if(!this.original_name){
        alert("Por favor indique el nombre original de la pelicula")
        return false;
      }

      if(!this.length){
        alert("Por favor indique la duracion de la pelicula");
        return false;

      }

      if(!this.director){
        alert("Por favor indique el director de la pelicula");
        return false;

      }

      if(!this.actors){
        alert("Por favor indique los actores de la pelicula");
        return false; 

      }

  
      this.new_item = {
        "name":this.name,
        "original_name":this.original_name,
        "classification_id":this.classification_id,
        "length":this.length,
        "image":"",
        "director":this.director,
        "actors":this.actors
      }

      this.name = "";
      this.original_name = "";
      this.length = "";
      this.classification_id="";
      this.director = "";
      this.actors = [];
    
    
      return true;
    }
  


    addActor(){

      console.log(this.actorEntered);
      this.actors.push(this.actorEntered);
      console.log(this.actors);
      this.actorEntered = "";

    }

    deleteActor(){

      this.actors = this.actors.filter((i) => i !== this.actorSelected )
      this.actorSelected = "";
    }




  //         __________________________________
  //________/  ROOMS

  add_or_edit_rooms(){

    if(!this.branch_name && !this.showEditItem){
      alert("Seleccione una sucursal");
      return false;
    }

    if(!this.row_quantity){
      alert("Ingrese una cantidad de filas");
      return false;
    }

    if(!this.column_quantity){
      alert("Ingrese una cantidad de columnas");
      return false;
    }


    if(this.showEditItem){
      this.new_item = {
        "branch_name":this.global.getCurrentItem().branch_name,
        "row_quantity": this.row_quantity,
        "column_quantity":this.column_quantity,


      }
    } else {

      this.new_item = {
        "branch_name":this.branch_name,
        "row_quantity": this.row_quantity,
        "column_quantity":this.column_quantity,

      }
    }


   

    this.row_quantity = 0;
    this.column_quantity = 0;
    this.capacity = 0

    return true;

  }


  //         __________________________________
  //________/  PROJECTIONS

  add_or_edit_projections(){



    if (!this.movie_name){
      alert("Selecciones una pelicula");
      return false;
    
    }

    if(!this.date){
      alert("Selecciones una fecha");
      return false;
    }
    
    if(!this.schedule){
      alert("Seleccione una hora");
      return false;
    }

    if(!this.room_id){
      alert("Seleccione una sala");
      return false;
    }

    console.log(this.movies_list.filter((i) => i.name == this.movie_name))
    this.movie_id = (this.movies_list.filter((i) => i.name == this.movie_name))[0].id;




    if(this.showEditItem){
      this.new_item = {
        "id":this.global.getCurrentItem().id,
        "movie_id": this.movie_id,
        "date":this.date,
        "schedule":this.schedule,
        "room_id":this.room_id
  
      }
    }else {

      this.new_item = {
        "movie_id": this.movie_id,
        "date":this.date,
        "schedule":this.schedule,
        "room_id":this.room_id
  
      }

      this.global.covid = this.covid;


    }

    return true;

  }

  update_rooms(){

    this.apiService.get_rooms_by_Id(this.branch_selected_projection).subscribe((rooms) => {this.rooms_list = rooms; console.log(rooms)});

  }


  



}