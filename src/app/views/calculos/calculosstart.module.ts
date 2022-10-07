import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../_shared/shared.module';

import { CalculosStartRoutingModule } from './calculosstart-routing.module';

import { RetroactivosAdminComponent } from './retroactivos/admin/retroactivos-admin.component';
import { RetroactivosFormComponent } from './retroactivos/form/retroactivos-form.component';

import { OrdinariosAdminComponent } from './ordinarios/admin/ordinarios-admin.component';
import { OrdinariosFormComponent } from './ordinarios/form/ordinarios-form.component';

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
    CalculosStartRoutingModule,
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
    RetroactivosAdminComponent,
    RetroactivosFormComponent,

    OrdinariosAdminComponent,
    OrdinariosFormComponent,
    
    ReplacePipe
  ],
  providers: [
    DatePipe
  ],
  exports: [
    RetroactivosAdminComponent,
    RetroactivosFormComponent,
    
    OrdinariosAdminComponent,
    OrdinariosFormComponent,
  ]
})
export class CalculosStartModule { }
