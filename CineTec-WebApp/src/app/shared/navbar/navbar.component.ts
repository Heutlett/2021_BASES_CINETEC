import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Branch } from 'interfaces/Branch';
import { Observable } from 'rxjs';
import { ApiService } from 'app/services/api.service';
import { GlobalService } from 'app/services/global.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

/**
 * Componente barra de navegacion boostrap
 */
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    branches$: Observable<Branch[]>;

    constructor(public location: Location, private element : ElementRef , private apiService : ApiService , private globalService : GlobalService , private router: Router) {
        this.sidebarVisible = false;

    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

        this.branches$ = this.apiService.get_branches();

    }


    branchSelected(branch:string){

        this.router.navigateByUrl('/listing');
        this.globalService.current_branch = branch;
        this.globalService.current_branch_check();
        console.log(branch);
        
    }


    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isSignup() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/signup' ) {
            return true;
        }
        if(!this.isClient()){
            return true;
        }
        else {
            return false;
        }
    }
    isClient() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/branches' ) {
            return false;
        }
        if( titlee === '/clients' ) {
            return false;
        }
        if( titlee === '/projections' ) {
            return false;
        }
        if( titlee === '/rooms' ) {
            return false;
        }
        if( titlee === '/employees' ) {
            return false;
        }
        if( titlee === '/movies' ) {
            return false;
        }

        else {
            return true;
        }
    }

    
    show_nav() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 1 );
        }
          if( titlee === '/xml' ) {
              return false;
          }
          if( titlee === '/signup' ) {
            return false;
          }
          if( titlee === '/admin-login' ) {
            return false;
          }
          else {
              return true;
          }

    }

    
}
