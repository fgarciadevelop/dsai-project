import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonaModel } from 'src/app/api-connect/models/persona.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { PersonasService } from 'src/app/api-connect/services/personas.service';
import { SeriesService } from 'src/app/api-connect/services/series.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { UploadService } from 'src/app/api-connect/services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { ExtraService } from 'src/app/api-connect/services/extra.service';
import { SerieModel } from 'src/app/api-connect/models/serie.model';
import { DialogCreatePersonaComponent } from '../dialog-create-persona/dialog-create-persona.component';
import { TrailerModel } from 'src/app/api-connect/models/trailer.model';
import { EspecialService } from 'src/app/api-connect/services/especial.service';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export interface DialogFormCreate{

  action: string,
  tipo: string,
  pelicula: {
    id: string,
    url: string,
    imgURL: string,
    title: string,
    description: string,
    year: number,
    duration: number,
    director: any,
    cast: any[],
  },
  serie: {
    id: string,
    url: string,
    imgURL: string,
    title: string,
    description: string,
    yearStart: number,
    yearEnd: number,
    seasons: number,
    creators: any[],
    cast: any[],
  },
  trailer: {
    id: string,
    title: string,
    url: string,
    imgUrl: string,
  }

}

@Component({
  selector: 'app-dialog-form-create',
  templateUrl: './dialog-form-create.component.html',
  styleUrls: ['./dialog-form-create.component.scss']
})
export class DialogFormCreateComponent implements OnInit {

  public dialogOpen: any;

  public currentFile?: File;
  public progress: number = 0;
  public message: string = '';

  public buttonOK: boolean = false;

  public selectedCast: number[] = [];
  public selectedCreators: number[] = [];

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

  public creators = new FormControl();

  public imagen!: File;
  public fileName: string = '';

  //Form data movie
  public get id(){ return this.dataForm.get('id') };
  public get title(){ return this.dataForm.get('title') };
  public get description(){ return this.dataForm.get('description') };
  public get year(){ return this.dataForm.get('year') };
  public get duration(){ return this.dataForm.get('duration') };

  //Form data serie
  public get yearStart(){ return this.dataForm.get('yearStart') };
  public get yearEnd(){ return this.dataForm.get('yearEnd') };
  public get seasons(){ return this.dataForm.get('seasons') };

  //Form extra movie
  public get url(){ return this.extraForm.get('url') };
  public get imgURL(){ return this.extraForm.get('imgURL') };

  constructor(
    public dialogRef: MatDialogRef<DialogFormCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogFormCreate,
    private moviesService: MoviesService,
    private seriesService: SeriesService,
    private especialService: EspecialService,
    private personasService: PersonasService,
    private uploadService: UploadService,
    private router: Router,
    private fb: FormBuilder,
    private extraService: ExtraService,
    private dialogPersona: MatDialog,
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.loadForm();

  }

  public loadForm(){

    this.personasService.getAll().subscribe((personas: any) => {

      this.personas = personas;
      console.log(this.data);

      if(this.data.tipo == 'serie'){
        this.dataForm = this.fb.group({
          title: new FormControl(this.data.serie.title, [Validators.required]),
          description: new FormControl(this.data.serie.description, [Validators.required]),
          yearStart: new FormControl(this.data.serie.yearStart, [Validators.required]),
          yearEnd: new FormControl(this.data.serie.yearEnd, [Validators.required]),
          seasons: new FormControl(this.data.serie.seasons, [Validators.required]),
        });

        this.actForm = this.fb.group({
          director: new FormControl(this.data.serie.creators, [Validators.required]),
          cast: new FormControl(this.data.serie.cast, [Validators.required]),
        });
  
        this.extraForm = this.fb.group({
          url: new FormControl(this.data.serie.url),
        });
      }else if(this.data.tipo == 'movie'){
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
      }else if(this.data.tipo == 'trailer'){
        this.dataForm = this.fb.group({
          title: new FormControl(this.data.trailer.title, [Validators.required]),
          url: new FormControl(this.data.trailer.url, [Validators.required]),
        });
      }

      if(this.data.action == 'editar'){
        if(this.dataForm.status == 'VALID' && this.actForm.status == 'VALID' && this.extraForm.status == 'VALID'){
          this.buttonOK = true;
        }
        if(this.data.tipo == 'movie'){
          for(let actor of this.data.pelicula.cast){
            let position = 1;
            for(let persona of this.personas){
              if(persona.id == actor.id){
                this.selectedCast.push(position);
              }
              position++;
            }
          }
        }else if(this.data.tipo == 'serie'){
          for(let actor of this.data.serie.cast){
            let position = 1;
            for(let persona of this.personas){
              if(persona.id == actor.id){
                this.selectedCast.push(position);
              }
              position++;
            }
          }
          for(let creator of this.data.serie.creators){
            let position = 1;
            for(let persona of this.personas){
              if(persona.id == creator.id){
                this.selectedCreators.push(position);
              }
              position++;
            }
          }
        }
      }
      this.loading = false;

    });

  }

  public createItem(tipo: string, item: any){
    console.log(item)
    this.extraService.getNextId(this.data.tipo).then((res: any) => {
      switch(tipo){
        case 'movie':
          item.dataMovie.id = res;
          item.dataMovie.cast = this.cast.value;
          console.log(item.dataMovie);
          this.moviesService.create(item.dataMovie).subscribe((res) => {
            console.log(res);
            this.dialogRef.close(res);
          })
          break;
        case 'serie':
          item.dataSerie.id = res;
          this.seriesService.create(item.dataSerie).subscribe((res) => {
            console.log(res);
            this.dialogRef.close(res);
          })
          break;
        case 'trailer':
          this.especialService.createTrailer(item.dataTrailer).subscribe((res) => {
            console.log(res);
            this.dialogRef.close(res);
          })
          break;
      }
    });
  }

