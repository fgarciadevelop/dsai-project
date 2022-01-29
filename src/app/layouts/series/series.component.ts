import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SerieModel } from 'src/app/api-connect/models/serie.model';
import { SeriesService } from 'src/app/api-connect/services/series.service';
import { DialogFormCreateComponent } from 'src/app/shared/components/dialog-form-create/dialog-form-create.component';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  
  public dialogOpen: any;
  public series: SerieModel[] = [];
  
  constructor(
    private seriesService: SeriesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.seriesService.getAll().subscribe((series: any) => {
      this.series = series;
      console.table(this.series);
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

    this.dialogOpen.afterClosed().subscribe((res: any) => {
      console.log('Cerrado', res);
      if(res != undefined){
        this.series.push(res);
      }
    });

  }

}
