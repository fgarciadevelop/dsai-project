import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { SerieModel } from '../models/serie.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  public lateralChangeSubject: Subject<string> = new Subject<string>();
  public lateralChangeObservable$: Observable<string> = this.lateralChangeSubject.asObservable();

  constructor() { }

  setLateralChange(change: string){
    this.lateralChangeSubject.next(change);
  }

  getLateralChange(){
    return this.lateralChangeObservable$;
  }

}
