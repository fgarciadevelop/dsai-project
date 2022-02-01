import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SerieModel } from 'src/app/api-connect/models/serie.model';
import { SeriesService } from 'src/app/api-connect/services/series.service';

@Component({
  selector: 'app-serie-card',
  templateUrl: './serie-card.component.html',
  styleUrls: ['./serie-card.component.scss']
})
export class SerieCardComponent implements OnInit {

  @Input() serie: SerieModel = new SerieModel;
  
  constructor(
    private seriesService: SeriesService,
    private router: Router,
    private toastr: ToastrService,
  ) { 
  }

  ngOnInit(): void {
    if(this.serie.id == undefined){
      this.seriesService.get(this.router.url.split('/')[2]).subscribe((serie: any) => {
        this.serie = serie;
        if(this.serie == undefined){
          this.toastr.clear();
          this.toastr.error('Hubo un problema en la conexión con el servidor.', 'Error al cargar los datos de la serie');
        }
      })
    }
  }

  viewDetail(serie: SerieModel){
    this.router.navigateByUrl(`series/${serie.id}`);
  }

}
