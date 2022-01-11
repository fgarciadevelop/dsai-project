import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerieModel } from 'src/app/api-connect/models/serie.model';
import { SeriesService } from 'src/app/api-connect/services/series.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss']
})
export class SerieComponent implements OnInit {

  public idSerie: string = '';
  @Input() serie: SerieModel = new SerieModel;
  constructor(
    private router: Router,
    private seriesService: SeriesService,
  ) { }

  ngOnInit(): void {
    if(this.serie.id == undefined){
      this.idSerie = this.router.url.split('/')[2];
    }
    this.seriesService.get(this.idSerie).subscribe((serie: any) => {
      this.serie = serie;
      console.log(serie);
    })
  }

}
