import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Projection } from 'interfaces/Projection'
import { GlobalService } from 'app/services/global.service';
import { Projection_branch } from 'interfaces/Projection_branch';

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
  show_dates = true;
  projections$: Observable<Projection[]>;
  subscription_name: Subscription;

  constructor(private apiService: ApiService, private globalService : GlobalService) { }

  ngOnInit(): void {

    //TODO susbscribe to API to get every projection in "projections". It must be according to the brach selected branch

    this.apiService.get_dates().subscribe((res)=>{this.dates = res[0].dates
                                                  this.date_init()});

    this.name = this.globalService.current_branch;

    this.subscription_name = this.globalService.current_branch_check().subscribe((name)=>{this.name = name
                                                                                          this.update()});

  }

  update():void{

    this.projections$ = this.apiService.get_projections();

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
