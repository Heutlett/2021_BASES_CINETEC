import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projection } from 'interfaces/Projection';
import { Branch } from '../../interfaces/Branch';
import { GlobalService } from './global.service';
import { Seat } from 'interfaces/Seat';
import { Room } from 'interfaces/Room';
import { Projection_branch } from 'interfaces/Projection_branch';
import { Client } from 'interfaces/Client';
import { Router } from '@angular/router';
import { Employee } from 'interfaces/Employees';

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
  private apiURL = 'http://localhost:5000/';

  constructor(private http:HttpClient, private globalService : GlobalService, private router : Router) { }


  //        ______________________
  //_______/ GET


  get_dates():Observable<Projection_branch>{

    //return this.http.get<Projection[]>( this.apiURL + "Projection" + this.globalService.current_branch);
    return this.http.get<Projection_branch>( this.apiURL + "Projection_branch");

  }

  /**
   * Funcion GET para todas las proyecciones de una sucursal y dia especificos
   * @returns JSON con todos las proyecciones de una sucursal y dia especificos
   */

  //!!!!  HAY QUE ADAPTARLO AL API !!!!
   get_projections():Observable<Projection[]>{

    //return this.http.get<Projection[]>( this.apiURL + "Projection" + this.globalService.current_branch);
    return this.http.get<Projection[]>( this.apiURL + "Projection");

  }

  get_branches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiURL + "Branches");

  }

  get_seats(): Observable<Seat[]> {

    return this.http.get<Seat[]>(this.apiURL + "Seat");

  }
  

  get_room_capacity(): Observable<Room[]> {

    return this.http.get<Room[]>(this.apiURL + "Room");

  }


  get_clients(): Observable<Client[]> {

    return this.http.get<Client[]>(this.apiURL + "Clients");

  }

  get_employees(): Observable<Client[]> {

    return this.http.get<Client[]>(this.apiURL + "Employees");

  }





     //        ______________________
  //_______/ POST

  /**
   * Funcion POST general. Dependiendo del url hace el post especifico
   * @param item Un item de cualquier tipo que contine datos para enviar al API
   * @returns Un observe con la respuesta del API
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

  

  
   //        ______________________
  //_______/ DELETE


  /**
   * Funcion DELETE general. Dependiendo del url hace el delete especifico
   * @returns respuesta del API
   */
   delete(): Observable<any>{
    switch (this.router.url) {
      case "/branches":
        return this.delete_branch(this.globalService.getCurrentItem())

      case "/clients":
        return this.delete_client(this.globalService.getCurrentItem())
  
      case "/employees":
        return this.delete_employee(this.globalService.getCurrentItem())


      default:
        return this.globalService.getCurrentItem();
        break;
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



   //        ______________________
  //_______/ PUT

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
  * Funcion PUT para un branch
  * @param branch los nuevos datos de la sucursal
  * @returns respuesta del API
  */

  put_employee(employee:Employee):Observable<Employee> {
        const url = `${this.apiURL + "Employees" }/${this.globalService.getCurrentItem().cedula}`;
        return this.http.put<Employee>(url, employee, httpOptions);
      
      
  }
    
    







}
