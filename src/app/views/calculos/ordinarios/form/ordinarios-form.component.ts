import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Calculoprincipal} from '../../../../_models';
import { OrdinariosService } from '../services/ordinarios.service';
import { PlazasService } from '../../../plazas/plazas/services/plazas.service';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
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
  record_numeemp: string;
  editarQuincenaFinal:boolean=true;
  tblNombramientos: [];

  suma_percepciones:number=0;
  suma_deducciones:number=0;
  suma_total:number=0;
  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(
    private tokenStorage: TokenStorageService,
    private isLoadingService: IsLoadingService,
    private ordinariosSvc: OrdinariosService,
    private plazasSvc: PlazasService,
    private personalSvc: PersonalService,
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
      this.suma_percepciones=resp.map(a => a.impop).reduce((acumulado, importe) => parseFloat(acumulado) + 0 + parseFloat(importe));
      this.suma_deducciones=resp.map(a => a.impod).reduce((acumulado, importe) => parseFloat(acumulado) + 0 + parseFloat(importe));
      this.suma_total=this.suma_percepciones - this.suma_deducciones;
    });

    this.ordinariosSvc.getRecord(idItem).subscribe(resp => {
      this.record=resp;

      this.plazasSvc.getNombramientosVigentes(this.record.id_personal, 0).subscribe(resp => {
        this.tblNombramientos = resp;
      });

      this.personalSvc.getRecord(this.record.id_personal).subscribe(resp => {
        this.record_numeemp = resp.numeemp;
        this.tituloForm = "Estudios - " + resp.numeemp + " - " + (resp.apellidopaterno + " " + resp.apellidomaterno + " " + resp.nombre);
      })
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

  moneda(dato):string{
    var formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    
    return formatter.format(dato);
  }
}
