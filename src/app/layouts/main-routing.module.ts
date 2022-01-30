import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GlobalModule } from "../shared/global.module";
import { CoreComponent } from "./core/core.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MovieComponent } from "./movie/movie.component";
import { MoviesComponent } from "./movies/movies.component";
import { RegistroComponent } from "./registro/registro.component";
import { SerieComponent } from "./serie/serie.component";
import { SeriesComponent } from "./series/series.component";

const routes: Routes = [

    {

      path: '', component: CoreComponent, children: [

        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home/:id', component: HomeComponent },
        { path: 'peliculas', component: MoviesComponent },
        { path: 'peliculas/:id', component: MovieComponent },
        { path: 'series', component: SeriesComponent },
        { path: 'series/:id', component: SerieComponent },
        { path: 'inicia-sesion', component: LoginComponent },
        { path: 'registro', component: RegistroComponent },
        { path: '**', pathMatch: 'full', redirectTo: 'home/inicio'},

      ]

    }
    
  ];
  
  @NgModule({
    imports: [
      GlobalModule,
      RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
  })
  export class MainRoutingModule { }