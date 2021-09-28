import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Projection } from 'interfaces/Projection'

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

  name:String;
  projections$: Observable<Projection[]>;
  suscription: Subscription;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    //TODO susbscribe to API to get every projection in "projections". It must be according to the brach selected branch

    this.projections$ = this.apiService.get_projections();

  }

}
