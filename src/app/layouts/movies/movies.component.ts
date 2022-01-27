import { Component, OnInit } from '@angular/core';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies: MovieModel[] = [];
  constructor(
    private moviesService: MoviesService,
  ) { }

  ngOnInit(): void {
    this.moviesService.getAll().subscribe((movies: any) => {
      this.movies = movies;
      console.table(this.movies);
    })
  }

}
