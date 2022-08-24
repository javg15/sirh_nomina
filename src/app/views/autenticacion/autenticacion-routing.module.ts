import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UsuariosFormdirectComponent } from './usuarios/formdirect/usuarios-formdirect.component';
import { UsuariosIniService } from './usuarios/services/usuarios.ini.service';


import { PermgruposIniService } from './permgrupos/services/permgrupos.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuarios'
    },
    children: [
      {
        path: 'usuarios',
        redirectTo: 'admin'
      },
      
     
      {
        path: 'formdirect',
        component: UsuariosFormdirectComponent,
        data: {
          title: 'Perfil de usuario'
        }
      },
      {
        path: 'permgrupos',
        redirectTo: 'adminpermgrupos'
      },
      
     

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule {}
