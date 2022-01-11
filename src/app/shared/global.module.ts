import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports:[
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
    ],
    declarations: [
      HeaderComponent,
      MenuComponent,
      BarraLateralComponent,
      FooterComponent
    ],
    exports: [
      HeaderComponent,
      MenuComponent,
      BarraLateralComponent,
      FooterComponent,
      HttpClientModule,
      CommonModule,
      MatCardModule,
      MatButtonModule,
    ]
})
export class GlobalModule { }