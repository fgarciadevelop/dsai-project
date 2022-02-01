import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TrailerModel } from 'src/app/api-connect/models/trailer.model';
import { VideoReplayComponent } from '../video-replay/video-replay.component';

@Component({
  selector: 'app-trailers-card',
  templateUrl: './trailers-card.component.html',
  styleUrls: ['./trailers-card.component.scss']
})
export class TrailersCardComponent implements OnInit {


  public baseURL = "http://localhost:8080";  
  public dialogOpen: any;
  @Input() trailer!: TrailerModel;
  
  constructor(
    private dialogVideo: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
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
