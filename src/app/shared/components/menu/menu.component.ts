import { ClassGetter, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { UserModel } from 'src/app/api-connect/models/user.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';
import jwt_decode from 'jwt-decode';
import { EventosService } from 'src/app/api-connect/services/eventos.service';
import { AuthService } from 'src/app/api-connect/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private userLoggedToken: string = '';
  public userLoggedName: string = 'Inicia sesión';
  public userLogged: boolean = false;

  constructor(
    private eventService: EventosService,
    private auth: AuthService,
    private router: Router,
  ) { 
    this.userLoggedName = this.auth.getLoggedUser();
    this.userLoggedName == 'Inicia sesión' ? this.userLogged = false : this.userLogged = true;
    this.eventService.getLogged().subscribe((res) => {
      this.userLoggedName = this.auth.getLoggedUser();
      this.userLogged = res;
    })
  }
  
  ngOnInit(): void {
  }

  public action(){
    if(!this.userLogged){
      this.router.navigateByUrl('inicia-sesion');
    }else{
      console.log('Ya estás logged');
    }
  }

}
