import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatdeduccionesAdminComponent } from './admin/catdeducciones-admin.component';
import { CatdeduccionesFormComponent } from './form/catdeducciones-form.component';
import { CatdeduccionesIniService } from './services/catdeducciones.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Percepciones'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CatdeduccionesAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: CatdeduccionesIniService
        }
      },
      {
        path: 'form',
        component: CatdeduccionesFormComponent,
        data: {
          title: 'Percepciones'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatdeduccionesRoutingModule {}
