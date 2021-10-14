import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-actors',
  templateUrl: './add-actors.component.html',
  styleUrls: ['./add-actors.component.css']
})

/**
 * Componente input para agregar actores
 */
export class AddActorsComponent implements OnInit {

  @Input() actor:string;

  constructor() { }

  ngOnInit(): void {
  }

}
