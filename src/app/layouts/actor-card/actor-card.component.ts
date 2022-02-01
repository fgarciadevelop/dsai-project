import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.scss']
})
export class ActorCardComponent implements OnInit {

  @Input() actor: any;
  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.actor == undefined){
      this.toastr.clear();
      this.toastr.error('Hubo un problema en la conexión con el servidor.', 'Error al cargar los datos del actor');
    }
  }

}
