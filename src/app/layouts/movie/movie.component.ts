import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  @Input() movie: MovieModel = new MovieModel;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private dialog: MatDialog,
    private auth: AuthService,
    private toastr: ToastrService,
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
      if(this.movie != null){
        this.loading = false;
      }else{
        this.toastr.clear();
        this.toastr.error('Se produjo un error en el servidor.', 'Error al cargar la película' );
        this.router.navigateByUrl('home');
      }
    })
  }

  deleteMovie(movie: MovieModel){
    this.loading = true;
    this.moviesService.delete(movie.id!).subscribe((res) => {
      if(res == undefined){
        this.toastr.clear();
        this.toastr.error('Se produjo un error en el servidor.', 'Error al borrar la película' );
      }else{
        this.toastr.clear();
        this.toastr.success('Pelicula borrada correctamente' );
        this.router.navigateByUrl('home');
      }
      this.loading = false;
    });
  }

  editMovie(movie: MovieModel){
    let dialogRef = this.dialog.open(DialogFormCreateComponent,{
      data:{
        action: 'editar',
        dialog: null,
        tipo: 'movie',
        pelicula: movie,
        serie: {}
      }
    });
    dialogRef.afterClosed().subscribe((res:any) => {
      if(res == undefined){
        this.toastr.clear();
        this.toastr.error('Se produjo un error con alguno de los datos introducidos.', 'Error al editar la película' );
      }else if(res == 'cerrado'){
        this.toastr.clear();
        this.toastr.warning('Ha cerrado la edición sin guardar' );
      }else{
        this.movie = res;
        this.toastr.clear();
        this.toastr.success('Pelicula editada correctamente' );
      }
    });
  }

}
