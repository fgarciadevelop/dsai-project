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
import { DialogFormCreateComponent } from './components/dialog-form-create/dialog-form-create.component';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { SwiperModule } from 'swiper/angular';
import {MatSelectModule} from '@angular/material/select';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
    imports:[
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        SwiperModule,
        PerfectScrollbarModule,
        MatSelectModule,
    ],
    declarations: [
      HeaderComponent,
      MenuComponent,
      BarraLateralComponent,
      FooterComponent,
      DialogFormCreateComponent,
      SpinnerComponent,
    ],
    exports: [
      DialogFormCreateComponent,
      HeaderComponent,
      MenuComponent,
      BarraLateralComponent,
      FooterComponent,
      HttpClientModule,
      SpinnerComponent,
      CommonModule,
      MatCardModule,
      MatButtonModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      SwiperModule,
      PerfectScrollbarModule,
      MatSelectModule,
    ],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class GlobalModule { }