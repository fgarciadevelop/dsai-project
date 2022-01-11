import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}
