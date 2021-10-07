import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { GlobalService } from 'app/services/global.service';
import { Room } from 'interfaces/Room';
import { Seat } from 'interfaces/Seat';
import { Observable } from 'rxjs';
import { updateLanguageServiceSourceFile } from 'typescript';


@Component({
  selector: 'app-seat-holder',
  templateUrl: './seat-holder.component.html',
  styleUrls: ['./seat-holder.component.css']
})
export class SeatHolderComponent implements OnInit {

  seats : Seat[];
  selectable_amount : number;
  //room$ : Observable<Room[]>;
  @Input() room: Room;
  ready = false;
  rows: number;
  columns: number;
  width : number;
  width_str : string;
  


  constructor(private apiService : ApiService , private globalService : GlobalService) { }

  ngOnInit(): void {

    this.apiService.get_seats().subscribe((seats)=>{this.seats = seats
                                                    this.update()});

    this.selectable_amount = this.globalService.current_tickets;

    this.columns = this.room.column_quantity;
    this.rows = this.room.row_quantity;
    this.globalService.current_columns = this.columns;
    this.globalService.current_rows = this.rows;
    console.log(this.globalService.current_columns,this.globalService.current_rows,1)

    this.width = 70 * this.columns;  

    //console.log(this.room)
    }


    update(){

      this.ready = true;
      //console.log(this.globalService.current_columns,this.globalService.current_rows,0)


    }
}
