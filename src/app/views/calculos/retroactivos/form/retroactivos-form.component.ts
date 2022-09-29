import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Retroactivos, Personal, Catquincena, Catpercepciones} from '../../../../_models';
import { RetroactivosService } from '../services/retroactivos.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { CatpercepcionesService } from '../../../catalogos/catpercepciones/services/catpercepciones.service';
import { Archivos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-retroactivos-form',
  templateUrl: './retroactivos-form.component.html',
  styleUrls: ['./retroactivos-form.component.css']
})

export class RetroactivosFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Retroactivos';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  usuario:any=this.tokenStorage.getUser();

  private elementModal: any;

  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild('basicModalRetroactivos') basicModalRetroactivos: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record:Retroactivos;
 
  catquincenaCat: Catquincena[];
  catpercepcionesCat: Catpercepciones[];
  catpersonalCat:Personal[];
  
  record_id_personal:number;
  record_id_quincena:number;
  record_quincena_activa:Catquincena;
 
  keywordSearch = 'full_name';
  isLoadingSearch: boolean;
  record_personal:any;
  editarQuincenaFinal:boolean=true;

  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(
    private tokenStorage: TokenStorageService,
    private isLoadingService: IsLoadingService,
    private retroactivosService: RetroactivosService,
    private personalSvc: PersonalService,
    private catquincenaSvc: CatquincenaService,
    private catpercepcionesSvc:CatpercepcionesService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;
    this.catpercepcionesSvc.getCatalogo().subscribe(resp => {
      this.catpercepcionesCat = resp;
    });
    this.catquincenaSvc.getCatalogoMayorActiva().subscribe(resp => {
      this.catquincenaCat = resp;
    });
  }

  newRecord(): Retroactivos {
    return {
      id: 0, id_catpercepciones: 0, id_catzonaeconomica: 0, id_cattipocategoria: 0,
      calificadorempleado: '', id_catquincena_aplicacion: 0, id_catquincena_ini: 0,
      id_catquincena_fin: 0, porcentaje: 0, importe: 0, incluirenpago: '',
      state: '', created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0
    };
  }
  ngOnInit(): void {

    this.record = this.newRecord();

    let modal = this;

    // ensure id attribute exists
    if (!modal.id) {//idModal {
      console.error('modal must have an id');
      return;
    }
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.retroactivosService.add(modal);

    //loading
    this.userFormIsPending = this.isLoadingService.isLoading$({ key: 'loading' });

    //quincena activa
    //this.record_quincena_activa = this.route.snapshot.data.dataHoraAsignacion;
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.retroactivosService.remove(this.id); //idModal
    this.elementModal.remove();
  }


  async submitAction(admin) {

    if (this.actionForm.toUpperCase() !== "VER") {

      this.validSummary.resetErrorMessages(admin);

      await this.isLoadingService.add(
        this.retroactivosService.setRecord(this.record, this.actionForm).subscribe(async resp => {
          if (resp.hasOwnProperty('error')) {
            this.validSummary.generateErrorMessagesFromServer(resp.message);
          }
          else if (resp.message == "success") {
            if (this.actionForm.toUpperCase() == "NUEVO") this.actionForm = "editar";
            this.record.id = resp.id;

            this.successModal.show();
            setTimeout(() => { this.successModal.hide(); this.close();}, 2000)
          }
        }), { key: 'loading' });
      
    }
  }

  // open modal
  open(idItem: string, accion: string): void {
    
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
    this.tituloForm =  "Captura de percepciones - " 
        + titulosModal[accion] 
        + " registro";

    //limpiar autocomplete
    this.record_personal="";
    if(this.id_personal){ this.id_personal.clear();this.id_personal.close();}

    if (idItem == "0") {
      this.record = this.newRecord();
    } else {
      
      this.retroactivosService.getRecord(idItem).subscribe(async resp => {
        this.record = resp;
      });
      
    }


    this.basicModalRetroactivos.show();
  }

  // close modal
  close(): void {
    this.basicModalRetroactivos.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit(null);
    }
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }


}
