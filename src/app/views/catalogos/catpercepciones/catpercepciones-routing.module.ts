import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatpercepcionesAdminComponent } from './admin/catpercepciones-admin.component';
import { CatpercepcionesFormComponent } from './form/catpercepciones-form.component';
import { CatpercepcionesIniService } from './services/catpercepciones.ini.service';

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
        component: CatpercepcionesAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: CatpercepcionesIniService
        }
      },
      {
        path: 'form',
        component: CatpercepcionesFormComponent,
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
export class CatpercepcionesRoutingModule {}
