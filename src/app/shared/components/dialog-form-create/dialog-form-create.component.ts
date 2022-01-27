import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonaModel } from 'src/app/api-connect/models/persona.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { PersonasService } from 'src/app/api-connect/services/personas.service';
import { SeriesService } from 'src/app/api-connect/services/series.service';

import { Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export interface DialogFormCreate{

  tipo: string;
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

  //Form data movie
  public get id(){ return this.dataForm.get('id') };
  public get title(){ return this.dataForm.get('title') };
  public get description(){ return this.dataForm.get('description') };
  public get year(){ return this.dataForm.get('year') };
  public get duration(){ return this.dataForm.get('duration') };

  //Form act movie
  //public get director(){ return this.actForm.get('director') };
  //public get cast(){ return this.actForm.get('cast') };
  
  //Form extra movie
  public get url(){ return this.extraForm.get('url') };
  public get imgURL(){ return this.extraForm.get('imgURL') };


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogFormCreate,
    private moviesService: MoviesService,
    private seriesService: SeriesService,
    private personasService: PersonasService,
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
        url: new FormControl(this.data.pelicula.url, [Validators.required]),
        imgURL: new FormControl(this.data.pelicula.imgURL, [Validators.required]),
      });

      this.loading = false;

    });

  }

  public guardarForm(){
    console.log("Form enviado");
    console.table(this.dataForm);

    let dataFromForm = {
      title: this.dataForm.get('title')?.value,
      description: this.dataForm.get('description')?.value,
      year: this.dataForm.get('year')?.value,
      duration: this.dataForm.get('duration')?.value,
      director: this.director.value,
      cast: this.cast.value,
      url: this.extraForm.get('url'),
      imgURL: this.extraForm.get('imgURL'),
      id: this.dataForm.get('id'),
    }
    console.log(dataFromForm);
  }

  public cancelar(){
    console.log("cancelado");
  }

}
