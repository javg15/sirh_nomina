import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Categoriasasignacion,Catquincena,Catzonaeconomica,Catpercepciones,Catdeducciones  } from '../../../../../_models';
import { CategoriasasignacionsubService } from '../services/categoriasasignacionsub.service';
import { CatzonaeconomicaService } from '../../../catzonaeconomica/services/catzonaeconomica.service';
import { CatquincenaService } from '../../../catquincena/services/catquincena.service';
import { CatdeduccionesService } from '../../../catdeducciones/services/catdeducciones.service';
import { CatpercepcionesService } from '../../../catpercepciones/services/catpercepciones.service';
import { ActivatedRoute } from '@angular/router';

import { ValidationSummaryComponent } from '../../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../../_services/is-loading/is-loading.service';
import { environment } from '../../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-formasignacion-form',
  templateUrl: './formasignacion-form.component.html',
  styleUrls: ['./formasignacion-form.component.css']
})

export class CategoriasasignacionsubFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() dtOptions: DataTables.Settings = {};
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Input() varEditarHorPla: string = "H";
  @Output() redrawEvent = new EventEmitter<any>();

  API_URL = environment.APIS_URL;
  nombreModulo = 'Categoriasasignacionsub';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  successModalTimeOut: null | ReturnType<typeof setTimeout> = null;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Categoriasasignacion;
  catquincenaCat:Catquincena[];
  catzonaeconomicaCat:Catzonaeconomica[];
  catpercepcionesCat:Catpercepciones[];
  catdeduccionesCat:Catdeducciones[];
  catmovimientosCat:any[];
  record_codigo:String;
  nombre_percdeduc:string;

  public customPatterns = { '0': { pattern: new RegExp('\[0-9a-zA-Z\\u00C0-\\u00FF \]')} };

  constructor(private isLoadingService: IsLoadingService,
    private el: ElementRef,
    private categoriasasignacionsubService:CategoriasasignacionsubService,
    private catzonaeconomicaSvc: CatzonaeconomicaService,
    private catquincenaSvc: CatquincenaService,
    private catdeduccionesSvc: CatdeduccionesService,
    private catpercepcionesSvc: CatpercepcionesService,
    
    private route: ActivatedRoute
      ) {
      this.elementModal = el.nativeElement;
      this.catzonaeconomicaSvc.getCatalogo().subscribe(resp => {
        this.catzonaeconomicaCat = resp;
      });
      this.catquincenaSvc.getCatalogo().subscribe(resp => {
        this.catquincenaCat = resp;
      });
      this.catpercepcionesSvc.getCatalogo().subscribe(resp => {
        this.catpercepcionesCat = resp;
      });
      this.catdeduccionesSvc.getCatalogo().subscribe(resp => {
        this.catdeduccionesCat = resp;
      });
  }

  newRecord(idParent:number,tipo:string): Categoriasasignacion {
    return {
      id: 0,  id_categorias:idParent, id_catpercdeduc:0,tipopercdeduc:tipo,id_personal:0,
      id_catzonaeconomica: 0, id_catquincena_ini: 0, id_catquincena_fin:0,
      state: '',  created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0,
    };
  }

  ngOnInit(): void {

      this.record =this.newRecord(0,'');

      let modal = this;

      // ensure id attribute exists
      if (!modal.id) {//idModal {
          console.error('modal must have an id');
          return;
      }
      // add self (this modal instance) to the modal service so it's accessible from controllers
      modal.categoriasasignacionsubService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.categoriasasignacionsubService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.categoriasasignacionsubService.setRecord(this.record,this.actionForm,"C").subscribe(resp => {
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
  open(idItem: string, accion: string,idParent:number, tipo:string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    if(tipo=='P'){
      this.nombre_percdeduc="Percepción";
      this.catmovimientosCat=this.catpercepcionesCat;
    }
    else{
      this.nombre_percdeduc="Deducción";
      this.catmovimientosCat=this.catdeduccionesCat;
    }

    this.tituloForm="Asignación de " + this.nombre_percdeduc + " " + titulosModal[accion] + " registro";
    if(idItem=="0"){
      this.record =this.newRecord(idParent,tipo);
    } else {
      console.log("catmovimientosCat=>",this.catmovimientosCat)
      this.categoriasasignacionsubService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
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

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }

  

}
