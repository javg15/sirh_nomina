import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatvariablesbaseRoutingModule } from './catvariablesbase-routing.module';
import { CatvariablesbaseService } from './services/catvariablesbase.service';
import { CatvariablesbaseAdminComponent } from './admin/catvariablesbase-admin.component';
import { CatvariablesbaseFormComponent } from './form/catvariablesbase-form.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    CatvariablesbaseRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    NgSelect2Module,
    AutocompleteLibModule,
  ],
  declarations: [
    CatvariablesbaseAdminComponent,
    CatvariablesbaseFormComponent
  ],
  providers: [
    CatvariablesbaseService
  ]
})
export class CatvariablesbaseModule { }
