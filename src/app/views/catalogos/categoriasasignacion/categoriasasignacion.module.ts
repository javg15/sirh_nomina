import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CategoriasasignacionRoutingModule } from './categoriasasignacion-routing.module';
import { CategoriasasignacionService } from './categorias/services/categoriasasignacion.service';
import { CategoriasasignacionAdminComponent } from './categorias/admin/categoriasasignacion-admin.component';
import { CategoriasasignacionFormComponent } from './categorias/form/categoriasasignacion-form.component';
import { CategoriasasignacionsubFormComponent } from './categorias/formasignacion/formasignacion-form.component';

import { CategoriasasignacionpercService } from './percepciones/services/categoriasasignacionperc.service';
import { CategoriasasignacionpercAdminComponent } from './percepciones/admin/categoriasasignacionperc-admin.component';
import { CategoriasasignacionpercFormComponent } from './percepciones/form/categoriasasignacionperc-form.component';
import { CategoriasasignacionpercsubFormComponent } from './percepciones/formasignacion/formasignacionperc-form.component';

import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    CommonModule,
    CategoriasasignacionRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgSelect2Module,
    SharedModule
  ],
  declarations: [
    CategoriasasignacionAdminComponent,
    CategoriasasignacionFormComponent,
    CategoriasasignacionsubFormComponent,
    CategoriasasignacionpercAdminComponent,
    CategoriasasignacionpercFormComponent,
    CategoriasasignacionpercsubFormComponent,
  ],
  providers: [
    CategoriasasignacionService,
    CategoriasasignacionpercService
  ]
})
export class CategoriasasignacionModule { }
