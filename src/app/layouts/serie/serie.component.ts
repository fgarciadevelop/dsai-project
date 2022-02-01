import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SerieModel } from 'src/app/api-connect/models/serie.model';
import { AuthService } from 'src/app/api-connect/services/auth.service';
import { SeriesService } from 'src/app/api-connect/services/series.service';
import { DialogFormCreateComponent } from 'src/app/shared/components/dialog-form-create/dialog-form-create.component';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss']
})
export class SerieComponent implements OnInit {

  public rol: boolean = false;
  public loading: boolean = false;
  public idSerie: string = '';
  @Input() serie: SerieModel = new SerieModel;
  constructor(
    private router: Router,
    private seriesService: SeriesService,
    private dialog: MatDialog,
    private auth: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    let rol = this.auth.getRolFromToken();
    rol != 0 ? this.rol = true : this.rol = false;
    if(this.serie.id == undefined){
      this.idSerie = this.router.url.split('/')[2];
    }
    this.seriesService.get(this.idSerie).subscribe((serie: any) => {
      this.serie = serie;
      if(this.serie != null){
        this.loading = false;
      }else{
        this.toastr.clear();
        this.toastr.error('Se produjo un error en el servidor.', 'Error al cargar la serie' );
        this.router.navigateByUrl('home');
      }
    });
  }

  deleteSerie(serie: SerieModel){
    this.loading = true;
    console.log('Borrando esta película: ', serie);
    this.seriesService.delete(serie.id!).subscribe((res) => {
      if(res == undefined){
        this.toastr.clear();
        this.toastr.error('Se produjo un error en el servidor.', 'Error al borrar la serie' );
      }else{
        this.toastr.clear();
        this.toastr.success('Serie borrada correctamente' );
        this.router.navigateByUrl('home');
      }
      this.loading = false;
    })
  }

  editSerie(serie: SerieModel){
    console.log('Editando esta serie: ', serie);
    let dialogRef = this.dialog.open(DialogFormCreateComponent,{
      data:{
        action: 'editar',
        dialog: null,
        tipo: 'serie',
        serie: serie,
        pelicula: {}
      }
    })
    dialogRef.afterClosed().subscribe((res:any) => {
      if(res == undefined){
        this.toastr.clear();
        this.toastr.error('Se produjo un error con alguno de los datos introducidos.', 'Error al editar la serie' );
      }else if(res == 'cerrado'){
        this.toastr.clear();
        this.toastr.warning('Ha cerrado la edición sin guardar' );
      }else{
        this.serie = res;
        this.toastr.clear();
        this.toastr.success('Serie editada correctamente' );
      }
    })
  }


}
