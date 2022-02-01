import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrailerModel } from '../models/trailer.model';
import { ApiConnectService } from './api-connect.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialService extends ApiConnectService{

  constructor(
    private http: HttpClient,
  ) { 
    super();
  }

  public getTrailers(){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders };
    return this.http.get(`${this.URL}trailers`, httpOptions);
  }

  public getDestacados(){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders };
    return this.http.get(`${this.URL}destacados`, httpOptions);
  }

  public createTrailer(trailer: TrailerModel){
    console.log(trailer);
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders};
    return this.http.post(`${this.URL}trailers`, trailer, httpOptions);
  }

  public editTrailer(trailer: any){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders};
    return this.http.put(`${this.URL}`, trailer, httpOptions);
  }

}
