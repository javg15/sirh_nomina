import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatplantelesRoutingModule } from './catplanteles-routing.module';
import { CatplantelesService } from './services/catplanteles.service';

import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    CatplantelesRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [

  ],
  providers: [
    CatplantelesService
  ]
})
export class CatplantelesModule { }
