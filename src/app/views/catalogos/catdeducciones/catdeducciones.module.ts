import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatdeduccionesRoutingModule } from './catdeducciones-routing.module';
import { CatdeduccionesService } from './services/catdeducciones.service';
import { CatdeduccionesAdminComponent } from './admin/catdeducciones-admin.component';
import { CatdeduccionesFormComponent } from './form/catdeducciones-form.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    CatdeduccionesRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    CatdeduccionesAdminComponent,
    CatdeduccionesFormComponent
  ],
  providers: [
    CatdeduccionesService
  ]
})
export class CatdeduccionesModule { }
