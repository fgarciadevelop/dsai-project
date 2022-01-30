import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { AuthService } from 'src/app/api-connect/services/auth.service';
import { EventosService } from 'src/app/api-connect/services/eventos.service';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { DialogFormCreateComponent } from 'src/app/shared/components/dialog-form-create/dialog-form-create.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public rol: boolean = false;
  public loading: boolean = false;
  public idMovie: string = '';
  public movieHasDirectors: boolean = false;
  @Input() movie: MovieModel = new MovieModel;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private eventosService: EventosService,
    private dialog: MatDialog,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    let rol = this.auth.getRolFromToken();
    rol != 0 ? this.rol = true : this.rol = false;
    if(this.movie.id == undefined){
      this.idMovie = this.router.url.split('/')[2];
    }
    this.moviesService.get(this.idMovie).subscribe((movie: any) => {
      this.movie = movie;
      console.log(movie);
      if(this.movie != null){
        this.loading = false;
      }else{
        this.router.navigateByUrl('home');
      }
    })
  }

  deleteMovie(movie: MovieModel){
    this.loading = true;
    console.log('Borrando esta película: ', movie);
    this.moviesService.delete(movie.id!).subscribe((res) => {
      this.loading = false;
      this.router.navigateByUrl('home');
    })
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
      this.movie = res;
    })
  }

}
