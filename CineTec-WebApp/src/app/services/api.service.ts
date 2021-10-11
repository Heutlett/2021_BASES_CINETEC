import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projection } from 'interfaces/Projection';
import { Branch } from '../../interfaces/Branch';
import { GlobalService } from './global.service';
import { Seat } from 'interfaces/Seat';
import { Room } from 'interfaces/Room';
import { Dates } from 'interfaces/Dates';
import { Client } from 'interfaces/Client';
import { Router } from '@angular/router';
import { Employee } from 'interfaces/Employees';
import { Movie } from 'interfaces/Movies';
import { Projections } from '../../interfaces/Projections';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

    
  //private apiURL = '/api/'; 
  private apiURL = '/api/'; 
   
  constructor(private http:HttpClient, private globalService : GlobalService, private router : Router) { }


  //        ______________________
  //_______/ GET

  get_client(user):Observable<Client>{
    const url = `${this.apiURL + "Clients/LogIn?username="+user.username+"&password="+user.password}`;
    return this.http.get<Client>(url);
  }

  get_employee(user):Observable<Employee>{
    const url = `${this.apiURL + "Employees/LogIn?username="+user.username+"&password="+user.password}`;
    return this.http.get<Employee>(url);
  }

  get_dates():Observable<Dates>{
    const url = `${this.apiURL + "Branches/all_projections_dates?cinema_name="+this.globalService.current_branch}`;
    return this.http.get<Dates>(url);
    //return this.http.get<Dates>( this.apiURL + "Projection_branch");
  }

  /**
   * Funcion GET para todas las proyecciones de una sucursal y dia especificos
   * @returns JSON con todos las proyecciones de una sucursal y dia especificos
   */
   get_day_branch_projections():Observable<Projections[]>{
    //const url = `${this.apiURL + "Branches/all_projections_dates?cinema_name="+this.globalService.current_branch}`;
    return this.http.get<Projections[]>( this.apiURL + "Projections");
    //return this.http.get<Projections[]>( this.apiURL + "Projections");
  }

  get_projections():Observable<Projection[]>{
    return this.http.get<Projection[]>( this.apiURL + "Projections");
  }

  get_branches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiURL + "Branches");
  }


  get_seats(): Observable<Seat[]> {
    return this.http.get<Seat[]>(this.apiURL + "Seat");
  }
  

  get_room(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiURL + "Room/" + this.globalService.current_room);
  }


  get_clients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiURL + "Clients");
  }

  get_employees(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiURL + "Employees");
  }

  get_movies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiURL + "Movies");
  }

  get_rooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiURL + "Rooms");
  }


  //        ___________________
  //_______/ POST


  /**
   * Funcion POST general. Dependiendo del url hace el post especifico
   * @param item Un item de cualquier tipo que contine datos para enviar al API
   * @returns Un observable con la respuesta del API
   */
  post(item:any): Observable<any>{
    switch (this.router.url) {
      case "/branches":
        console.log(item);
        return this.post_branch(item);
      
      case "/clients":
        console.log(item);
        return this.post_client(item);

      case "/employees":
        return this.post_employees(item);

      case "/movies":
        console.log(item);
        return this.post_movie(item);

      case "/rooms":
        console.log(item);
        return this.post_room(item);
      
      case "/projections":
        return this.post_projections(item);
   
      default:
        return this.globalService.getCurrentItem();
    }

  }

  /**
   * Funcion POST para un branches 
   * @param branch sucursal a crear
   * @returns repuesta del API
   */
  post_branch(branch:Branch){
    return this.http.post<Branch>(this.apiURL + "Branches", branch, httpOptions)
  }

  /**
  * Funcion POST para un cliente
  * @param client cliente a crear
  * @returns repuesta del API
  */
  post_client(client:Client){
      return this.http.post<Branch>(this.apiURL + "Clients", client, httpOptions)
    }

  /**
  * Funcion POST para un empleado
  * @param employee empleado a crear
  * @returns repuesta del API
  */
   post_employees(employee:Employee){
    return this.http.post<Branch>(this.apiURL + "Employees", employee, httpOptions)
  }


    /**
  * Funcion POST para un pelicula
  * @param moovie pelicula a crear
  * @returns repuesta del API
  */
  post_movie(movie:Movie){
      return this.http.post<Movie>(this.apiURL + "Movies", movie, httpOptions)
    }
  
  /**
  * Funcion POST para un empleado
  * @param employee empleado a crear
  * @returns repuesta del API
  */
  post_room(room:Room){
    return this.http.post<Room>(this.apiURL + "Rooms", room, httpOptions);
  }

  /**
  * Funcion POST para un empleado
  * @param employee empleado a crear
  * @returns repuesta del API
  */
  post_projections(projection:Projection){
    return this.http.post<Projection>(this.apiURL + "Projections", projection, httpOptions);
  }
  
  //        ______________________
  //_______/ DELETE

  /**
   * Funcion DELETE general. Dependiendo del url hace el delete especifico
   * @returns respuesta del API
   */
   delete(): Observable<any>{
    switch (this.router.url) {
      case "/branches":
        return this.delete_branch(this.globalService.getCurrentItem());

      case "/clients":
        return this.delete_client(this.globalService.getCurrentItem());
  
      case "/employees":
        return this.delete_employee(this.globalService.getCurrentItem());

      case "/rooms":
        return this.delete_room(this.globalService.getCurrentItem());
      
      case "/projections":
        return this.delete_projections(this.globalService.getCurrentItem());  

      case "/movies":
        return this.delete_movies(this.globalService.getCurrentItem());  

      default:
        return this.globalService.getCurrentItem();
    }
  }

  /**
   * Funcion DELETE para una branch
   * @param branch sucursal a eliminar
   * @returns repuesta del API
   */
  delete_branch(branch:Branch): Observable<Branch> {
    const url = `${this.apiURL + "Branches" }/${branch.cinema_name}`;
    return this.http.delete<Branch>(url);
  }

  /**
  * Funcion DELETE para un cliente
  * @param branch sucursal a eliminar
  * @returns repuesta del API
  */
  delete_client(client:Client): Observable<Client> {
      const url = `${this.apiURL + "Clients" }/${client.cedula}`;
      return this.http.delete<Client>(url);
  }

  /**
  * Funcion DELETE para un empleado
  * @param branch sucursal a eliminar
  * @returns repuesta del API
  */
  delete_employee(employee:Employee): Observable<Employee> {
      const url = `${this.apiURL + "Employees" }/${employee.cedula}`;
      return this.http.delete<Employee>(url);
  }

  /**
  * Funcion DELETE para un empleado
  * @param room sala a eliminar
  * @returns repuesta del API
  */
  delete_room(room:Room): Observable<Room> {
    const url = `${this.apiURL + "Rooms" }/${room.id}`;
    return this.http.delete<Room>(url);
  }
  
  /**
  * Funcion DELETE para un proyecciones
  * @param projection projeccion a eliminar
  * @returns repuesta del API
  */
  delete_projections(projeccion:Projection): Observable<Projection> {
    const url = `${this.apiURL + "Projections" }/${projeccion.id}`;
    return this.http.delete<Projection>(url);      
  }

    /**
  * Funcion DELETE para un proyecciones
  * @param projection projeccion a eliminar
  * @returns repuesta del API
  */
  delete_movies(movie:Movie): Observable<Projection> {
      const url = `${this.apiURL + "Movies" }/${movie.id}`;
      return this.http.delete<Projection>(url);      
    }
        
      

   //        ______________________
  //_______/ PUT


  put_seat_bought(seat:Seat): Observable<Seat>{
    const url = `${this.apiURL + "byId?room_id=" + seat.room_id+"&number="+seat.number}`;
    const req = {
      status:"TAKEN"
    }
    return this.http.put<Seat>(url,req,httpOptions)
  }

  /**
   * Funcion general para PUT de un item. Dependiendo del URL hace un PUT especifico
   * @param item item con las modificaciones a hacer
   * @returns respueta del API
   */
  put(item:any): Observable<any>{
    switch (this.router.url) {
      case "/branches":
        return this.put_branch(item);
      
      case "/clients":
        return this.put_client(item);

      case "/employees":
        return this.put_employee(item);

      case "/rooms":
        return this.put_room(item);

      case "/projections":
        return this.put_projections(item);

      case "/movies":
        return this.put_movie(item);

    }

  }

  /**
   * Funcion PUT para un branch
   * @param branch los nuevos datos de la sucursal
   * @returns respuesta del API
   */
  put_branch(branch:Branch):Observable<Branch> {
    const url = `${this.apiURL + "Branches" }/${this.globalService.getCurrentItem().cinema_name}`;
    return this.http.put<Branch>(url, branch, httpOptions);
  }

  /**
   * Funcion PUT para un cliente
   * @param client los nuevos datos de la cliente
   * @returns respuesta del API
   */
  put_client(client:Client):Observable<Client> {
    const url = `${this.apiURL + "Clients" }/${this.globalService.getCurrentItem().cedula}`;
    return this.http.put<Client>(url, client, httpOptions);
    }

  /**
  * Funcion PUT para un empleado
  * @param empleado los nuevos datos del empleado
  * @returns respuesta del API
  */
  put_employee(employee:Employee):Observable<Employee> {
    const url = `${this.apiURL + "Employees" }/${this.globalService.getCurrentItem().cedula}`;
    return this.http.put<Employee>(url, employee, httpOptions);
  }

  /**
  * Funcion PUT para una sala
  * @param room los nuevos datos de la sala
  * @returns respuesta del API
  */
  put_room(room:Room):Observable<Room> {
    console.log(room);
    const url = `${this.apiURL + "Rooms" }/${this.globalService.getCurrentItem().id}`;
    return this.http.put<Room>(url, room, httpOptions);     
  }

  /**
  * Funcion PUT para una proyecion
  * @param projection los nuevos datos de la projeccion
  * @returns respuesta del API
  */
  put_projections(projection:Projection):Observable<Projection> {
    const url = `${this.apiURL + "Projections" }/${this.globalService.getCurrentItem().id}`;
    return this.http.put<Projection>(url, projection, httpOptions); 
  }


  
  /**
  * Funcion PUT para una pelicula
  * @param movie los nuevos datos de la pelicula
  * @returns respuesta del API
  */
   put_movie(movie:Movie):Observable<Movie> {
    const url = `${this.apiURL + "Projections" }/${this.globalService.getCurrentItem().id}`;
    return this.http.put<Movie>(url, movie, httpOptions); 
  }


}