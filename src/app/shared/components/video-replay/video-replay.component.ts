import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

export interface VideoData{
  src: string,
}

@Component({
  selector: 'app-video-replay',
  templateUrl: './video-replay.component.html',
  styleUrls: ['./video-replay.component.scss']
})
export class VideoReplayComponent implements OnInit {

  public loading: boolean = false;
  public id = '';

  constructor(
    public dialogRef: MatDialogRef<VideoReplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VideoData,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    console.log("Opened: ", this.data.src)
    this.loading = true;
    this.loadVideo();
  }

  public loadVideo(){
    this.id = this.data.src.split('/')[3];
    if(this.id == ''){
      this.toastr.clear();
      this.toastr.error('La url del vídeo es incorrecta.', 'Error cargando trailer' );
      this.dialogRef.close();
    }else{
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
    this.loading = false;
  }

}

