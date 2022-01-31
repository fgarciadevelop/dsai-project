import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestacadoModel } from 'src/app/api-connect/models/destacado.model';
import { TrailerModel } from 'src/app/api-connect/models/trailer.model';
import { EspecialService } from 'src/app/api-connect/services/especial.service';
import { EventosService } from 'src/app/api-connect/services/eventos.service';

@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.scss']
})
export class BarraLateralComponent implements OnInit {

  public destacados: DestacadoModel[] = [];
  public trailers: TrailerModel[] = [];
  public baseURL = "http://localhost:8080";
  
  constructor(
    private especialService: EspecialService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.especialService.getDestacados().subscribe((destacados: any) => {
      this.destacados = destacados;
    });
    this.especialService.getTrailers().subscribe((trailers: any) => {
      this.trailers = trailers;
      console.log(trailers);
    })
  }

  viewElement(element: DestacadoModel){
    this.router.navigateByUrl(`${element.type}/${element.id}`).then(() => {
      window.location.reload();
    });
    console.log(`${element.type}/${element.id}`);
  }

  viewTrailer(trailer: TrailerModel){
    console.log(trailer)
    //open modal youtube vision
  }

}
