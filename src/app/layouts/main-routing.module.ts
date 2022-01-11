import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GlobalModule } from "../shared/global.module";
import { CoreComponent } from "./core/core.component";
import { HomeComponent } from "./home/home.component";
import { MovieComponent } from "./movie/movie.component";

const routes: Routes = [

    {

      path: '', component: CoreComponent, children: [

        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home/:id', component: HomeComponent },
        { path: 'movies', component: MovieComponent },
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