import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CatvariablesbaseService } from '../services/catvariablesbase.service';
import { DatabaseService } from '../../../../_services/database.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catvariablesbase } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-catvariablesbase-form',
  templateUrl: './catvariablesbase-form.component.html',
  styleUrls: ['./catvariablesbase-form.component.css']
})

export class CatvariablesbaseFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  successModalTimeOut: null | ReturnType<typeof setTimeout> = null;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Catvariablesbase;
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;

  tablasCat:any[];
  esquemasCat:any[];
  camposCat:any[];
  funcionesCat:any[];
  record_esquema:number;
  record_tipoelemento:string;
  esTabla:boolean=false;
  esFuncion:boolean=false;

  constructor(private isLoadingService: IsLoadingService,
      private catvariablesbaseService: CatvariablesbaseService, private el: ElementRef,
      private databaseSvc: DatabaseService,
      ) {
        this.elementModal = el.nativeElement;
        this.databaseSvc.getEsquemas().subscribe(resp => {
          this.esquemasCat = resp;
        });
  }

  newRecord(): Catvariablesbase {
    return {
      id: 0,nombre: '',    state: '', descripcion:'',
      tabla: '', campo: '', funcion: '',
      created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0,
      
    };
  }
  ngOnInit(): void {

      this.record =this.newRecord();

      let modal = this;

      // ensure id attribute exists
      if (!modal.id) {//idModal {
          console.error('modal must have an id');
          return;
      }
      // add self (this modal instance) to the modal service so it's accessible from controllers
      modal.catvariablesbaseService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.catvariablesbaseService.remove(this.id); //idModal
      this.elementModal.remove();
  }

  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      

      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.catvariablesbaseService.setRecord(this.record,this.record_tipoelemento,this.actionForm).subscribe(resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;
          this.successModal.show();
          
          this.successModalTimeOut=setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
        }
      }),{ key: 'loading' });
    }
  }

 


  // open de este form
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Variables base - " +titulosModal[accion] + " registro";


    if(idItem=="0"){
      this.record =this.newRecord();
    } else {
      
      this.catvariablesbaseService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
        if(this.record.campo!=""){
          this.esTabla=true;this.esFuncion=false;
        }
        else{
          this.esTabla=false;this.esFuncion=true;
        }
      });

  }

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

  onSelectEsquema(){
    this.esFuncion=false;this.esTabla=false;
    this.record_tipoelemento='';
    this.record.tabla='';this.record.campo='';this.record.funcion='';
  }

  onSelectTipoElemento(tipoelemento) {
    if(tipoelemento=="tabla"){
      this.esFuncion=false;this.esTabla=true;
      this.record.funcion='';
      this.databaseSvc.getTablas(this.record_esquema).subscribe(resp => {
        this.tablasCat = resp;
      });
    }
    if(tipoelemento=="funcion"){
      this.esFuncion=true;this.esTabla=false;
      this.record.tabla='';this.record.campo='';
      this.databaseSvc.getFunciones(this.record_esquema).subscribe(resp => {
        this.funcionesCat = resp;
      });
    }
  }

  onSelectTabla(tabla) {
    this.databaseSvc.getCampos(this.record_esquema,tabla).subscribe(resp => {
      this.camposCat = resp;
    });
  }

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }
}
