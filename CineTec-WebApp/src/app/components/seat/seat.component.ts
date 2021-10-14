import { Component, Input, OnInit} from '@angular/core';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})

/**
 * Componente que abstrae los asientos para su despligue en UI
 */
export class SeatComponent implements OnInit {

  @Input() text: number;
  @Input() status: string;
  @Input() projection_id: number;
  color: string;
  disabled: boolean;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {

    if (this.status == "COVID"){
      this.color = "grey";
      this.disabled = true;
    }

    if (this.status == "EMPTY"){
      this.color = "white"
    }

    if (this.status == "TAKEN"){
      this.color = "red"
      this.disabled = true;
    } 

  }

  /**
   * Funcion que se ejecuta cuando un asiento es seleccionado
   */
  onClick(){
      this.color  = "#16D6DD"
      this.globalService.seatSelected(this);
  }

}
