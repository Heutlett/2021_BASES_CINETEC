import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  Img :string;

  constructor(private globalService : GlobalService) { }

  ngOnInit(): void {

    this.Img = "assets/img/"  + this.globalService.current_movie + ".jpg";
    console.log(this.Img);

  }

}
