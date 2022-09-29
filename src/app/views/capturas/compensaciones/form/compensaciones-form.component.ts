import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Compensaciones, Personal, Catquincena}    from '../../../../_models';
import { CompensacionesService } from '../services/compensaciones.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { Archivos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-compensaciones-form',
  templateUrl: './compensaciones-form.component.html',
  styleUrls: ['./compensaciones-form.component.css']
})

export class CompensacionesFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Compensaciones';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  usuario:any=this.tokenStorage.getUser();

  private elementModal: any;

  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild('basicModalCompensaciones') basicModalCompensaciones: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record:Compensaciones={
    id: 0, id_personal: 0, numero: "", fecha: null, anio: '', id_catcompensacionesestatus: 0,
    id_catcompensacionestipos: 0, id_catfondopresupuestal: 0, 
    id_catquincena_ini: 0, id_catquincena_fin: 0, observaciones: '',  
    id_catquincena_aplicacion: 0, id_plazas: 0, clavecobro: '',  
    ignorarempparapasivos: 0, ignorarreciboparadecanual: 0,   
    fecharealpago: null, compensacionesustitucion: 0, recibotimbrado: 0, aniopasivos: '',  
    pagatercero: 0, id_personal_beneficiario: 0, definirperiododiferente:0,
    state: '', created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0
  };
  recordpersonal: Personal = {
      id: 0,curp: '', rfc: '',  homoclave: '',
      state: '', nombre: '', apellidopaterno: '', apellidomaterno:'',id_catestadocivil:0,
      fechanacimiento: null, id_catestadosnaci: 0, id_catmunicipiosnaci: 0, id_catlocalidadesnaci: 0,
      id_archivos_avatar:0,id_usuarios_sistema:0,numeemp:'',
      telefono: '', email: '', emailoficial:'',observaciones:'',sexo:0,
      id_catestadosresi: 0, id_catmunicipiosresi: 0, id_catlocalidadesresi: 0,
      domicilio:'',colonia:'',cp:'',telefonomovil:'',numimss:'',numissste:'',otronombre:'', numotro:'',tipopension:'',
      created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0,fechaingreso:null,primaantiguedad:0,
      id_catbanco_deposito:0,cuentadeposito:'',formacobro:0,
  };
 
  catquincenaCat: Catquincena[];
  catpersonalCat:Personal[];
  catquincenaactiva:Catquincena;
  
  record_id_personal:number;
  record_quincena_activa:Catquincena;
  record_definirperiodo:number=0;
 
  keywordSearch = 'full_name';
  isLoadingSearch: boolean;
  record_personal:any;

  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(
    private tokenStorage: TokenStorageService,
    private isLoadingService: IsLoadingService,
    private compensacionesService: CompensacionesService,
    private personalSvc: PersonalService,
    private catquincenaSvc: CatquincenaService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;
    
    this.catquincenaSvc.getCatalogoMayorActiva().subscribe(resp => {
      this.catquincenaCat = resp;
    });
    
    this.catquincenaSvc.getQuincenaActiva().subscribe(resp => {
      this.catquincenaactiva = resp;
    });
    
  }

  newRecord(): Compensaciones {
    return {
      id: 0, id_personal: 0, numero: "Por definir", fecha: null, anio: '', id_catcompensacionesestatus: 3,
      id_catcompensacionestipos: 0, id_catfondopresupuestal: 0, 
      id_catquincena_ini: 0, id_catquincena_fin: 0, observaciones: '',  
      id_catquincena_aplicacion: 0, id_plazas: 0, clavecobro: '',  
      ignorarempparapasivos: 0, ignorarreciboparadecanual: 0,   
      fecharealpago: null, compensacionesustitucion: 0, recibotimbrado: 0, aniopasivos: '',  
      pagatercero: 0, id_personal_beneficiario: 0, definirperiododiferente:0,
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
    modal.compensacionesService.add(modal);

    //loading
    this.userFormIsPending = this.isLoadingService.isLoading$({ key: 'loading' });

    //quincena activa
    //this.record_quincena_activa = this.route.snapshot.data.dataHoraAsignacion;
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.compensacionesService.remove(this.id); //idModal
    this.elementModal.remove();
  }


  async submitAction(admin) {

    if (this.actionForm.toUpperCase() !== "VER") {

      this.validSummary.resetErrorMessages(admin);

      await this.isLoadingService.add(
        this.compensacionesService.setRecord(this.record, this.actionForm).subscribe(async resp => {
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
    this.tituloForm =  "Captura de compensaciones - " 
        + titulosModal[accion] 
        + " registro";

    //limpiar autocomplete
    this.record_personal="";
    if(this.id_personal){ this.id_personal.clear();this.id_personal.close();}

    if (idItem == "0") {
      this.record = this.newRecord();
      this.record.id_catquincena_aplicacion=this.catquincenaactiva.id;
    } else {
      
      this.compensacionesService.getRecord(idItem).subscribe(async resp => {
        this.record = resp;

        this.personalSvc.getRecord(this.record.id_personal).subscribe(resp => {
          if(resp!=null){
            this.record_personal =resp.numeemp + " - "
              +  resp.nombre + " " + resp.apellidopaterno
              + " " + resp.apellidomaterno + " - " + resp.curp;

            if(this.id_personal){
              //this.id_personal.initialValue = this.record_personal;
              this.id_personal.searchInput.nativeElement.value = this.record_personal;
              this.record.id_personal=resp.id;
            }
          }
        });
      });
      
    }

    this.basicModalCompensaciones.show();
  }

  // close modal
  close(): void {
    this.basicModalCompensaciones.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit(null);
    }
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }

  

  /*********************
   autocomplete id_personal
   *********************/
   onChangeSearchIdPersonal(val: string) {
    this.isLoadingSearch = true;
    this.personalSvc.getCatalogoSegunBusqueda(val).subscribe(resp => {
      this.catpersonalCat = resp;
      this.isLoadingSearch = false;
    });
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onSelectIdPersonal(val: any) {
    console.log("val=>",val)
    let items=val["full_name"].split(" -- ");
    this.record.id_personal=parseInt(items[2]);
  }

 
   onChangeSearchIdPersonalBeneficiario(val: string) {
    this.isLoadingSearch = true;
    this.personalSvc.getCatalogoSegunBusqueda(val).subscribe(resp => {
      this.catpersonalCat = resp;
      this.isLoadingSearch = false;
    });
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onSelectIdPersonalBeneficiario(val: any) {
    let items=val["full_name"].split(" -- ");
    this.record.id_personal_beneficiario=parseInt(items[2]);
  }
}
