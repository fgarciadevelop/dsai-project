import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss']
})
export class SerieComponent implements OnInit {

  public idSerie: string = '';
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.idSerie = this.router.url.split('/')[2];
    console.log(this.idSerie);
    
  }

}
