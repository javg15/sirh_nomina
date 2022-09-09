import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasasignacionAdminComponent } from './categorias/admin/categoriasasignacion-admin.component';
import { CategoriasasignacionFormComponent } from './categorias/form/categoriasasignacion-form.component';
import { CategoriasasignacionIniService } from './categorias/services/categoriasasignacion.ini.service';
import { CategoriasasignacionsubIniService } from './categorias/services/categoriasasignacionsub.ini.service';

import { CategoriasasignacionpercAdminComponent } from './percepciones/admin/categoriasasignacionperc-admin.component';
import { CategoriasasignacionpercFormComponent } from './percepciones/form/categoriasasignacionperc-form.component';
import { CategoriasasignacionpercIniService } from './percepciones/services/categoriasasignacionperc.ini.service';
import { CategoriasasignacionpercsubIniService } from './percepciones/services/categoriasasignacionpercsub.ini.service';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Asignación en categorías'
    },
    children: [
      {
        path: 'categoria',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CategoriasasignacionAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: CategoriasasignacionIniService,
          userdataPercsub: CategoriasasignacionsubIniService,
          userdataDeducsub: CategoriasasignacionsubIniService
        }
      },
      {
        path: 'form',
        component: CategoriasasignacionFormComponent,
        data: {
          title: 'Percepciones'
        }
      }

      /**percepciones */
      ,{
        path: 'percepciones',
        component: CategoriasasignacionpercAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: CategoriasasignacionpercIniService,
          userdataCate: CategoriasasignacionpercsubIniService,
        }
      },
      {
        path: 'form',
        component: CategoriasasignacionpercFormComponent,
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
export class CategoriasasignacionRoutingModule {}
