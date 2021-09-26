import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projection } from 'interfaces/Projection';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = 'http://localhost:5000/';   // Esta ruta corresponde al url del proxy http://localhost:5000

  constructor(private http:HttpClient) { }


  //        ______________________
  //_______/ GET

  /**
   * Funcion GET para todas las proyecciones de una sucursal y dia especificos
   * @returns JSON con todos las proyecciones de una sucursal y dia especificos
   */

  //!!!!  HAY QUE ADAPTARLO AL API !!!!
   get_projections():Observable<Projection[]>{

    return this.http.get<Projection[]>("http://localhost:5000/Projection");

  }
}
