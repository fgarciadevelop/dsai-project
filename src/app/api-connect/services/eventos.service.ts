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

  public loggedSubject: Subject<boolean> = new Subject<boolean>();
  public loggedObservable$: Observable<boolean> = this.loggedSubject.asObservable();

  constructor() { }

  setLateralChange(change: string){
    this.lateralChangeSubject.next(change);
  }

  getLateralChange(){
    return this.lateralChangeObservable$;
  }

  setLogged(logged: boolean){
    this.loggedSubject.next(logged);
  }

  getLogged(){
    return this.loggedObservable$;
  }

}
