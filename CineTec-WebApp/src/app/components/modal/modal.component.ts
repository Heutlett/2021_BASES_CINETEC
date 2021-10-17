import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'app/services/global.service';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'app-modal-content',
    templateUrl: './modal.data.html'
})

/**
 * Componente que posee la informacion del modal de la factura
 */
export class NgbdModalContent implements OnInit {

    @Input() name;
    location:string;
    movie:string;
    room:string;
    seats:string;
    subtotal:string;
    total:string;
    hora:string;
    dia:string;

    constructor(public activeModal: NgbActiveModal , private globalService : GlobalService, private router : Router, private apiService : ApiService) {}

    ngOnInit(){

      this.location = this.globalService.current_branch;
      this.movie = this.globalService.current_movie;
      this.room = this.globalService.current_room.toString();
      this.seats = this.globalService.seats_str();
      this.hora = this.globalService.current_time;
      this.subtotal =this.globalService.current_subtotal.toString();
      this.total = (this.globalService.current_subtotal + (this.globalService.current_subtotal * 0.13)).toString();
      this.dia = this.globalService.current_date;


    }

    /**
     * Funcion que se ejecuta cuando se confirma la seleccion de compra
     */
    confirmed(){

        this.globalService.current_bill = this;
        this.router.navigateByUrl("/billing");

        this.globalService.selected_seats.forEach(seat => {
            const seat_interface = {
                projection_id : seat.projection_id,
                number : seat.text,
                status : "TAKEN"
            }
            this.apiService.put_seat_bought(seat_interface).subscribe();
        });
    }
}

@Component({
    selector: 'app-modal-component',
    templateUrl: './modal.component.html'
})

/**
 * Componente de control del modal
 */
export class NgbdModalComponent {
    constructor(private modalService: NgbModal, private globalService : GlobalService) {}
    open() {

        if(this.globalService.selected_seats.length == this.globalService.current_tickets){
            const modalRef = this.modalService.open(NgbdModalContent);
            modalRef.componentInstance.name = 'World';
        }
        else{
            alert("Aun no ha selecionado todos sus asientos!")
        }
    }
}

