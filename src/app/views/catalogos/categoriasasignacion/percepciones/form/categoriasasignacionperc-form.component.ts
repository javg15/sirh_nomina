import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CatpercepcionesService } from '../../../catpercepciones/services/catpercepciones.service';
import { CatdeduccionesService } from '../../../catdeducciones/services/catdeducciones.service';
import { CategoriasasignacionpercService } from '../../percepciones/services/categoriasasignacionperc.service';
import { CategoriasasignacionpercsubService } from '../../percepciones/services/categoriasasignacionpercsub.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { Categoriasasignacion,Categorias } from '../../../../../_models';
import { ValidationSummaryComponent } from '../../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../../_services/is-loading/is-loading.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-categoriasasignacionperc-form',
  templateUrl: './categoriasasignacionperc-form.component.html',
  styleUrls: ['./categoriasasignacionperc-form.component.css']
})

export class CategoriasasignacionpercFormComponent implements OnInit, OnDestroy {
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
  @Input() dtOptions: DataTables.Settings = {};
  
  Members: any[];
  ColumnNames: string[];
  private dataTablesParameters={
    draw: 1,  length: 100 , opcionesAdicionales: {},
    search: {value: "", regex: false},
    start: 0
  };
  private dtOptionsAdicional = { datosBusqueda: {campo: 0, operador: 0, valor: ''}
    ,raw:0
    ,fkey:'id_catpercdeduc,tipopercdeduc'
    ,fkeyvalue:[0,'P']
    ,modo:22
    ,tipopercdeduc:'P'
  };
  NumberOfMembers = 0;
  headersAdmin: any;

  
  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record_categorias:number;
  categoriasCat:Categorias[];
  record_id_catpercdeduc:number;
  record_tipopercdeduc:string;

  //se usa en el html
  optionsSelect: any={multiple: true, closeOnSelect: false, width: '300'};

  constructor(private isLoadingService: IsLoadingService,
      private categoriasasignacionpercService: CategoriasasignacionpercService, private el: ElementRef,
      private categoriasasignacionpercsubSvc: CategoriasasignacionpercsubService,
      private catpercepcionesSvc: CatpercepcionesService,
      private catdeduccionesSvc: CatdeduccionesService,
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
    modal.categoriasasignacionpercService.add(modal);

    //subtabla Categorias
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdataCate.cabeceras); // get data from resolver
    
    this.dtOptions = {
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
      columns: this.headersAdmin,
      columnDefs:[{"visible": false, "targets": 0}, //state
                {"width": "5%", "targets": 1}]
    };

    
      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.categoriasasignacionpercService.remove(this.id); //idModal
      this.elementModal.remove();
  }

  async submitAction(form) {
     this.close();
  }

  // open de este form
  open(idItem: string, accion: string,_tipopercdeduc:string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.record_tipopercdeduc=_tipopercdeduc;
    this.record_id_catpercdeduc=parseInt(idItem);
    this.dtOptionsAdicional.tipopercdeduc=_tipopercdeduc;
    
    if(_tipopercdeduc=='P')
      this.catpercepcionesSvc.getRecord(idItem).subscribe(resp => {
        this.tituloForm="Asignación en " + resp.clave + ' - ' + resp.nombre + " - " +titulosModal[accion] + " registro";
      });
    else
      this.catdeduccionesSvc.getRecord(idItem).subscribe(resp => {
        this.tituloForm="Asignación en " + resp.clave + ' - ' + resp.nombre + " - " +titulosModal[accion] + " registro";
      });

    

    this.record_id_catpercdeduc=parseInt(idItem)

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
    this.categoriasasignacionpercsubSvc.open(id, accion, idItem, idParent, tipo);
  }

  closeModal(id: string) {
    this.categoriasasignacionpercsubSvc.close(id);
  }

  reDraw(): void {

    //Percepciones
    this.dtOptionsAdicional.raw++;

    this.dtOptionsAdicional.fkeyvalue=[this.record_id_catpercdeduc,this.dtOptionsAdicional.tipopercdeduc];
    this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

    this.categoriasasignacionpercService.getAdminSub(this.dataTablesParameters).subscribe(resp => {

        this.ColumnNames = resp.columnNames;
        this.Members = resp.data;
        this.NumberOfMembers = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblCategoriasasignacionpercsub').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembers > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
    );
  }
}
