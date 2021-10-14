import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { GlobalService } from 'app/services/global.service';
import { Room } from 'interfaces/Room';
import { Seat } from 'interfaces/Seat';


@Component({
  selector: 'app-seat-holder',
  templateUrl: './seat-holder.component.html',
  styleUrls: ['./seat-holder.component.css']
})

/**
 * Componente especializado para la creacion y mantenimiento de asientos 
 */
export class SeatHolderComponent implements OnInit {

  seats : Seat[];
  selectable_amount : number;
  @Input() room: Room;
  rows: number;
  columns: number;
  width : number;
  width_str : string;
  ready = false;
  
  constructor(private apiService : ApiService , private globalService : GlobalService, private router : Router) { }

  ngOnInit(): void {

    this.apiService.get_projection_seats().subscribe((seats)=>{
      this.seats = seats;
      this.ready = true;
    });

    this.selectable_amount = this.globalService.current_tickets;
    this.columns = this.room.column_quantity;
    this.rows = this.room.row_quantity;
    this.globalService.current_columns = this.columns;
    this.globalService.current_rows = this.rows;
    this.width = 70 * this.columns;  

    }

    /**
     * Funcion que se ejecuta al presionar atras en la pagina de asientos
     */
    back(){
      this.globalService.clear_seats();
      this.router.navigateByUrl('/tickets');
    }

}
