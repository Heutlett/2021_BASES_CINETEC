import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { Room } from 'interfaces/Room';
import { Seat } from 'interfaces/Seat';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  room : Room;
  ready = false;

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {

    this.apiService.get_room().subscribe((room) => {
      this.room = room;
      this.ready = true;
    })
    
  }

}
