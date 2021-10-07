import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { Room } from 'interfaces/Room';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  room$ : Observable <Room[]>

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {

    this.room$ = this.apiService.get_room_capacity();
    
  }

}
