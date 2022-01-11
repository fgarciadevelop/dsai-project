import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieModel } from 'src/app/api-connect/models/movie.model';
import { MoviesService } from 'src/app/api-connect/services/movies.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    
  ) { }

  ngOnInit(): void {

  }

}
