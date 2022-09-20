import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PercepcionescapturaAdminComponent } from './percepcionescaptura/admin/percepcionescaptura-admin.component';
import { PercepcionescapturaIniService } from './percepcionescaptura/services/percepcionescaptura.ini.service';
import { PercepcionescapturaFormComponent } from './percepcionescaptura/form/percepcionescaptura-form.component';

import { DeduccionescapturaAdminComponent } from './deduccionescaptura/admin/deduccionescaptura-admin.component';
import { DeduccionescapturaIniService } from './deduccionescaptura/services/deduccionescaptura.ini.service';
import { DeduccionescapturaFormComponent } from './deduccionescaptura/form/deduccionescaptura-form.component';

import { PercepcionesadeudosAdminComponent } from './percepcionesadeudos/admin/percepcionesadeudos-admin.component';
import { PercepcionesadeudosIniService } from './percepcionesadeudos/services/percepcionesadeudos.ini.service';
import { PercepcionesadeudosFormComponent } from './percepcionesadeudos/form/percepcionesadeudos-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Capturas'
    },
    children: [
      {
        path: 'capturas/percepciones',
        redirectTo: 'percepciones/admin'
      },
      {
        path: 'percepciones/admin',
        component: PercepcionescapturaAdminComponent,
        data: {
          title: 'Percepciones'
        },
        resolve: {
          userdata: PercepcionescapturaIniService,
        }
      },
      {
        path: 'form',
        component: PercepcionescapturaFormComponent,
        data: {
          title: 'Percepciones'
        },
        
      },
      
      {
        path: 'capturas/deducciones',
        redirectTo: 'deducciones/admin'
      },
      {
        path: 'deducciones/admin',
        component: DeduccionescapturaAdminComponent,
        data: {
          title: 'Deducciones'
        },
        resolve: {
          userdata: DeduccionescapturaIniService,
        }
      },
      {
        path: 'form',
        component: DeduccionescapturaFormComponent,
        data: {
          title: 'Deducciones'
        },
        
      },

      {
        path: 'capturas/adeudos',
        redirectTo: 'adeudos/admin'
      },
      {
        path: 'adeudos/admin',
        component: PercepcionesadeudosAdminComponent,
        data: {
          title: 'Adeudos'
        },
        resolve: {
          userdata: PercepcionesadeudosIniService,
        }
      },
      {
        path: 'form',
        component: PercepcionesadeudosFormComponent,
        data: {
          title: 'Adeudos'
        },
        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturasStartRoutingModule { }
