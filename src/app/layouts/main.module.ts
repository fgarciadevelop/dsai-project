import { NgModule } from "@angular/core";
import { GlobalModule } from "../shared/global.module";
import { CoreComponent } from "./core/core.component";
import { HomeComponent } from "./home/home.component";
import { MainRoutingModule } from "./main-routing.module";
import { SerieComponent } from './serie/serie.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { SerieCardComponent } from "./serie-card/serie-card.component";
import { SeriesComponent } from "./series/series.component";
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ActorCardComponent } from './actor-card/actor-card.component';
import { TrailersComponent } from './trailers/trailers.component';

@NgModule({
    declarations: [
        CoreComponent,
        HomeComponent,
        SerieComponent,
        SerieCardComponent,
        SeriesComponent,
        MovieCardComponent,
        MoviesComponent,
        MovieComponent,
        LoginComponent,
        RegistroComponent,
        PerfilComponent,
        ActorCardComponent,
        TrailersComponent,
    ],
    imports: [
        GlobalModule,
        MainRoutingModule,
    ],
    exports: [
    ]
})
export class MainModule { }