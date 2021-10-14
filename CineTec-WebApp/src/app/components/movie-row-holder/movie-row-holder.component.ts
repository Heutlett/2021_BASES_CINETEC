import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'interfaces/Movies';

@Component({
  selector: 'app-movie-row-holder',
  templateUrl: './movie-row-holder.component.html',
  styleUrls: ['./movie-row-holder.component.css']
})

/**
 * Componente de utilidad para crear filas de imagenes
 */
export class MovieRowHolderComponent implements OnInit {

  @Input() row : number;
  @Input() all_movies : Movie[];
  movies : Movie[];
  start :number;
  end : number;

  constructor() { }

  ngOnInit(): void {

    this.start = this.row * 3;
    this.end = ((this.row + 1) * 3);
    this.movies = this.all_movies.slice(this.start,this.end);

  }

  /**
   * Funcion generadora de la ruta de la imagen
   * @param name nombre de la pelicua
   * @returns dirrecion de la imagem
   */
  img(name){
        return 'assets/img/' +name + '.jpg';
  }

}
