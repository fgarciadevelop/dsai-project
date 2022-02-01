import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrailerModel } from 'src/app/api-connect/models/trailer.model';
import { AuthService } from 'src/app/api-connect/services/auth.service';
import { EspecialService } from 'src/app/api-connect/services/especial.service';
import { DialogFormCreateComponent } from 'src/app/shared/components/dialog-form-create/dialog-form-create.component';

@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.scss']
})
export class TrailersComponent implements OnInit {

  public loading: boolean = false;
  public trailers: TrailerModel[] = [];
  public rol: boolean = false;
  public dialogOpen: any;

  constructor(
    private auth: AuthService,
    private especialService: EspecialService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    let rol = this.auth.getRolFromToken();
    rol != 0 ? this.rol = true : this.rol = false;
    this.especialService.getTrailers().subscribe((trailers: any) => {
      this.trailers = trailers;
      console.table(this.trailers);
      if(this.trailers != null){
        this.loading = false;
      }else{
        this.toastr.clear();
        this.toastr.error('Se produjo un error en el servidor.', 'Error al cargar los trailers' );
      }
    },(err)=>{
      this.toastr.clear();
      this.toastr.error('Se produjo un error en el servidor.', 'Error al cargar los trailers' );
    });
  }

  addTrailer(){
    this.dialogOpen = this.dialog.open(DialogFormCreateComponent,{
      data: {
        action: 'crear',
        dialog: this.dialogOpen,
        tipo: 'trailer',
        pelicula: {},
        serie: {},
        trailer: {}
      }

    })

    this.dialogOpen.afterClosed().subscribe(async (res: any) => {
      console.log('Cerrado', res);
      this.loading = true;
      if(res == undefined){
        this.toastr.clear();
        this.toastr.error('Se produjo un error con alguno de los datos introducidos.', 'Error al editar el trailer' );
        this.loading = false;
      }else if(res == 'cerrado'){
        this.toastr.clear();
        this.toastr.warning('Ha cerrado la edición sin guardar' );
        this.loading = false;
      }else{
        this.trailers.push(res);
        this.toastr.clear();
        this.toastr.success('Trailer creado correctamente' );
        await this.delay(1000);
        this.loading = false;
        this.router.navigateByUrl('/trailers');
      }
    });

  }

  delay(ms: number){
    return new Promise( resolve => {
      setTimeout(resolve, ms)
    });
  }

}
