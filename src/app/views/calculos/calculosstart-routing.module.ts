import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetroactivosAdminComponent } from './retroactivos/admin/retroactivos-admin.component';
import { RetroactivosIniService } from './retroactivos/services/retroactivos.ini.service';
import { RetroactivosFormComponent } from './retroactivos/form/retroactivos-form.component';

import { OrdinariosAdminComponent } from './ordinarios/admin/ordinarios-admin.component';
import { OrdinariosIniService } from './ordinarios/services/ordinarios.ini.service';
import { OrdinariosFormComponent } from './ordinarios/form/ordinarios-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Calculos'
    },
    children: [
      {
        path: 'retroactivos',
        redirectTo: 'retroactivos/admin'
      },
      {
        path: 'retroactivos/admin',
        component: RetroactivosAdminComponent,
        data: {
          title: 'Retroactivos'
        },
        resolve: {
          userdata: RetroactivosIniService,
        }
      },
      {
        path: 'form',
        component: RetroactivosFormComponent,
        data: {
          title: 'Retroactivos'
        },
        
      },
      
      {
        path: 'ordinarios',
        redirectTo: 'ordinarios/admin'
      },
      {
        path: 'ordinarios/admin',
        component: OrdinariosAdminComponent,
        data: {
          title: 'Ordinarios'
        },
        resolve: {
          userdata: OrdinariosIniService,
        }
      },
      {
        path: 'ordinarios/form',
        component: OrdinariosFormComponent,
        data: {
          title: 'Ordinarios'
        },
        
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculosStartRoutingModule { }
