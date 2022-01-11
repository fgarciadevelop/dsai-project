import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalModule } from './shared/global.module';

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./layouts/main.module').then(m => m.MainModule)
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home'},
];
  
@NgModule({
    imports: [
        GlobalModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }