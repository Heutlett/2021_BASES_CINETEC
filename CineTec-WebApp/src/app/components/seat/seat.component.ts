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
  @Input() room_id: number;
  color: string;
  disabled: boolean;
  //@Output() btnClick = new EventEmitter();

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

  onClick(){
    
      this.color  = "#16D6DD"
      this.globalService.seatSelected(this);

  }

}
