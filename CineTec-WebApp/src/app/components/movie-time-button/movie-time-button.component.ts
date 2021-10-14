import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'app-movie-time-button',
  templateUrl: './movie-time-button.component.html',
  styleUrls: ['./movie-time-button.component.css']
})
export class MovieTimeButtonComponent implements OnInit {

  @Input() Time: string;
  @Input() projection_id: number;
  @Input() Room_id: number;
  @Input() Name: string;
  @Input() Price: number;

  constructor(private globalService:GlobalService, private router : Router) { }

  ngOnInit(): void {
  }


  onClick(){

    this.globalService.current_movie = this.Name;
    this.globalService.current_time = this.Time;
    this.globalService.current_projection = this.projection_id;
    console.log("Projeccion selecionada:",this.globalService.current_projection)
    this.globalService.current_price = this.Price;
    this.globalService.current_room = this.Room_id;
    console.log("Sala selecionada:",this.globalService.current_room)
    this.router.navigateByUrl("/tickets")


  }

}
