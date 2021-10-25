import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'app/services/global.service';
//import { saveAs } from 'file-saver/FileSaver';
import * as fileSaver from 'file-saver';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})

/**
 * Pagina que muestra la factura al usuario despues de comprados los asientos
 */
export class BillingComponent implements OnInit {

  location:string;
  movie:string;
  room:string;
  seats:string;
  subtotal:string;
  total:string;
  security_code:number;
  download:boolean = false;
  consecutive: number;
  id: number;
  now = new Date().toLocaleString();
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  client_name: string;
  client_id: string;
  unit: number;
  tickets_amount: number;
  tax: number;
  full_address: string;
  hora:string;
  dia:string;

  constructor(private globalService : GlobalService, private router : Router) { }

  ngOnInit(): void {

    this.location = this.globalService.current_bill.location;
    this.movie = this.globalService.current_bill.movie;
    this.room = this.globalService.current_bill.room;
    this.seats = this.globalService.current_bill.seats;
    this.subtotal = this.globalService.current_bill.subtotal;
    this.total = this.globalService.current_bill.total;
    this.client_name = this.globalService.client_name;
    this.client_id = this.globalService.client_id;
    this.unit = this.globalService.current_price;
    this.tickets_amount = this.globalService.current_tickets;
    this.hora = this.globalService.current_time;
    this.tax = this.globalService.current_subtotal*0.13;
    this.full_address = this.globalService.current_branch;
    this.security_code = Math.floor(Math.random() * 10000000000);
    this.consecutive = Math.floor(Math.random() * 10000000000);
    this.id = Math.floor(Math.random() * 1000000000);
    this.dia = this.globalService.current_date;

    /**
     * Funcion que crea un string aleatorio
     * @param length largo del string
     * @returns un string aleatorio
     */
    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
   charactersLength));
     }
     return result;
  }

  var signature  = makeid(500);
  var certificate  = makeid(1500);
  

  //       _______________________________________
  //______/Bloque de creacion del XML de hacienda

    var builder = require('xmlbuilder');
 
    var xml = builder.create('FacturaElectronica', {version: '1.0', encoding: 'UTF-8', standalone: false})
      .att('xmlns', 'https://tribunet.hacienda.go.cr/docs/esquemas/2016/v4.2/FacturaElectronica_V.4.2.xsd')
        .ele('Clave', '506'+ this.id + this.globalService.client_id+'0010000101' + this.consecutive.toString()+this.security_code.toString()).up()
        .ele('Consecutivo', this.consecutive.toString()).up()
        .ele( 'Fecha_emision', this.now).up()
        .ele('Emisor')
          .ele('Nombre','CineTEC CR, S.A.').up()
          .ele('Identificacion')
            .ele('Numero','110820011').up()
            .ele('Tipo','02').up()
          .up()
          .ele('Ubicacion')
            .ele('Provincia','1').up()
            .ele('Canton','02').up()
            .ele('Distrito','03').up()
            .ele('Barrio','01').up()
            .ele('Otro').up()
          .up()
          .ele('Telefono')
            .ele('Codigo_pais','506').up()
            .ele('Num_telefono','22723616').up()
            .ele('Codigo_pais_fax','506').up()
            .ele('Fax','00000000').up()
          .up()
          .ele('Email','cinetec.asistecia@cineTecSA.com').up()
        .up()
        .ele('Receptor')
        .ele('Nombre',this.globalService.client_name).up()
          .ele('Identificacion')
            .ele('Numero',this.globalService.client_id).up()
            .ele('Tipo','01').up()
          .up()
          .ele('Ubicacion')
            .ele('Provincia','3').up()
            .ele('Canton','01').up()
            .ele('Distrito','02').up()
            .ele('Barrio','06').up()
            .ele('Otro').up()
          .up()
          .ele('Telefono')
            .ele('Codigo_pais','506').up()
            .ele('Num_telefono',this.globalService.client_phone_number).up()
            .ele('Codigo_pais_fax','506').up()
            .ele('Fax').up()
          .up()
          .ele('Email').up()
        .up()
        .ele('Detalle_cobro')
          .ele('Condicion_venta','01').up()
          .ele('Plazo_credito','0').up()
          .ele('Medio_pago','02').up()
          .ele('Codigo_moneda','CRC').up()
          .ele('Tipo_de_Cambio','625.00').up()
        .up()
        .ele("Factura")
          .ele('Total_serv_gravados','0').up()
          .ele('Total_serv_exentos','0').up()
          .ele('Total_merc_gravada','0').up()
          .ele('Total_merc_exenta','0').up()
          .ele('Total_gravados',this.globalService.current_subtotal).up()
          .ele('Total_exentos','0').up()
          .ele('Total_ventas',(this.globalService.current_subtotal + this.globalService.current_subtotal*0.13 ).toString()).up()
          .ele('Total_descuentos','0').up()
          .ele('Total_venta_neta',this.globalService.current_subtotal.toString()).up()
          .ele('Total_impuestos',(this.globalService.current_subtotal*0.13).toString()).up()
          .ele('Total_comprobante',(this.globalService.current_subtotal + this.globalService.current_subtotal*0.13 ).toString()).up()
          .ele('Otros','Gracias por su compra!').up()
          .ele('Detalle')
            .ele('Pelicula',this.globalService.current_movie).up()
            .ele('Fecha',this.globalService.current_date).up()
            .ele('Sucursal',this.globalService.current_branch).up()
            .ele('Hora',this.globalService.current_time).up()
            .ele('Total_asientos',this.globalService.current_subtotal/this.globalService.current_price).up()
            .ele('Precio_entrada',this.globalService.current_price).up()
          .up()
        .up()
        .ele('Normativa')
          .ele('Numero_resolucion','DGT-R-48-2016').up()
          .ele('Fecha_resolucion','07-10-2016 12:00:00').up()
        .up()
        .ele('ds:Signature',{Id :"xmldsig-1e32901a-f5f9-42fa-ad56-086397205429" })
          .ele('ds:SignedInfo')
            .ele('ds:CanonicalizationMethod',{Algorithm :"http://www.w3.org/TR/2001/REC-xml-c14n-20010315" }).up()
            .ele('ds:SignatureMethod',{Algorithm :"http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"}).up()
            .ele('Reference',{Id :"xmldsig-1e32901a-f5f9-42fa-ad56-086397205429-ref0"}).up()
            .ele("Transforms")
              .ele('ds:Transform',{Algorithm :"http://www.w3.org/2000/09/xmldsig#enveloped-signature"}).up()
            .up()
            .ele('ds:DigestMethod',{Algorithm :"http://www.w3.org/2001/04/xmlenc#sha256"}).up()
            .ele('ds:DigestValue','kO0HeC2NrdB+40stEW2DWSvzADiduO4LjAFoZIPdsfM=').up()
            .ele('ds:Reference')
              .ele('ds:Reference',{Type :"http://uri.etsi.org/01903#SignedProperties" , URI : "#xmldsig-1e32901a-f5f9-42fa-ad56-086397205429-signedprops"}).up()
              .ele('ds:DigestMethod',{Algorithm :"http://www.w3.org/2001/04/xmlenc#sha256"}).up()
              .ele('ds:DigestValue','xQIhMdlEGB73B5IN09SVADmwh5cCx8ufSFSRYbc5ZUY=<').up()
            .up()
          .up()
          .ele('ds:SignatureValue',{Id :"xmldsig-1e32901a-f5f9-42fa-ad56-086397205429-sigvalue"},signature).up()
          .ele('ds:KeyInfo')
            .ele('ds:X509Data')
              .ele('ds:X509Certificate',certificate).up()
            .up()
          .up()
          .ele('ds:Object').up()
          .ele('xadas:Properties')
        .up()
      .end({ 
        pretty: true,
        indent: '  ',
        newline: '\n',
        width: 0,
        allowEmpty: false,
        spacebeforeslash: ''
      });
    
    console.log(xml);
    this.globalService.xml = xml;

  }

  /**
   * Funcion que se ejecuta para llevar a la pagina de visualizacion del XML
   */
  show_xml(){
    var blob = new Blob([this.globalService.xml], {type: "text/plain;charset=utf-8"});
    fileSaver.saveAs(blob, "factura_electronica.xml")
  }

  /**
   * Funcion que crea y descarga el PDF de la factura
   */
  public downloadAsPDF() {

    const doc = new jsPDF('p', 'pt', 'letter');

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 500,
      'elementHandlers': specialElementHandlers
    });

    doc.save('Factura_Electronica_CineTec_' + this.movie + '.pdf');

  }

}
