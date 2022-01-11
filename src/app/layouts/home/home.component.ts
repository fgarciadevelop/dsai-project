import { Component } from '@angular/core';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { SeriesService } from 'src/app/api-connect/services/series.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'dsai-final-project';

  public movies = [];

  constructor(
    private moviesService: SeriesService,
  ){}

  ngOnInit(){
    this.moviesService.getAll().subscribe((movie) => { console.log(movie); });
    this.moviesService.getNovedades().subscribe((movies) => { console.log(movies); });
    this.moviesService.get('101').subscribe((movie) => { console.log(movie); });
    
  }

}
