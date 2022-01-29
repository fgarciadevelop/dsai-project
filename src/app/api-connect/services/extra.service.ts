import { Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { SerieModel } from '../models/serie.model';
import { MoviesService } from './movies.service';
import { SeriesService } from './series.service';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {

  public movies: MovieModel[] = [];
  public series: SerieModel[] = [];
  constructor(
    private movieService: MoviesService,
    private serieService: SeriesService,
  ) { 

    this.serieService.getAll().subscribe((res: any) => {
      this.series = res;
    })
    this.movieService.getAll().subscribe((res: any) => {
      this.movies = res;
    })

  }

  public getNextId(tipo: string){
    return new Promise((resolve, reject) => {
      let position = '00000';
      let arrayNumber: string[] = [];
      let i = 1;
      let nextPosition = '000' + i;

      if(tipo == 'movie'){
        this.movies.forEach(movie => {
          arrayNumber.push(movie.id!);
        })
      }else if(tipo == 'serie'){
        this.series.forEach(serie => {
          arrayNumber.push(serie.id!);
        })
      }

      for(let pos of arrayNumber){
        pos = pos.slice(1,5);
        if(pos == nextPosition && arrayNumber.length == i){
          i++;
          position = nextPosition.slice(0,3) + i.toString();
        }else if(pos == nextPosition){
          i++;
          nextPosition = nextPosition.slice(0,3) + i.toString();
        }else{
          position = nextPosition;
        }
      }

      switch(tipo){
        case 'movie':
          position = '0' + position;
          break;
        case 'serie':
          position = '1' + position;
          break;
      }
      resolve(position);
    })
  }

}
