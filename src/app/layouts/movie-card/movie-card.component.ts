import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: MovieModel = new MovieModel;
  
  constructor(
    private movieService: MoviesService,
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
    console.log('No hace falta la llamada', this.movie);
    if(this.movie.id == undefined){
      this.movieService.get(this.router.url.split('/')[2]).subscribe((movie: any) => {
        console.log('Pelicula: ', movie);
        this.movie = movie;
      })
    }
  }

  viewDetail(movie: MovieModel){
    this.router.navigateByUrl(`peliculas/${movie.id}`);
  }

}
