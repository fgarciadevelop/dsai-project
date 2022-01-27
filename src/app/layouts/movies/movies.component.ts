import { Component, OnInit } from '@angular/core';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormCreateComponent } from 'src/app/shared/components/dialog-form-create/dialog-form-create.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies: MovieModel[] = [];
  constructor(
    private moviesService: MoviesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.moviesService.getAll().subscribe((movies: any) => {
      this.movies = movies;
      console.table(this.movies);
    })
  }

  addMovie(){
    console.log('Añadiendo película');
    let dialogRef = this.dialog.open(DialogFormCreateComponent,{

      data: {

        tipo: 'movie',
        pelicula: {},

      }

    })

    dialogRef.afterClosed().subscribe(res => {
      console.log('Cerrado', res);
    });

  }

}
