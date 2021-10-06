import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { GlobalService } from 'app/services/global.service';
import { Seat } from 'interfaces/Seat';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-seat-holder',
  templateUrl: './seat-holder.component.html',
  styleUrls: ['./seat-holder.component.css']
})
export class SeatHolderComponent implements OnInit {

  seats$ : Observable<Seat[]>;

  constructor(private apiService : ApiService , private globalService : GlobalService) { }

  ngOnInit(): void {

    this.seats$ = this.apiService.get_seats();

  }

}
