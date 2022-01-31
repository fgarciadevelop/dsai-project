import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonaModel } from 'src/app/api-connect/models/persona.model';
import { ExtraService } from 'src/app/api-connect/services/extra.service';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import { PersonasService } from 'src/app/api-connect/services/personas.service';
import { SeriesService } from 'src/app/api-connect/services/series.service';
import { UploadService } from 'src/app/api-connect/services/upload.service';
import { DialogFormCreateComponent, DialogFormCreate } from '../dialog-form-create/dialog-form-create.component';

export interface DialogFormCreatePersona{

  action: string,
  persona: PersonaModel,

}

@Component({
  selector: 'app-dialog-create-persona',
  templateUrl: './dialog-create-persona.component.html',
  styleUrls: ['./dialog-create-persona.component.scss']
})
export class DialogCreatePersonaComponent implements OnInit {

  public currentFile?: File;
  public progress: number = 0;
  public message: string = '';
  public buttonOK: boolean = false;

  public loading: boolean = true;

  public imagen!: File;
  public fileName: string = '';

  public dataForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogFormCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogFormCreatePersona,
    private personasService: PersonasService,
    private uploadService: UploadService,
    private router: Router,
    private fb: FormBuilder,
    private extraService: ExtraService,
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.loadForm();

  }

  public loadForm(){

    this.dataForm = this.fb.group({
      name: new FormControl(this.data.persona.name, [Validators.required]),
    });
    if(this.data.action == 'editar'){
      if(this.dataForm.status == 'VALID'){
        this.buttonOK = true;
      }
    }
    this.loading = false;
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
    this.uploadService.upload(this.currentFile, 'persona').subscribe((res: any) => {
      if(res.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * res.loaded / res.total);
      }else if (res instanceof HttpResponse){
        this.data.persona.imgURL = '/img/' + res.body + '.jpg';
        this.buttonOK = true;
      }
    },
    (err: any) => {
      console.log(err);
      this.progress = 0;
      this.currentFile = undefined;
    })
  }

  public guardarForm(){
    let dataPersona: PersonaModel = {
      id: undefined,
      name: this.dataForm.controls['name'].value,
      imgURL: this.data.persona.imgURL
    };
    console.log(dataPersona);
    this.personasService.create(dataPersona).subscribe((res) => {
      console.log(res);
      this.dialogRef.close(res);
    })
  }

  public cancelar(){
    console.log(this.dialogRef);
    this.dialogRef.close();
  }
  
}
