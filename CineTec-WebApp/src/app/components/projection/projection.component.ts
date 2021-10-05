import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from 'app/services/global.service';
import { Projection } from 'interfaces/Projection';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.css']
})
export class ProjectionComponent implements OnInit {

  @Input() projection: Projection;
  Id:number;
  Name:string;
  Time:string[];
  Price:number;
  Img:string;

  constructor( private globalService: GlobalService) {}

    

  ngOnInit(): void {

    console.log(this.projection);

    this.Id = this.projection.id;
    this.Name = this.projection.name;
    this.Time = this.projection.time;
    this.Price = this.projection.price;
    this.Img  = "assets/img/"  + this.Name + ".jpg";
   
  }

  timeSelected(time : string){

    this.globalService.current_movie = this.Name;
    this.globalService.current_time = time;
    this.globalService.current_projection = this.Id;
    console.log(time);

  }

}
