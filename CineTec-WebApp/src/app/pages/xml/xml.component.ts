import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.css']
})

/**
 * Pagina para la visualizacion de XML de hacienda
 */
export class XmlComponent implements OnInit {

  xml:string;

  constructor(private globalService:GlobalService) { }

  ngOnInit(): void {

    this.xml = this.globalService.xml;

    console.log(this.xml);
  }

}
