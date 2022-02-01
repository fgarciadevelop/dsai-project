import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/api-connect/models/user.model';
import { AuthService } from 'src/app/api-connect/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  public seePass: boolean = false;
  public userName: string = '';
  public userData!: UserModel;
  public permiso: string = '';
  public loading: boolean = false;
  public repeatPassword: string = '';

  public dataForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { 
    this.loading = true;
    if(!this.auth.isAuthenticated()){
      this.router.navigateByUrl('home');
    }else{
      this.userName = this.auth.getLoggedUser();
      this.auth.getUserFromId().then((res: any) => {
        res.subscribe((res2: any) =>{
          console.log(res2)
          this.userData = res2;
          if(this.userData.rol != 0){
            this.permiso = 'Administrador';
          }else{
            this.permiso = 'Usuario';
          }
          this.loadForm();
        })
      },(err) => {
        this.toastr.clear();
      this.toastr.error('Se produjo un error en el servidor.', 'Error al cargar los datos' );
      })
    }
  }

  ngOnInit(): void {
  }

  public logout(){
    this.auth.logout();
  }

  loadForm(){

    this.dataForm = this.fb.group({
      userName: new FormControl(this.userData.userName, [Validators.required]),
      email: new FormControl(this.userData.email, [Validators.required, Validators.email]),
      password: new FormControl(this.userData.password, [Validators.required]),
      repeatPassword: new FormControl(this.repeatPassword, [Validators.required])
    });
    this.loading = false;

  }

  public changeVisibility(){
    this.seePass = !this.seePass;
  }

}
