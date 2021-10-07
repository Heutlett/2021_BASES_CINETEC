import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'app/services/global.service';
import { Seat } from 'interfaces/Seat';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seat-row-holder',
  templateUrl: './seat-row-holder.component.html',
  styleUrls: ['./seat-row-holder.component.css']
})
export class SeatRowHolderComponent implements OnInit {

  @Input() row : number;
  @Input() all_seats : Seat[];
  seats : Seat[];

  start :number;
  end : number;
  

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {

    console.log(this.all_seats);
    this.start = this.row * this.globalService.current_columns;
    console.log(this.row,this.start);
    this.end = ((this.row + 1) * this.globalService.current_columns);
    console.log(this.row +1,this.end);
    this.seats = this.all_seats.slice(this.start,this.end);
    console.log(this.seats);
  }

}
