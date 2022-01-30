import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  ) { }

  ngOnInit(): void {
    let rol = this.auth.getRolFromToken();
    rol != 0 ? this.rol = true : this.rol = false;
    if(this.serie.id == undefined){
      this.idSerie = this.router.url.split('/')[2];
    }
    this.seriesService.get(this.idSerie).subscribe((serie: any) => {
      this.serie = serie;
      console.log(serie);
    });
  }

  deleteSerie(serie: SerieModel){
    this.loading = true;
    console.log('Borrando esta película: ', serie);
    this.seriesService.delete(serie.id!).subscribe((res) => {
      this.loading = false;
      this.router.navigateByUrl('home');
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
      this.serie = res;
    })
  }


}
