import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConnectService } from './api-connect.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends ApiConnectService{

  protected baseURL = this.URL + 'files';

  constructor(
    private http: HttpClient,
  ) { 
    super();
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseURL}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

}
