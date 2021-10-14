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
  Id:number;
  Name:string;
  Time:string[];
  Price:number;
  Room_id: number;
  Img:string;
  Actors: string;
  Director: string;
  Classification: string;

  constructor( private globalService: GlobalService) {}

  
  ngOnInit(): void {


    this.Id = this.projection.id;
    this.Name = this.projection.name;
    this.Time = this.projection.time;
    this.Director = this.projection.director;
    this.Classification = this.projection.classification;
    this.Price = this.projection.price;
    this.Room_id = this.projection.room;
    this.Img  = "assets/img/"  + this.Name + ".jpg";
    this.Actors = this.parse_actors();
   
  }

  timeSelected(time : string){

    this.globalService.current_movie = this.Name;
    this.globalService.current_time = time;
    this.globalService.current_projection = this.Id;
    console.log("Projeccion selecionada:",this.globalService.current_projection)
    this.globalService.current_price = this.Price;
    this.globalService.current_room = this.Room_id;
    console.log("Sala selecionada:",this.globalService.current_room)

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
