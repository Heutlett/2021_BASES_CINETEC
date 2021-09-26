import { Component, OnInit, Input } from '@angular/core';
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

  constructor() {}

    

  ngOnInit(): void {

    console.log(this.projection);

    this.Id = this.projection.Id;
    this.Name = this.projection.Name;
    this.Time = this.projection.Time;
    this.Price = this.projection.Price;
    this.Img  = "assets/img/"  + this.Name + ".jpg";
   
  }

}
