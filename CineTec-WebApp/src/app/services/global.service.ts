import { Injectable } from '@angular/core';
import { NgbdModalContent } from 'app/components/modal/modal.component';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

/**
 * Servicio globlal para control de variables de ejecucion, funciones multicomponente y control de interfaz
 */
export class GlobalService {
  

  current_branch: string;
  current_date: string;
  current_movie: string;
  current_time: string;
  current_tickets : number;
  current_projection: number;
  current_price: number;
  current_subtotal: number;
  current_room: number;
  current_columns: number;
  current_rows: number;
  current_bill: NgbdModalContent;
  current_address: string;
  client_id: string;
  client_name: string;
  xml: any;

  selected_seats = [];

  private name = new Subject<any>();
  private showAddItem : boolean = false;
  private showEditItem : boolean = false;
  private add = new Subject<any>();
  private edit = new Subject<any>();
  private current_item : any;

  constructor() { }

  /**
   * Funcion que revisa si la sucursal ha cambiado
   * @returns un observable de sucursal
   */
  current_branch_check():Observable<any> {
    this.name.next(this.current_branch);
    return this.name.asObservable();

  }


    /**
   * Funcion que define si se muestra el componente add-item
   */
     toggleAddItem(): void {
      this.showAddItem = !this.showAddItem;
      this.add.next(this.showAddItem);
    }
  
    /**
     * Funcion que retorna el valor booleano que identifica si add-item se muestra o no
     * @returns un observable
     */
    onToggleAdd(): Observable<any> {
      return this.add.asObservable();
    }
  
    /**
     * Funcion que retorna el valor booleano que identifica si las opciones de edicion de add-item se muestran o no
     * @returns un observable
     */
    onToggleEdit(): Observable<any> {
      return this.edit.asObservable();
    }
  
    /**
     * Funcion que se ejcuta cuando el boton de edicion es presionado. 
     * Define el valor del booleano que dicat si se muestran o no las opciones de edicion de add-tiem
     */
    toggleEditItem(): void {
      this.showAddItem = true;
      this.add.next(this.showAddItem);
      this.showEditItem = true;
      this.edit.next(this.showEditItem);
    }
  
    /**
     * Funcion que se ejecuta al presionar cancelar en la ventana de edicion.
     */
    cancelEdit(){
      this.showAddItem = false;
      this.add.next(this.showAddItem);
      this.showEditItem = false;
      this.edit.next(this.showEditItem);
  
    }


    setCurrentItem(item:any) : void{

      this.current_item = item;
    }

    getCurrentItem() : any{
      return this.current_item;

    }

    seatSelected(seat){

      console.log(this.current_tickets);

      console.log(this.selected_seats.length)

      if (this.selected_seats.length > this.current_tickets - 1 ){

        this.selected_seats.push(seat);

        this.selected_seats[0].color = "white";

        this.selected_seats.shift();

      }

      else{

        this.selected_seats.push(seat);

      }

    }

    clear_seats(){

      this.selected_seats = [];
    }

    seats_str(){

      var numbers = [];

      for (var seat of this.selected_seats) {

        numbers.push(seat.text);

      }

      var res = "";

      for (var seat_num of numbers){

        res = res + seat_num + ",";

      }

      res = res.slice(0,-1);
      
      return res;


      }

}
