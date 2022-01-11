import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.scss']
})
export class BarraLateralComponent implements OnInit {

  destacados = ['uno', 'dos','tres'];
  trailers = ['tuno', 'tdos','ttres'];
  
  constructor() { }

  ngOnInit(): void {
  }

}
