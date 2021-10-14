import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
 * cuenta con las funciones necesarias para editar, agregar o eliminar segun los items emitan
 * o sus propios componentes registren la interaccion del usuario (boton)
 */
export class ProjectionHolderComponent implements OnInit {

  name: string;
  dates:Dates;
  date = "10/24/21";
  subscription_name: Subscription;
  trimmed_list: Projections[];
  projections: Projections[];
  ready = false;

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

  update():void{

    this.apiService.get_dates().subscribe((res)=>{
      this.dates = res
      this.update_proj();
    },(error)=> {
      alert(error.error);
    });

  }

  date_init() : void {

    this.date = this.dates[0];
    this.globalService.current_date = this.date;

    this.subscription_name = this.globalService.current_branch_check().subscribe((name)=>{
      this.name = name
      this.update()
    });
    this.update_proj();

  }

  dateSelected(date):void{

    this.ready = false;
    this.date = date;
    this.globalService.current_date = date;
    this.update();

  }

  update_proj(){

    this.apiService.get_day_branch_projections().subscribe((projections_raw)=>{
      this.projections = this.parse_raw_projections(projections_raw)
      this.ready = true;
    })

  }

  parse_raw_projections(projections){

    var added = false;
    this.trimmed_list = [];

    projections.forEach(projection => {
      projection.time = [projection.schedule];
      added = false;

      if(this.trimmed_list != []){


          this.trimmed_list.forEach(added_projection => {

            if(projection.name == added_projection.name){

              added = true;
              added_projection.time.push(projection.schedule)
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
