import { Component, OnInit } from '@angular/core';
import { SerieModel } from 'src/app/api-connect/models/serie.model';
import { SeriesService } from 'src/app/api-connect/services/series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  public series: SerieModel[] = [];
  constructor(
    private seriesService: SeriesService,
  ) { }

  ngOnInit(): void {
    this.seriesService.getAll().subscribe((series: any) => {
      this.series = series;
      console.table(this.series);
    });
  }

}
