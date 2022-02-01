import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DestacadoModel } from 'src/app/api-connect/models/destacado.model';

@Component({
  selector: 'app-destacado-card',
  templateUrl: './destacado-card.component.html',
  styleUrls: ['./destacado-card.component.scss']
})
export class DestacadoCardComponent implements OnInit {

  public baseURL = "http://localhost:8080";  
  @Input() destacado!: DestacadoModel;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  viewElement(element: DestacadoModel){
    this.router.navigateByUrl(`${element.type}/${element.id}`).then(() => {
      window.location.reload();
    });
  }
  
}
