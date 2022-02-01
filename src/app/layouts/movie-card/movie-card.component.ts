import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
  ) { 
  }

  ngOnInit(): void {
    if(this.movie.id == undefined){
      this.movieService.get(this.router.url.split('/')[2]).subscribe((movie: any) => {
        this.movie = movie;
        if(this.movie == undefined){
          this.toastr.clear();
          this.toastr.error('Hubo un problema en la conexión con el servidor.', 'Error al cargar los datos de la película');
        }
      })
    }
  }

  viewDetail(movie: MovieModel){
    this.router.navigateByUrl(`peliculas/${movie.id}`);
  }

}
