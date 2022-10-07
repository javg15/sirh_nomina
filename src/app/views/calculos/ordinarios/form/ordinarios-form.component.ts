import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Calculoprincipal, Personal, Catquincena, Catpercepciones} from '../../../../_models';
import { OrdinariosService } from '../services/ordinarios.service';
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
  selector: 'app-ordinarios-form',
  templateUrl: './ordinarios-form.component.html',
  styleUrls: ['./ordinarios-form.component.css']
})

export class OrdinariosFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Ordinarios';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  usuario:any=this.tokenStorage.getUser();

  private elementModal: any;

  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild('basicModalOrdinarios') basicModalOrdinarios: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record:Calculoprincipal;
 
  registros:any[];
  
  keywordSearch = 'full_name';
  isLoadingSearch: boolean;
  record_personal:any;
  editarQuincenaFinal:boolean=true;

  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(
    private tokenStorage: TokenStorageService,
    private isLoadingService: IsLoadingService,
    private ordinariosSvc: OrdinariosService,
    private personalSvc: PersonalService,
    private catquincenaSvc: CatquincenaService,
    private catpercepcionesSvc:CatpercepcionesService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;
    
  }

 
  newRecord(): Calculoprincipal {
    return {
      id: 0,  id_catquincena: 0, id_personal: 0, id_plantillasdocsnombramiento: 0, id_plazas: 0,
      id_catestatusplaza: 0, id_personalhoras: 0, horaslaboradas: 0,id_cattiponomina: 0,
      id_catquincena_aplicacion: 0, retroactivo: 0,diaspago: 0, diasantiguedad: 0, esplazabase: 0,
      esvigente: 0,  state: '', created_at: new Date(),  id_usuarios_r: 0
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
    modal.ordinariosSvc.add(modal);

    //loading
    this.userFormIsPending = this.isLoadingService.isLoading$({ key: 'loading' });

    //quincena activa
    //this.record_quincena_activa = this.route.snapshot.data.dataHoraAsignacion;
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.ordinariosSvc.remove(this.id); //idModal
    this.elementModal.remove();
  }
  // open modal
  open(idItem: string, accion: string): void {
    
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
    this.tituloForm =  "Cálculo de nómina ORDINARIA - " 
        + titulosModal[accion];

    this.ordinariosSvc.getCalculado(idItem).subscribe(resp => {
      this.registros=resp;
    });
    this.basicModalOrdinarios.show();
  }

  // close modal
  close(): void {
    this.basicModalOrdinarios.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit(null);
    }
  }
}
