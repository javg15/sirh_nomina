import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../_shared/shared.module';

import { CapturasStartRoutingModule } from './capturasstart-routing.module';

import { PercepcionescapturaAdminComponent } from './percepcionescaptura/admin/percepcionescaptura-admin.component';
import { PercepcionescapturaFormComponent } from './percepcionescaptura/form/percepcionescaptura-form.component';
import { DeduccionescapturaAdminComponent } from './deduccionescaptura/admin/deduccionescaptura-admin.component';
import { DeduccionescapturaFormComponent } from './deduccionescaptura/form/deduccionescaptura-form.component';
import { PercepcionesadeudosAdminComponent } from './percepcionesadeudos/admin/percepcionesadeudos-admin.component';
import { PercepcionesadeudosFormComponent } from './percepcionesadeudos/form/percepcionesadeudos-form.component';
import { DeduccionesdevolucionesAdminComponent } from './deduccionesdevoluciones/admin/deduccionesdevoluciones-admin.component';
import { DeduccionesdevolucionesFormComponent } from './deduccionesdevoluciones/form/deduccionesdevoluciones-form.component';
import { ReduccionesAdminComponent } from './reducciones/admin/reducciones-admin.component';
import { ReduccionesFormComponent } from './reducciones/form/reducciones-form.component';

import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';

import { NgxMaskModule, IConfig } from 'ngx-mask'

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

import { ReplacePipe } from '../../_services/replace-pipe';

import { DatePipe } from '@angular/common'

@NgModule({
  imports: [
    CommonModule,
    //PersonalRoutingModule,
    CapturasStartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
    TabsModule.forRoot(),
    NgSelect2Module,
    BsDropdownModule.forRoot(),
    AutocompleteLibModule,
    SharedModule,
  ],
  declarations: [
    PercepcionescapturaAdminComponent,
    PercepcionescapturaFormComponent,
    DeduccionescapturaAdminComponent,
    DeduccionescapturaFormComponent,
    PercepcionesadeudosAdminComponent,
    PercepcionesadeudosFormComponent,
    DeduccionesdevolucionesAdminComponent,
    DeduccionesdevolucionesFormComponent,
    ReduccionesAdminComponent,
    ReduccionesFormComponent,
    ReplacePipe
  ],
  providers: [
    //PersonalService
    DatePipe
  ],
  exports: [
    PercepcionescapturaAdminComponent,
    PercepcionescapturaFormComponent,
    DeduccionescapturaAdminComponent,
    DeduccionescapturaFormComponent,
    PercepcionesadeudosAdminComponent,
    PercepcionesadeudosFormComponent,
    DeduccionesdevolucionesAdminComponent,
    DeduccionesdevolucionesFormComponent,
    ReduccionesAdminComponent,
    ReduccionesFormComponent,
  ]
})
export class CapturasStartModule { }
