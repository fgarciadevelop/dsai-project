import { Component, OnInit } from '@angular/core';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormCreateComponent } from 'src/app/shared/components/dialog-form-create/dialog-form-create.component';
import { AuthService } from 'src/app/api-connect/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public loading: boolean = false;
  public dialogOpen: any;
  public movies: MovieModel[] = [];
  public rol: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private dialog: MatDialog,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    let rol = this.auth.getRolFromToken();
    rol != 0 ? this.rol = true : this.rol = false;
    this.moviesService.getAll().subscribe((movies: any) => {
      this.movies = movies;
      console.table(this.movies);
      if(this.movies != null){
        this.loading = false;
      }else{
        this.toastr.clear();
        this.toastr.error('Se produjo un error en el servidor.', 'Error al cargar las películas' );
      }
    },(err)=>{
      this.toastr.clear();
      this.toastr.error('Se produjo un error en el servidor.', 'Error al cargar las películas' );
    });
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

    this.dialogOpen.afterClosed().subscribe(async (res: any) => {
      console.log('Cerrado', res);
      this.loading = true;
      if(res == undefined){
        this.toastr.clear();
        this.toastr.error('Se produjo un error con alguno de los datos introducidos.', 'Error al editar la película' );
        this.loading = false;
      }else if(res == 'cerrado'){
        this.toastr.clear();
        this.toastr.warning('Ha cerrado la edición sin guardar' );
        this.loading = false;
      }else{
        this.movies.push(res);
        this.toastr.clear();
        this.toastr.success('Pelicula creada correctamente' );
        await this.delay(1000);
        this.loading = false;
        this.router.navigateByUrl('/peliculas/' + res['id']);
      }
    });

  }

  delay(ms: number){
    return new Promise( resolve => {
      setTimeout(resolve, ms)
    });
  }

}
