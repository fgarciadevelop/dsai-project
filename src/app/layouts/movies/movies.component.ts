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

  public dialogOpen: any;
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
    this.dialogOpen = this.dialog.open(DialogFormCreateComponent,{
      data: {
        dialog: this.dialogOpen,
        tipo: 'movie',
        pelicula: {},
        serie: {}
      }

    })

    this.dialogOpen.afterClosed().subscribe((res: any) => {
      console.log('Cerrado', res);
      this.movies.push(res);
    });

  }

}
