import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { EventosService } from 'src/app/api-connect/services/eventos.service';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { DialogFormCreateComponent } from 'src/app/shared/components/dialog-form-create/dialog-form-create.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public loading: boolean = false;
  public idMovie: string = '';
  public movieHasDirectors: boolean = false;
  @Input() movie: MovieModel = new MovieModel;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private eventosService: EventosService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    if(this.movie.id == undefined){
      this.idMovie = this.router.url.split('/')[2];
    }
    this.moviesService.get(this.idMovie).subscribe((movie: any) => {
      this.movie = movie;
      if(this.movie != null){
        if(Array.isArray(this.movie.director)){
          this.movieHasDirectors = true;
        }
        this.loading = false;
      }else{
        this.router.navigateByUrl('home');
      }
    })
  }

  deleteMovie(movie: MovieModel){
    console.log('Borrando esta película: ', movie);
  }

  editMovie(movie: MovieModel){
    console.log('Editando esta película: ', movie);
    let dialogRef = this.dialog.open(DialogFormCreateComponent,{
      data:{
        action: 'editar',
        dialog: null,
        tipo: 'movie',
        pelicula: movie,
        serie: {}
      }
    })
    dialogRef.afterClosed().subscribe((res:any) => {
      console.log('Cerrado', res);
      this.movie = res;
    })
  }

}
