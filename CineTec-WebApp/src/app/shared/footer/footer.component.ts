import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

/**
 * Componente footer estandar
 */
export class FooterComponent implements OnInit {
    test : Date = new Date();

    constructor(public location: Location) { }

    ngOnInit() {}

    isSignup() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 1 );
        }
          if( titlee === '/signup' ) {
              return true;
          }
          if( titlee === '/admin-login' ) {
            return true;
        }
          else {
              return false;
          }
      }
}
