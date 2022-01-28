import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { EventosService } from 'src/app/api-connect/services/eventos.service';
import { MoviesService } from 'src/app/api-connect/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public loading: boolean = false;
  public idMovie: string = '';
  public movieHasDirectors: boolean = false;
  @Input() movie: MovieModel = new MovieModel;
  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private eventosService: EventosService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    if(this.movie.id == undefined){
      this.idMovie = this.router.url.split('/')[2];
    }
    this.moviesService.get(this.idMovie).subscribe((movie: any) => {
      this.movie = movie;
      console.log(this.movie.director);
      this.loading = false;
      if(Array.isArray(this.movie.director)){
        this.movieHasDirectors = true;
        
      }
    })
  }

  deleteMovie(movie: MovieModel){
    console.log('Borrando esta película: ', movie);
  }

  editMovie(movie: MovieModel){
    console.log('Editando esta película: ', movie);
  }

}
