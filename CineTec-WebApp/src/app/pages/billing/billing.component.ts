import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'app/services/global.service';
import { DateTime } from 'luxon';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  location:string;
  movie:string;
  room:string;
  seats:string;
  subtotal:string;
  total:string;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  constructor(private globalService : GlobalService, private router : Router) { }

  ngOnInit(): void {

    this.location = this.globalService.current_bill.location;
    this.movie = this.globalService.current_bill.movie;
    this.room = this.globalService.current_bill.room;
    this.seats = this.globalService.current_bill.seats;
    this.subtotal = this.globalService.current_bill.subtotal;
    this.total = this.globalService.current_bill.total;

    var security_code = Math.floor(Math.random() * 10000000000);
    var consecutive = Math.floor(Math.random() * 10000000000);
    var id = Math.floor(Math.random() * 1000000000);

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
  
  console.log(makeid(5));


    var builder = require('xmlbuilder');
 
    var xml = builder.create('FacturaElectronica', {version: '1.0', encoding: 'UTF-8', standalone: false})
      .att('xmlns', 'https://tribunet.hacienda.go.cr/docs/esquemas/2016/v4.2/FacturaElectronica_V.4.2.xsd')
        .ele('Clave', '506'+ id + this.globalService.client_id+'0010000101' + consecutive.toString()+security_code.toString()).up()
        .ele('Consecutivo', consecutive.toString()).up()
        .ele( 'Fecha_emision', DateTime.now().toString()).up()
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
            .ele('Num_telefono').up()
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
          .ele('Total_gravados','0').up()
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



  show_xml(){

    this.router.navigateByUrl("/xml")

  }



  view_pdf(){


    this.router.navigateByUrl("/pdf")

  }



  public downloadAsPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf');
  }


}
