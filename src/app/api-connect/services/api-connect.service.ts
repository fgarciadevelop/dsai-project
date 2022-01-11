import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectService {

  protected URL = 'http://localhost:8080/';
  protected httpHeaders: HttpHeaders;

  constructor() {
    this.httpHeaders = new HttpHeaders();
  }

}
