import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }


}
