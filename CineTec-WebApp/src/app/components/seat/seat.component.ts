import { Component, Input, OnInit, Output } from '@angular/core';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  @Input() text: string;
  @Input() status: string;
  color: string;
  disabled: boolean;
  //@Output() btnClick = new EventEmitter();

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {

    if (this.status == "c"){

      this.color = "grey";
      this.disabled = true;

    }
    if (this.status == "a"){

      this.color = "white"
      
    }
    if (this.status == "o"){

      this.color = "red"
      this.disabled = true;
      
    } 
  }

  onClick(){
    
      this.color  = "#16D6DD"


      //TODO llamar al global para que meta este seat en una lista.
      //Si la lista es mas grande q las entradas compradas saca el
      // ultimo y le pone color blanco

      this.globalService.seatSelected(this);

  }

}
