import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { SerieModel } from 'src/app/api-connect/models/serie.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { SeriesService } from 'src/app/api-connect/services/series.service';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.scss']
})
export class RecomendacionesComponent implements OnInit {

  public movies: MovieModel[]  = [];
  public series: SerieModel[] = [];

  constructor(
    private moviesService: MoviesService,
    private seriesService: SeriesService,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.moviesService.getNovedades().subscribe((movies: any) => { 
      this.movies = movies;
      if(this.movies.length == 0){
        this.toastr.clear();
        this.toastr.error('Hubo un problema en la conexión con el servidor.', 'Error al cargar las películas');
      }
    });
    this.seriesService.getNovedades().subscribe((series: any) => { 
      this.series = series;
      if(this.series.length == 0){
        this.toastr.clear();
        this.toastr.error('Hubo un problema en la conexión con el servidor.', 'Error al cargar las series');
      }
    });
  }

}
