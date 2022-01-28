import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonaModel } from 'src/app/api-connect/models/persona.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { PersonasService } from 'src/app/api-connect/services/personas.service';
import { SeriesService } from 'src/app/api-connect/services/series.service';

import { Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { Observable } from 'rxjs';
import { UploadService } from 'src/app/api-connect/services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export interface DialogFormCreate{

  dialog: MatDialogRef<any>,
  tipo: string,
  pelicula: {
    id: string,
    url: string,
    imgURL: string,
    title: string,
    description: string,
    year: number,
    duration: number,
    director: number,
    cast: number[],
  },
  serie: {
    id: string,
    url: string,
    imgURL: string,
    title: string,
    description: string,
    year: number,
    duration: number,
    director: number,
    cast: number[],
  }

}

@Component({
  selector: 'app-dialog-form-create',
  templateUrl: './dialog-form-create.component.html',
  styleUrls: ['./dialog-form-create.component.scss']
})
export class DialogFormCreateComponent implements OnInit {

  public currentFile?: File;
  public progress: number = 0;
  public message: string = '';

  public buttonOK: boolean = false;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 5,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  public loading: boolean = true;

  public personas: PersonaModel[] = [];
  public dataForm!: FormGroup;
  public actForm!: FormGroup;
  public extraForm!: FormGroup;

  public director = new FormControl();
  public cast = new FormControl();

  public imagen!: File;
  public fileName: string = '';

  //Form data movie
  public get id(){ return this.dataForm.get('id') };
  public get title(){ return this.dataForm.get('title') };
  public get description(){ return this.dataForm.get('description') };
  public get year(){ return this.dataForm.get('year') };
  public get duration(){ return this.dataForm.get('duration') };

  //Form extra movie
  public get url(){ return this.extraForm.get('url') };
  public get imgURL(){ return this.extraForm.get('imgURL') };


  constructor(
    public dialogRef: MatDialogRef<DialogFormCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogFormCreate,
    private moviesService: MoviesService,
    private seriesService: SeriesService,
    private personasService: PersonasService,
    private uploadService: UploadService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.loadForm();

  }

  public loadForm(){

    this.personasService.getAll().subscribe((personas: any) => {

      this.personas = personas;
      console.log(this.data);

      this.dataForm = this.fb.group({
        title: new FormControl(this.data.pelicula.title, [Validators.required]),
        description: new FormControl(this.data.pelicula.description, [Validators.required]),
        year: new FormControl(this.data.pelicula.year, [Validators.required]),
        duration: new FormControl(this.data.pelicula.duration, [Validators.required]),
        id: new FormControl(this.data.pelicula.id, [Validators.required]),
      });

      this.actForm = this.fb.group({
        director: new FormControl(this.data.pelicula.director, [Validators.required]),
        cast: new FormControl(this.data.pelicula.cast, [Validators.required]),
      });

      this.extraForm = this.fb.group({
        url: new FormControl(this.data.pelicula.url),
      });

      this.loading = false;

    });

  }

  public guardarForm(){
    console.log("Form enviado");
    console.table(this.dataForm);

    this.moviesService.getNextMovie().then((res: any) => {
      let dataFromForm = {
        title: this.dataForm.get('title')?.value,
        description: this.dataForm.get('description')?.value,
        year: this.dataForm.get('year')?.value,
        duration: this.dataForm.get('duration')?.value,
        director: this.director.value,
        cast: this.cast.value,
        url: this.extraForm.get('url')?.value,
        imgURL: this.data.pelicula.imgURL,
        id: res,
      }
      console.log(dataFromForm);
      this.moviesService.create(dataFromForm).subscribe((res) => {
        console.log(res);
        this.dialogRef.close(res);
      })
    });
  }

  public cancelar(){
    console.log(this.dialogRef);
    this.dialogRef.close('hola');
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];
    if(file){
      this.fileName = file.name;
      this.imagen = file;
      this.upload();
    }
  }

  upload(): void {
    this.progress = 0;
    this.currentFile = this.imagen;
    this.uploadService.upload(this.currentFile).subscribe((res: any) => {
      if(res.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * res.loaded / res.total);
      }else if (res instanceof HttpResponse){
        this.data.pelicula.imgURL = '/img/' + res.body + '.jpg';
        this.buttonOK = true;
        console.log(this.buttonOK)
      }
    },
    (err: any) => {
      console.log(err);
      this.progress = 0;
      this.currentFile = undefined;
    })
  }

 }
