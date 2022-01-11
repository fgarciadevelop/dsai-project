import { Component } from '@angular/core';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { SerieModel } from 'src/app/api-connect/models/serie.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { SeriesService } from 'src/app/api-connect/services/series.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'dsai-final-project';

  public movies: MovieModel[]  = [];
  public series: SerieModel[] = [];

  constructor(
    private moviesService: SeriesService,
  ){}

  ngOnInit(){
    this.moviesService.getNovedades().subscribe((movies: any) => { 
      this.movies = movies;
      console.log(movies); 
    });
    this.moviesService.getNovedades().subscribe((series: any) => { 
      this.series = series;
      console.log(series); 
    });
  }

}
