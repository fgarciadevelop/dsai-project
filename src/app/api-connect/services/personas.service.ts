import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonaModel } from '../models/persona.model';
import { ApiConnectService } from './api-connect.service';

@Injectable({
  providedIn: 'root'
})
export class PersonasService extends ApiConnectService{

  protected baseURL = this.URL + 'personas';

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

  public create(persona: PersonaModel){
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders};
    return this.http.post(`${this.baseURL}`, persona, httpOptions);
  }
}
