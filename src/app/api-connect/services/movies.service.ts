import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConnectService } from './api-connect.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends ApiConnectService{

  constructor(
    private http: HttpClient,
  ) { 
    super();
  }

  public getAllMovies(){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders };
    return this.http.get(`${this.URL}peliculas`, httpOptions);
  }

  public getNovedadesMovies(){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders };
    return this.http.get(`${this.URL}peliculas/novedades`, httpOptions);
  }

  public getMovie(index: String){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders };
    return this.http.get(`${this.URL}peliculas/${index}`, httpOptions);
  }

}
