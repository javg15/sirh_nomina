import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../_shared/shared.module';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { UsuariosService } from './usuarios/services/usuarios.service';

import { UsuariosFormdirectComponent } from './usuarios/formdirect/usuarios-formdirect.component';


import { PermgruposService } from './permgrupos/services/permgrupos.service';

import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TreeModule } from '@circlon/angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    TabsModule.forRoot(),
    AutocompleteLibModule,
    TreeModule,
    NgSelect2Module
  ],
  declarations: [

    UsuariosFormdirectComponent,

  ],
  providers: [
    UsuariosService,
    PermgruposService
  ],
  exports:[
  ]
})
export class AutenticacionModule { }
