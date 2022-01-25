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

  public idMovie: string = '';
  public movieHasDirectors: boolean = false;
  @Input() movie: MovieModel = new MovieModel;
  constructor(
    private router: Router,
    private moviesSercice: MoviesService,
    private eventosService: EventosService,
  ) { }

  ngOnInit(): void {
    if(this.movie.id == undefined){
      this.idMovie = this.router.url.split('/')[2];
    }
    this.moviesSercice.get(this.idMovie).subscribe((movie: any) => {
      this.movie = movie;
      console.log(this.movie.director);
      if(Array.isArray(this.movie.director)){
        this.movieHasDirectors = true;
      }
    })
  }

}
