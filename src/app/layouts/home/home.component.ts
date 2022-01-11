import { Component } from '@angular/core';
import { EspecialService } from 'src/app/api-connect/services/especial.service';
import { MoviesService } from 'src/app/api-connect/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'dsai-final-project';

  public movies = [];

  constructor(
    private moviesService: MoviesService,
    private especialService: EspecialService,
  ){}

  ngOnInit(){
  }

}