  public editItem(tipo: string, item: any){
    switch(tipo){
      case 'movie':
        item.dataMovie.cast = this.selectedCast;
        item.dataMovie.id = this.data.pelicula.id;
        if(this.director.valid && this.director.value == null){
          item.dataMovie.director = this.data.pelicula.director.id;
        }
        this.moviesService.edit(item.dataMovie).subscribe((res) => {
          console.log(res);
          this.dialogRef.close(res);
        })
        break;
      case 'serie':
        item.dataSerie.creators = this.selectedCreators;
        item.dataSerie.cast = this.selectedCast;
        item.dataSerie.id = this.data.serie.id;
        /*if(this.director.valid && this.director.value == null){
          item[1].director = this.data.pelicula.director.id;
        }*/
        this.seriesService.edit(item.dataSerie).subscribe((res) => {
          console.log(res);
          this.dialogRef.close(res);
        })
        break;
      case 'trailer':
        this.especialService.editTrailer(item.dataTrailer).subscribe((res) => {
          console.log(res);
          this.dialogRef.close(res);
        })
        break;        
    }
  }

  public guardarForm(){

    let dataMovie: MovieModel = {
      id: undefined,
      url: undefined,
      imgURL: undefined,
      title: undefined,
      description: undefined,
      year: undefined,
      duration: undefined,
      director: undefined,
      cast: undefined
    };
    let dataSerie: SerieModel = {
      id: undefined,
      url: undefined,
      imgURL: undefined,
      title: undefined,
      description: undefined,
      yearStart: undefined,
      yearEnd: undefined,
      seasons: undefined,
      creators: undefined,
      cast: undefined
    };
    let dataTrailer: TrailerModel = {
      id: undefined,
      title: undefined,
      url: undefined,
      imgURL: undefined
    }
    switch(this.data.tipo){
      case 'movie':
        dataMovie.title = this.dataForm.get('title')?.value;
        dataMovie.description = this.dataForm.get('description')?.value;
        dataMovie.year = this.dataForm.get('year')?.value;
        dataMovie.duration = this.dataForm.get('duration')?.value;
        dataMovie.director = this.director.value;
        dataMovie.url = this.extraForm.get('url')?.value;
        dataMovie.imgURL = this.data.pelicula.imgURL;
        break;
      case 'serie':
        dataSerie.title = this.dataForm.get('title')?.value;
        dataSerie.description = this.dataForm.get('description')?.value;
        dataSerie.yearStart = this.dataForm.get('yearStart')?.value;
        dataSerie.yearEnd = this.dataForm.get('yearEnd')?.value;
        dataSerie.seasons = this.dataForm.get('seasons')?.value;
        dataSerie.creators = this.creators.value;
        dataSerie.cast = this.cast.value;
        dataSerie.url = this.extraForm.get('url')?.value;
        dataSerie.imgURL = this.data.serie.imgURL;
        dataSerie.id = this.data.serie.id;
        break;
      case 'trailer':
        dataTrailer.title = this.dataForm.get('title')?.value;
        dataTrailer.url = this.dataForm.get('url')?.value;
        dataTrailer.imgURL = this.data.trailer.imgUrl;
        break;
    }
    switch(this.data.action){
      case 'crear':
        this.createItem(this.data.tipo, {dataMovie, dataSerie, dataTrailer});
        break;
      case 'editar':
        this.editItem(this.data.tipo, {dataMovie, dataSerie, dataTrailer});
        break;
    }
  }

  public cancelar(){
    this.dialogRef.close('cerrado');
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
    if(this.data.tipo == 'trailer'){
      this.uploadService.upload(this.currentFile, 'trailer').subscribe((res: any) => {
        if(res.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * res.loaded / res.total);
        }else if (res instanceof HttpResponse){
          this.data.trailer.imgUrl = '/img/' + res.body + '.jpg';
          this.buttonOK = true;
        }
      },
      (err: any) => {
        console.log(err);
        this.progress = 0;
        this.currentFile = undefined;
      })
    }else{
      this.uploadService.upload(this.currentFile, 'item').subscribe((res: any) => {
        if(res.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * res.loaded / res.total);
        }else if (res instanceof HttpResponse){
          if(this.data.tipo == 'movie'){
            this.data.pelicula.imgURL = '/img/' + res.body + '.jpg';
          }else if(this.data.tipo == 'serie'){
            this.data.serie.imgURL = '/img/' + res.body + '.jpg';
          }else if(this.data.tipo == 'trailer'){
            this.data.trailer.imgUrl = '/img/' + res.body + '.jpg';
          }
          this.buttonOK = true;
        }
      },
      (err: any) => {
        console.log(err);
        this.progress = 0;
        this.currentFile = undefined;
      })
    }
  }

  cambio(event: any){
    console.log(event)
  }

  createPersona(action: string){
    this.dialogOpen = this.dialogPersona.open(DialogCreatePersonaComponent,{
      data:{
        action: action,
        persona: {
          id: 0,
          name: '',
          imgUrl: ''
        }
      }  
    })
    this.dialogOpen.afterClosed().subscribe((res: any) => {
      console.log('Cerrado', res);
      if(res != undefined){
        this.personas.push(res);
      }
    });
  }

 }
