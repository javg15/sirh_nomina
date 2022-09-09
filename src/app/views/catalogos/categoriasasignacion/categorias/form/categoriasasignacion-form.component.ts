import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CategoriasService } from '../../../categorias/services/categorias.service';
import { CategoriasasignacionService } from '../services/categoriasasignacion.service';
import { CategoriasasignacionsubService } from '../services/categoriasasignacionsub.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { Categoriasasignacion,Catpercepciones,Catdeducciones } from '../../../../../_models';
import { ValidationSummaryComponent } from '../../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../../_services/is-loading/is-loading.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-categoriasasignacion-form',
  templateUrl: './categoriasasignacion-form.component.html',
  styleUrls: ['./categoriasasignacion-form.component.css']
})

export class CategoriasasignacionFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  //Percepciones
  @Input() dtOptionsP: DataTables.Settings = {};
  
  MembersP: any[];
  ColumnNamesP: string[];
  private dataTablesParametersP={
    draw: 1,  length: 100 , opcionesAdicionales: {},
    search: {value: "", regex: false},
    start: 0
  };
  private dtOptionsAdicionalP = { datosBusqueda: {campo: 0, operador: 0, valor: ''}
    ,raw:0
    ,fkey:'id_categorias,tipopercdeduc'
    ,fkeyvalue:[0,'P']
    ,modo:22
  };
  NumberOfMembersP = 0;
  headersAdminP: any;

  //Deducciones
  @Input() dtOptionsD: DataTables.Settings = {};
  MembersD: any[];
  ColumnNamesD: string[];
  private dataTablesParametersD={
    draw: 1,  length: 100 , opcionesAdicionales: {},
    search: {value: "", regex: false},
    start: 0
  };
  private dtOptionsAdicionalD = { datosBusqueda: {campo: 0, operador: 0, valor: ''}
    ,raw:0
    ,fkey:'id_categorias,tipopercdeduc'
    ,fkeyvalue:[0,'D']
    ,modo:22
  };
  NumberOfMembersD = 0;
  headersAdminD: any;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record_catpercepciones:number;
  record_catdeducciones:number;
  catdeduccionesCat:Catdeducciones[];
  catpercepcionesCat:Catpercepciones[];
  id_categoria:number;

  //se usa en el html
  optionsSelect: any={multiple: true, closeOnSelect: false, width: '300'};

  constructor(private isLoadingService: IsLoadingService,
      private categoriasasignacionService: CategoriasasignacionService, private el: ElementRef,
      private categoriasasignacionsubSvc: CategoriasasignacionsubService,
      private categoriasSvc: CategoriasService,
      private route: ActivatedRoute
      ) {
      this.elementModal = el.nativeElement;
      
  }

  
  ngOnInit(): void {

      
      let modal = this;

      // ensure id attribute exists
      if (!modal.id) {//idModal {
          console.error('modal must have an id');
          return;
      }
    
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.categoriasasignacionService.add(modal);

    //subtabla Percepciones
    this.headersAdminP = JSON.parse(this.route.snapshot.data.userdataPercsub.cabeceras); // get data from resolver
    
    this.dtOptionsP = {
      pagingType: 'full_numbers',
      paging:false,
      //pageLength: 50,
      //serverSide: true,
      //processing: true,
      ordering:false,
      destroy : true,
      searching : false,
      info: false,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        },
      },
      columns: this.headersAdminP,
      columnDefs:[{"visible": false, "targets": 0}, //state
                {"width": "5%", "targets": 1}]
    };

    //subtabla Deducciones
    this.headersAdminD = JSON.parse(this.route.snapshot.data.userdataDeducsub.cabeceras); // get data from resolver
    
    this.dtOptionsD = {
      pagingType: 'full_numbers',
      paging:false,
      //pageLength: 50,
      //serverSide: true,
      //processing: true,
      ordering:false,
      destroy : true,
      searching : false,
      info: false,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        },
      },
      columns: this.headersAdminD,
      columnDefs:[{"visible": false, "targets": 0}, //state
                {"width": "5%", "targets": 1}]
    };

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.categoriasasignacionService.remove(this.id); //idModal
      this.elementModal.remove();
  }

  async submitAction(form) {
     this.close();
  }

  // open de este form
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];

    this.categoriasSvc.getRecord(idItem).subscribe(resp => {
      this.tituloForm="Asignación en " + resp.denominacion + " - " +titulosModal[accion] + " registro";
    });

    

    this.id_categoria=parseInt(idItem)

    this.reDraw();

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModal.show();
  }

  // close modal
  close(): void {
      this.basicModal.hide();
      if(this.actionForm.toUpperCase()!="VER"){
        this.redrawEvent.emit(null);
      }
  }

  //Sub formulario
  openModal(id: string, accion: string, idItem: number,idParent:number,tipo:string) {
    this.categoriasasignacionsubSvc.open(id, accion, idItem, idParent, tipo);
  }

  closeModal(id: string) {
    this.categoriasasignacionsubSvc.close(id);
  }

  reDraw(): void {

    //Percepciones
    this.dtOptionsAdicionalP.raw++;

    this.dtOptionsAdicionalP.fkeyvalue=[this.id_categoria,'P'];
    this.dataTablesParametersP.opcionesAdicionales = this.dtOptionsAdicionalP;

    this.categoriasasignacionService.getAdminSub(this.dataTablesParametersP).subscribe(resp => {

        this.ColumnNamesP = resp.columnNames;
        this.MembersP = resp.data;
        this.NumberOfMembersP = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblCategoriasasignacionsub').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembersP > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
    );

    //Deducciones
    this.dtOptionsAdicionalD.raw++;

    this.dtOptionsAdicionalD.fkeyvalue=[this.id_categoria,'D'];
    this.dataTablesParametersD.opcionesAdicionales = this.dtOptionsAdicionalD;

    this.categoriasasignacionService.getAdminSub(this.dataTablesParametersD).subscribe(resp => {

        this.ColumnNamesD = resp.columnNames;
        this.MembersD = resp.data;
        this.NumberOfMembersD = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblCategoriasasignacionsub').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembersD > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
    );
  }
}
