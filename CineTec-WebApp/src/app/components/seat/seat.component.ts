import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  @Input() text: string;
  @Input() color: string;
  //@Output() btnClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  onClick(){
    //this.btnClick.emit();
  }

}
