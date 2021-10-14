import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
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
import { Actor } from 'interfaces/Actor';
import { Projections } from '../../interfaces/Projections';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})

/**
 * Este servicio es el encargado de manejar todos las interacciones con el API. De aqui se emiten los
 * querys HTTP hacia las url indicadas
 */
export class ApiService {

  private apiURL = '/api/'; 
   
  constructor(private http:HttpClient, private globalService : GlobalService, private router : Router) { }


  //        ______________________
  //_______/ GET

  /**
   * Funcion GET para un solo cliente
   * @returns JSON con todos los clientes del empleado
   */
  get_client(user):Observable<Client>{
    const url = `${this.apiURL + "Clients/LogIn?username="+user.username+"&password="+user.password}`;
    return this.http.get<Client>(url);
  }

  /**
   * Funcion GET para un solo empleado
   * @returns JSON con todos los datos del empleado
   */
  get_employee(user):Observable<Employee>{
    const url = `${this.apiURL + "Employees/LogIn?username="+user.username+"&password="+user.password}`;
    return this.http.get<Employee>(url);
  }

  /**
   * Funcion GET para todas las fechas donde hay una proyeccion para una sucursal en especifo
   * @returns JSON con todas las fechas
   */
  get_dates():Observable<Dates>{
    const url = `${this.apiURL + "Branches/all_projections_dates?cinema_name="+this.globalService.current_branch}`;
    return this.http.get<Dates>(url);
  }

  /**
   * Funcion GET para todas la informacion de proyecciones y su peliculas para una sucursal y dia especificos
   * @returns JSON en formato de Projections[]
   */
   get_day_branch_projections():Observable<Projections[]>{
    const url = `${this.apiURL + "Branches/projections_by_date?cinema_name="+ this.globalService.current_branch + "&date="+this.globalService.current_date}`;
    return this.http.get<Projections[]>(url);
  }

  /**
   * Funcion GET para todas las proyecciones
   * @returns JSON con todas las proyecciones
   */
  get_projections():Observable<Projection[]>{
    return this.http.get<Projection[]>( this.apiURL + "Projections");
  }

  /**
   * Funcion GET para todas las sucursales
   * @returns JSON con todas las sucursales
   */
  get_branches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiURL + "Branches");
  }

 /**
   * Funcion GET para todas las sucursales
   * @returns JSON con todas las sucursales
   */
  get_seats(): Observable<Seat[]> {
    return this.http.get<Seat[]>(this.apiURL + "Seat");
  }
  
   /**
   * Funcion GET para una sola sala
   * @returns JSON con toda la infomacion de la sala
   */
  get_room(): Observable<Room> {
    return this.http.get<Room>(this.apiURL + "Rooms/" + this.globalService.current_room);
  }

  get_projection_seats(): Observable<Seat[]>{
    return this.http.get<Seat[]>(this.apiURL + "Projections/seats/" + this.globalService.current_projection);
  }

  /**
   * Funcion GET para todos los clientes
   * @returns JSON con todos los clientes
   */
  get_clients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiURL + "Clients");
  }

  /**
   * Funcion GET para todos los empleados
   * @returns JSON con todos los empleados
   */
  get_employees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiURL + "Employees");
  }

  /**
   * Funcion GET para todas las peliculas
   * @returns JSON con todas las peliculas
   */
  get_movies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiURL + "Movies/special_all");
  }

  /**
   * Funcion GET para todas las salas
   * @returns JSON con todas las salas
   */
  get_rooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiURL + "Rooms");
  }

  /**
   * Funcion GET para todas las salas en una sucursal
   * @returns JSON con todas las salas de una sucursal
   */
  get_rooms_by_Id(cinema_name:string): Observable<Room[]>{
    return this.http.get<Room[]>(this.apiURL + "Branches/all_rooms?cinema_name=" + cinema_name);
  }

  /**
   * Funcion GET para todos los actores
   * @returns JSON con todos los actores
   */
  get_actors(): Observable<Actor[]>{
    return this.http.get<Actor[]>(this.apiURL + "Actors");
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
    console.log("Posting",employee);
    return this.http.post<Branch>(this.apiURL + "Employees", employee, httpOptions)
  }


    /**
  * Funcion POST para un pelicula
  * @param movie pelicula a crear
  * @returns repuesta del API
  */
  post_movie(movie:Movie){
      console.log("Posting",movie);
      return this.http.post<Movie>(this.apiURL + "Movies", movie, httpOptions)
    }
  
  /**
  * Funcion POST para un empleado
  * @param employee empleado a crear
  * @returns repuesta del API
  */
  post_room(room:Room){
    console.log("Posting",room);
    return this.http.post<Room>(this.apiURL + "Rooms", room, httpOptions);
  }

  /**
  * Funcion POST para un empleado
  * @param employee empleado a crear
  * @returns repuesta del API
  */
  post_projections(projection:Projection){
    console.log("Posting",projection);
    return this.http.post<Projection>(this.apiURL + "Projections/" + this.globalService.covid, projection, httpOptions);
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
  * Funcion DELETE para una sala
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
      console.log(movie);
      const url = `${this.apiURL + "Movies/byId" }/${movie.id}`;
      return this.http.delete<Projection>(url);      
    }
        
      

   //        ______________________
  //_______/ PUT


  put_seat_bought(seat:Seat): Observable<any>{

    const url = `${this.apiURL +"/Seats/" + "byId?projection_id="}${seat.projection_id.toString()}&number=${seat.number.toString()}`;
    console.log(url);
    const body = {

      status : "TAKEN"

    }
    return this.http.put<any>(url,body,httpOptions)
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
    const url = `${this.apiURL + "Movies/byId" }/${this.globalService.getCurrentItem().id}`;
    return this.http.put<Movie>(url, movie, httpOptions); 
  }


}