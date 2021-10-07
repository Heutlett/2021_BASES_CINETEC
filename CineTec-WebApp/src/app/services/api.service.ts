import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projection } from 'interfaces/Projection';
import { Branch } from '../../interfaces/Branch';
import { GlobalService } from './global.service';
import { Seat } from 'interfaces/Seat';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    
  private apiURL = '/api/';   // Esta ruta corresponde al url del proxy http://localhost:5000

  constructor(private http:HttpClient, private globalService : GlobalService) { }


  //        ______________________
  //_______/ GET

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
  

}
