import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatpercepcionesRoutingModule } from './catpercepciones-routing.module';
import { CatpercepcionesService } from './services/catpercepciones.service';
import { CatpercepcionesAdminComponent } from './admin/catpercepciones-admin.component';
import { CatpercepcionesFormComponent } from './form/catpercepciones-form.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    CatpercepcionesRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    CatpercepcionesAdminComponent,
    CatpercepcionesFormComponent
  ],
  providers: [
    CatpercepcionesService
  ]
})
export class CatpercepcionesModule { }
