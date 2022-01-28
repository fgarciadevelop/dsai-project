import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';
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

  public create(movie: MovieModel){
    console.log(movie)
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: this.httpHeaders};
    return this.http.post(`${this.baseURL}`, movie, httpOptions);
  }

  public getNextMovie(){
    return new Promise((resolve, reject) => {
      let position = '000';
      this.getAll().subscribe(async (res: any) => {
        let arrayNumber: string[] = [];
        res.forEach((movie: any) => {
          arrayNumber.push(movie.id);
        });

        let i = 1;
        let nextPosition = '00' + i;
        for(let pos of arrayNumber){
          if(pos == nextPosition && arrayNumber.length == i){
            i++;
            position = nextPosition.slice(0,2) + i.toString();
          }else if(pos == nextPosition){
            i++;
            nextPosition = nextPosition.slice(0,2) + i.toString();
          }else{
            position = nextPosition;
          }
        }
        resolve(position);
      })
    })
  }

}
