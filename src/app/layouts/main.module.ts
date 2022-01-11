import { NgModule } from "@angular/core";
import { GlobalModule } from "../shared/global.module";
import { CoreComponent } from "./core/core.component";
import { HomeComponent } from "./home/home.component";
import { MainRoutingModule } from "./main-routing.module";
import { SerieComponent } from './serie/serie.component';
import { MovieComponent } from './movie/movie.component';

@NgModule({
    declarations: [
        CoreComponent,
        HomeComponent,
        SerieComponent,
        MovieComponent,
    ],
    imports: [
        GlobalModule,
        MainRoutingModule,
    ],
    exports: [
    ]
})
export class MainModule { }