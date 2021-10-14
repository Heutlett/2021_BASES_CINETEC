import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'app/services/global.service';
import { Seat } from 'interfaces/Seat';


@Component({
  selector: 'app-seat-row-holder',
  templateUrl: './seat-row-holder.component.html',
  styleUrls: ['./seat-row-holder.component.css']
})
export class SeatRowHolderComponent implements OnInit {

  @Input() row : number;
  @Input() all_seats : Seat[];
  seats : Seat[];
  ready = false;

  start :number;
  end : number;
  

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {

    this.start = this.row * this.globalService.current_columns;
    this.end = ((this.row + 1) * this.globalService.current_columns);
    this.seats = this.all_seats.slice(this.start,this.end);
    this.ready = true;
  }

}
