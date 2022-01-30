import { Component, OnInit } from '@angular/core';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormCreateComponent } from 'src/app/shared/components/dialog-form-create/dialog-form-create.component';
import { AuthService } from 'src/app/api-connect/services/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public dialogOpen: any;
  public movies: MovieModel[] = [];
  public rol: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private dialog: MatDialog,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    let rol = this.auth.getRolFromToken();
    rol != 0 ? this.rol = true : this.rol = false;
    this.moviesService.getAll().subscribe((movies: any) => {
      this.movies = movies;
      console.table(this.movies);
    })
  }

  addMovie(){
    console.log('Añadiendo película');
    this.dialogOpen = this.dialog.open(DialogFormCreateComponent,{
      data: {
        action: 'crear',
        dialog: this.dialogOpen,
        tipo: 'movie',
        pelicula: {},
        serie: {}
      }

    })

    this.dialogOpen.afterClosed().subscribe((res: any) => {
      console.log('Cerrado', res);
      if(res != undefined){
        this.movies.push(res);
      }
    });

  }

}
