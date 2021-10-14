import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { GlobalService } from 'app/services/global.service';
import { Projections } from 'interfaces/Projections';
import { Dates } from 'interfaces/Dates';

@Component({
  selector: 'app-projection-holder',
  templateUrl: './projection-holder.component.html',
  styleUrls: ['./projection-holder.component.css']
})

/**
 * Este componente esta diseñado especificamente para mostrar una serie de pelicuas abstraidos
 */
export class ProjectionHolderComponent implements OnInit {

  name: string;
  dates:Dates;
  date = "10/24/21";
  subscription_name: Subscription;
  trimmed_list: Projections[];
  projections: Projections[];
  ready = false;
  projection_ids : number[];
  room_ids : number[];

  constructor(private apiService: ApiService, private globalService : GlobalService) { }

  ngOnInit(): void {

    this.globalService.current_date = this.date;
    this.apiService.get_dates().subscribe((res)=>{
      this.dates = res
      this.date_init()
    },(error)=> {
      alert(error.error);
    });

    this.name = this.globalService.current_branch;

  }

  /**
   * Actualiza la interfaz con las fechas adquiridas asincronicamente de la base
   */
  update():void{

    this.apiService.get_dates().subscribe((res)=>{
      this.dates = res
      this.update_proj();
    },(error)=> {
      alert(error.error);
    });

  }

  /**
   * Inicializacion de la fecha
   */
  date_init() : void {

    this.date = this.dates[0];
    this.globalService.current_date = this.date;
    this.subscription_name = this.globalService.current_branch_check().subscribe((name)=>{
      this.name = name
      this.update()
    });
    this.update_proj();

  }

  /**
   * Funcion que se ejecuta cuando una fecha es escogida
   * @param date fecha escogida
   */
  dateSelected(date):void{

    this.ready = false;
    this.date = date;
    this.globalService.current_date = date;
    this.update();

  }

  /**
   * Actualiza la interfaz con las proyecciones adquiridas asincronicamente de la base
   */
  update_proj(){

    this.apiService.get_day_branch_projections().subscribe((projections_raw)=>{
      this.projections = this.parse_raw_projections(projections_raw)
      this.ready = true;
    })

  }

  /**
   * Funcion que acomoda los datos de la base para poder ser desplegados en interfaz
   * @param projections projecciones directas de base
   * @returns projecciones con los datos necesarios para projeccion-component
   */
  parse_raw_projections(projections){

    var added = false;
    this.trimmed_list = [];
    
    projections.forEach(projection => {
      projection.time = [projection.schedule];
      projection.projection_ids = [projection.id]
      projection.room_ids = [projection.room]
      added = false;

      if(this.trimmed_list != []){

          this.trimmed_list.forEach(added_projection => {

            if(projection.name == added_projection.name){

              added = true;
              added_projection.time.push(projection.schedule)
              added_projection.projection_ids.push(projection.id)
              added_projection.room_ids.push(projection.room)
            }

          });

    }

     if (!added){
      this.trimmed_list.push(projection);

     }
      
    });

    return this.trimmed_list;

  }
  
}
