import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SerieModel } from '../models/serie.model';
import { ApiConnectService } from './api-connect.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService extends ApiConnectService{

  protected baseURL = this.URL + 'series';
  
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

  public create(serie: SerieModel){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders};
    return this.http.post(`${this.baseURL}`, serie, httpOptions);
  }

}
