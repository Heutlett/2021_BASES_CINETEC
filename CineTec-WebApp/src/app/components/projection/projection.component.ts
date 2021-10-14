import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from 'app/services/global.service';
import { Projections } from 'interfaces/Projections';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.css']
})
export class ProjectionComponent implements OnInit {

  @Input() projection: Projections;
  projection_ids:number[];
  room_ids:number[];
  Id:number;
  Name:string;
  Time:string[];
  Price:number;
  Room_id: number;
  Img:string;
  Actors: string;
  Director: string;
  Classification: string;

  constructor() {}

  
  ngOnInit(): void {


    //this.Id = this.projection.id;
    this.projection_ids = this.projection.projection_ids;
    this.room_ids = this.projection.room_ids;
    this.Name = this.projection.name;
    this.Time = this.projection.time;
    this.Director = this.projection.director;
    this.Classification = this.projection.classification;
    this.Price = this.projection.price;
    //this.Room_id = this.projection.room;
    this.Img  = "assets/img/"  + this.Name + ".jpg";
    this.Actors = this.parse_actors();
   
  }

  parse_actors(){

    var str = "";
    this.projection.actors.forEach(actor => {
      str = str+ ", " + actor
    });
    str = str.substring(1);
    return str;

  }

}
