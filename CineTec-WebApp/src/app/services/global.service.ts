import { Injectable } from '@angular/core';

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


  constructor() { }
}
