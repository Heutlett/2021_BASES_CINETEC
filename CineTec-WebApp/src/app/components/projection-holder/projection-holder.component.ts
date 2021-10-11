import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { GlobalService } from 'app/services/global.service';
import { Projections } from 'interfaces/Projections';

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
  dates:string[];
  date:string;
  projections$: Observable<Projections[]>;
  subscription_name: Subscription;

  constructor(private apiService: ApiService, private globalService : GlobalService) { }

  ngOnInit(): void {

    this.apiService.get_dates().subscribe((res)=>{
      this.dates = res[0].dates
      this.date_init()
    },(error)=> {
      alert(error.error);
    });

    this.name = this.globalService.current_branch;

    this.subscription_name = this.globalService.current_branch_check().subscribe((name)=>{
      this.name = name
      this.update()
    });

  }

  update():void{

    this.projections$ = this.apiService.get_day_branch_projections();

  }

  date_init() : void {

    this.date = this.dates[0];
    this.globalService.current_date = this.date;
    this.update();

  }

  dateSelected(date):void{

    this.date = date;
    this.globalService.current_date = date;
    this.update();

  }
  
}
