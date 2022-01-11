import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConnectService } from './api-connect.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends ApiConnectService{

  protected baseURL = this.URL + 'peliculas';

  constructor(
    private http: HttpClient,
  ) { 
    super();
  }

  public getAll(){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders };
    return this.http.get(`${this.baseURL}`, httpOptions);
  }

  public getNovedades(){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders };
    return this.http.get(`${this.baseURL}/novedades`, httpOptions);
  }

  public get(index: String){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders };
    return this.http.get(`${this.baseURL}/${index}`, httpOptions);
  }

}
