import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { Movie } from 'interfaces/Movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/**
 * Pantalla principal del lado cliente (Landing page). Muestra todas las peliculas e informacion relevante
 */
export class HomeComponent implements OnInit {
  movies: Movie[];
  ready: boolean;
  rows: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.get_movies().subscribe((movies)=>{
      this.movies = movies
      this.update();
    });

  }

  /**
   * Funcion que se llama una vez que el proceso asincronico de recupercion de
   * peliculas ha terminado 
   */
  update(){

    this.rows = Math.floor(this.movies.length/3) +1 ;
    this.ready = true;

  }

}
