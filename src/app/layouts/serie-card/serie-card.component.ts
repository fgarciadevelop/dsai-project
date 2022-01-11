import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ) { 
  }

  ngOnInit(): void {
    if(this.serie.id == undefined){
      this.seriesService.get(this.router.url.split('/')[2]).subscribe((serie: any) => {
        console.log('Serie: ', serie);
        this.serie = serie;
      })
    }
  }

  viewDetail(serie: SerieModel){
    this.router.navigateByUrl(`series/${serie.id}`);
  }

}
