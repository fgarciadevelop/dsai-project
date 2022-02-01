import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SerieModel } from 'src/app/api-connect/models/serie.model';
import { AuthService } from 'src/app/api-connect/services/auth.service';
import { SeriesService } from 'src/app/api-connect/services/series.service';
import { DialogFormCreateComponent } from 'src/app/shared/components/dialog-form-create/dialog-form-create.component';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  
  public loading: boolean = false;
  public dialogOpen: any;
  public series: SerieModel[] = [];
  public rol: boolean = false;
  
  constructor(
    private seriesService: SeriesService,
    private dialog: MatDialog,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let rol = this.auth.getRolFromToken();
    rol != 0 ? this.rol = true : this.rol = false;
    this.seriesService.getAll().subscribe((series: any) => {
      this.series = series;
      console.table(this.series);
      if(this.series != null){
        this.loading = false;
      }else{
        this.toastr.clear();
        this.toastr.error('Se produjo un error en el servidor.', 'Error al cargar las series' );
      }
    },(err)=>{
      this.toastr.clear();
      this.toastr.error('Se produjo un error en el servidor.', 'Error al cargar las series' );
    });
  }

  addSerie(){
    console.log('Añadiendo película');
    this.dialogOpen = this.dialog.open(DialogFormCreateComponent,{
      data: {
        action: 'crear',
        dialog: this.dialogOpen,
        tipo: 'serie',
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
        this.series.push(res);
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
