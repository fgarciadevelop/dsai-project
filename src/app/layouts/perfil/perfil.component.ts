import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/api-connect/models/user.model';
import { AuthService } from 'src/app/api-connect/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  public userName: string = '';
  public userData!: UserModel;
  public permiso: string = '';
  public loading: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { 
    this.loading = true;
    if(!this.auth.isAuthenticated()){
      this.router.navigateByUrl('home');
    }else{
      document.getElementById('passwordText')
      this.userName = this.auth.getLoggedUser();
      this.auth.getUserFromId().then((res: any) => {
        console.log(res);
        res.subscribe((res2: any) =>{
          console.log(res2)
          this.userData = res2;
          if(this.userData.rol != 0){
            this.permiso = 'Administrador';
          }else{
            this.permiso = 'Usuario';
          }
          this.loading = false;
        })
      })
    }
  }

  ngOnInit(): void {
  }

  public logout(){
    this.auth.logout();
  }

}
