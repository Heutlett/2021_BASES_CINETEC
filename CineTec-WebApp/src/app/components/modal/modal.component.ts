import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'app/services/global.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'app-modal-content',
    templateUrl: './modal.data.html'
})
export class NgbdModalContent implements OnInit {
    @Input() name;

    location:string;
    movie:string;
    room:string;
    seats:string;
    subtotal:string;
    total:string;

    constructor(public activeModal: NgbActiveModal , private globalService : GlobalService, private router : Router, private apiService : ApiService) {}

    ngOnInit(){

      this.location = this.globalService.current_branch;
      this.movie = this.globalService.current_movie;
      this.room = this.globalService.current_room.toString();
      this.seats = this.globalService.seats_str();
      this.subtotal =this.globalService.current_subtotal.toString();
      this.total = (this.globalService.current_subtotal + (this.globalService.current_subtotal * 0.13)).toString();


    }

    confirmed(){

        this.router.navigateByUrl("/billing");

        this.apiService.seats_bought();

    }
}

@Component({
    selector: 'app-modal-component',
    templateUrl: './modal.component.html'
})
export class NgbdModalComponent {
    constructor(private modalService: NgbModal) {}
    open() {
        const modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.name = 'World';
    }
}

