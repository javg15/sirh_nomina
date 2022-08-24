import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CatplantelesIniService } from './services/catplanteles.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Planteles'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
 
      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatplantelesRoutingModule {}
