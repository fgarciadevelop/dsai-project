import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { ApiConnectService } from './api-connect.service';
import jwt_decode from 'jwt-decode';
import { EventosService } from './eventos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiConnectService{

  private token: any = '';
  protected baseURL = this.URL + 'usuarios';

  constructor(
    private http: HttpClient,
    private router: Router,
    private eventosService: EventosService,
  ) { 
    super();
  }

  public login(user: UserModel){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders };
    return this.http.post(`${this.baseURL}/login`, user, httpOptions);
  }

  public registro(user: UserModel){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders };
    return this.http.post(`${this.baseURL}/registro`, user, httpOptions);
  }

  public isAuthenticated(){
    if(this.readToken()){
      return this.isTokenExpired();
    }else{
      return false;
    }
  }

  public saveToken(token: string): void{
    this.token = token;
    localStorage.setItem('token', token);
  }

  public readToken(){
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')!;
      return true;
    } else {
      this.token = '';
      return false;
    }
  }

  public getLoggedUser(){
    if(this.readToken()){
      this.token = jwt_decode(this.token);
      console.log(this.token);
      //this.eventosService.setLogged(true);
      return this.token['sub'];
    }else{
      return 'Inicia sesión';
    }
  }

  public getUserFromId(){
    this.readToken();
    return new Promise((resolve, reject) => {
      if(this.token != null && this.token != ''){
        let tokenDecoded: any = jwt_decode(this.token);
        let id = tokenDecoded['id'];
        this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
        const httpOptions = { headers: this.httpHeaders };
        resolve(this.http.get(`${this.baseURL}/${id}`, httpOptions));
      }else{
        reject(undefined);
      }
    });
    
  }

  public isTokenExpired(): boolean{
    return true;
  }

  public logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }

  public getRolFromToken(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.token = jwt_decode(this.token);
      return this.token['rol'];
    }else{
      return 0;
    }
  }

}
