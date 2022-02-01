import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DestacadoModel } from 'src/app/api-connect/models/destacado.model';
import { TrailerModel } from 'src/app/api-connect/models/trailer.model';
import { EspecialService } from 'src/app/api-connect/services/especial.service';
import { EventosService } from 'src/app/api-connect/services/eventos.service';
import { DialogCreatePersonaComponent } from '../dialog-create-persona/dialog-create-persona.component';
import { VideoReplayComponent } from '../video-replay/video-replay.component';

@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.scss']
})
export class BarraLateralComponent implements OnInit {

  public dialogOpen: any;

  public destacados: DestacadoModel[] = [];
  public trailers: TrailerModel[] = [];
  public baseURL = "http://localhost:8080";
  
  constructor(
    private especialService: EspecialService,
    private router: Router,
    private dialogVideo: MatDialog,
    private toastr: ToastrService,
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
    if(trailer == undefined || trailer.url == ''){
      this.toastr.clear();
      this.toastr.error('El trailer no tiene una url correcta.', 'Error al abrir el trailer' );
    }else{
      this.dialogOpen = this.dialogVideo.open(VideoReplayComponent,{
        data:{
          src: trailer.url
        }  
      })
      this.dialogOpen.afterClosed().subscribe((res: any) => {
        console.log('Cerrado', res);
      });
    }
  }

}
