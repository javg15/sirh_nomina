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

import { DeduccionesdevolucionesAdminComponent } from './deduccionesdevoluciones/admin/deduccionesdevoluciones-admin.component';
import { DeduccionesdevolucionesIniService } from './deduccionesdevoluciones/services/deduccionesdevoluciones.ini.service';
import { DeduccionesdevolucionesFormComponent } from './deduccionesdevoluciones/form/deduccionesdevoluciones-form.component';

import { ReduccionesAdminComponent } from './reducciones/admin/reducciones-admin.component';
import { ReduccionesIniService } from './reducciones/services/reducciones.ini.service';
import { ReduccionesFormComponent } from './reducciones/form/reducciones-form.component';

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

      {
        path: 'capturas/devoluciones',
        redirectTo: 'devoluciones/admin'
      },
      {
        path: 'devoluciones/admin',
        component: DeduccionesdevolucionesAdminComponent,
        data: {
          title: 'Devoluciones'
        },
        resolve: {
          userdata: DeduccionesdevolucionesIniService,
        }
      },
      {
        path: 'form',
        component: DeduccionesdevolucionesFormComponent,
        data: {
          title: 'Devoluciones'
        },
        
      },
      
      {
        path: 'capturas/reducciones',
        redirectTo: 'reducciones/admin'
      },
      {
        path: 'reducciones/admin',
        component: ReduccionesAdminComponent,
        data: {
          title: 'Reducciones'
        },
        resolve: {
          userdata: ReduccionesIniService,
        }
      },
      {
        path: 'form',
        component: ReduccionesFormComponent,
        data: {
          title: 'Reducciones'
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
