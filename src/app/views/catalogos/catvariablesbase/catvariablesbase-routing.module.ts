import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatvariablesbaseAdminComponent } from './admin/catvariablesbase-admin.component';
import { CatvariablesbaseFormComponent } from './form/catvariablesbase-form.component';
import { CatvariablesbaseIniService } from './services/catvariablesbase.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Variables base'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CatvariablesbaseAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: CatvariablesbaseIniService
        }
      },
      {
        path: 'form',
        component: CatvariablesbaseFormComponent,
        data: {
          title: 'Variables base'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatvariablesbaseRoutingModule {}
