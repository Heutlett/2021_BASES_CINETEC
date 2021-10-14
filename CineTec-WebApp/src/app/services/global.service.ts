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
  client_phone_number : string;
  xml: any;
  covid:number;

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
     * Define el valor del booleano que dicta si se muestran o no las opciones de edicion de add-tiem
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

    /**
     * Funcion para actualizar current_item
     * @param item nuevo valor para current_item
     */
    setCurrentItem(item:any) : void{
      this.current_item = item;
    }

    /**
     * GET de current_item
     * @returns current_item
     */
    getCurrentItem() : any{
      return this.current_item;

    }

    /**
     * Funcion que seleciona un nuevo asiento. Si ya se llega al maximo 
     * cambia el estado del primer asiento selecionado a libre
     * @param seat El asiento seleccionado
     */
    seatSelected(seat){

      if (this.selected_seats.length > this.current_tickets - 1 ){
        this.selected_seats.push(seat);
        this.selected_seats[0].color = "white";
        this.selected_seats.shift();
      }

      else{
        this.selected_seats.push(seat);
      }
    }

    /**
     * Funcion que limpia la seleccion de asientos
     */
    clear_seats(){

      this.selected_seats = [];
    }

    /**
     * Funcion que transforma los asiento selecionados en un string
     * @returns String con los asientos seleccionados
     */
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
