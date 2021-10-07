import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
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

  private name = new Subject<any>();
  private showAddItem : boolean = false;
  private showEditItem : boolean = false;
  private add = new Subject<any>();
  private edit = new Subject<any>();


  private current_item : any;
  
  


  constructor() { }


  current_branch_check():Observable<any> {
    this.name.next(this.current_branch);
    console.log(this.current_branch)
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
  
}
