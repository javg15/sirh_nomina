import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { FormControl, FormGroup } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Percepcionesadeudos, Personal, Catquincena, Cattiposadeudos} from '../../../../_models';
import { PercepcionesadeudosService } from '../services/percepcionesadeudos.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { CatpercepcionesService } from '../../../catalogos/catpercepciones/services/catpercepciones.service';
import { CattiposadeudosService } from '../../../catalogos/cattiposadeudos/services/cattiposadeudos.service';
import { Archivos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-percepcionesadeudos-form',
  templateUrl: './percepcionesadeudos-form.component.html',
  styleUrls: ['./percepcionesadeudos-form.component.css']
})

export class PercepcionesadeudosFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  

  nombreModulo = 'Percepcionesadeudos';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  usuario:any=this.tokenStorage.getUser();

  private elementModal: any;

  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild('basicModalPercepcionesadeudos') basicModalPercepcionesadeudos: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record:Percepcionesadeudos;
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
  cattiposadeudosCat:Cattiposadeudos[];
  catquincenaactiva:Catquincena;
  quincenasCat:any[]=[];
  
  record_id_personal:number;
  record_quincena_activa:Catquincena;
  record_quincenasadeudadas:number=1;
  record_restarquincenas:number=0;
 
  keywordSearch = 'full_name';
  isLoadingSearch: boolean;
  record_personal:any;
  editarDias:boolean=true;
  formQuincenas = new FormGroup({});
  fieldsQuincenas=[];

  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(
    private tokenStorage: TokenStorageService,
    private isLoadingService: IsLoadingService,
    private percepcionesadeudosService: PercepcionesadeudosService,
    private personalSvc: PersonalService,
    private catquincenaSvc: CatquincenaService,
    private cattiposadeudosSvc:CattiposadeudosService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;
    
    this.catquincenaSvc.getCatalogo().subscribe(resp => {
      this.catquincenaCat = resp;
    });
    this.catquincenaSvc.getQuincenaActiva().subscribe(resp => {
      this.catquincenaactiva = resp;
    });
    this.cattiposadeudosSvc.getCatalogo().subscribe(resp => {
      this.cattiposadeudosCat = resp;
    });
  }

  newRecord(): Percepcionesadeudos {
    return {
      id: 0, id_personal: 0, id_cattiposadeudos: 0, id_catquincena_aplicacion: 0, dias: 0,
    id_catquincena_ini: 0, id_catquincena_fin: 0, 
      state: '', created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0
    };
  }

  newRecordQuincena():any{
    return {
      id:0,quincena:"",dias:0
    }
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
    modal.percepcionesadeudosService.add(modal);

    //loading
    this.userFormIsPending = this.isLoadingService.isLoading$({ key: 'loading' });
    /*this.formQuincenas.valueChanges.subscribe((value) =>
    console.log('Value change:', this.formQuincenas.controls)
  );*/
}

/**
 * Actualiza el array de controles de quincenas
 */
refreshFields() {
  this.fieldsQuincenas=[];
  let nameFields=Object.getOwnPropertyNames(this.formQuincenas.controls);

  nameFields.forEach((item)=>{
    this.fieldsQuincenas.push({
      name: item
      ,value: this.formQuincenas.controls[item].value
      ,id: this.quincenasCat.find(a=>a.quincena == item).id
    })
  })
 // console.log("this.formQuincenas.controls=>",this.fieldsQuincenas)
}


  /**
   * Actualiza el array de controles de quincenas
   */
  
  addField(quincena,valor) {
    const name = `${quincena}`;
    this.formQuincenas.addControl(name, new FormControl(''));
    this.formQuincenas.controls[name].setValue(valor);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.percepcionesadeudosService.remove(this.id); //idModal
    this.elementModal.remove();
  }


  async submitAction(admin) {
    
    if (this.actionForm.toUpperCase() !== "VER") {

      this.validSummary.resetErrorMessages(admin);
    
      if(this.record_quincenasadeudadas<=0){
        this.validSummary.generateErrorMessagesFromServer({ Quincenas_adeudadas: "Ingrese la cantidad de quincenas adeudadas" });
      }
      else{
        //actualizar valores
        this.refreshFields();

        await this.isLoadingService.add(
          this.percepcionesadeudosService.setRecord(this.record, this.actionForm,this.fieldsQuincenas).subscribe(async resp => {
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
  }

  // open modal
  open(idItem: string, accion: string): void {
    
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
    this.tituloForm =  "Captura de adeudos - " 
        + titulosModal[accion] 
        + " registro";

    //limpiar autocomplete
    this.record_personal="";
    if(this.id_personal){ this.id_personal.clear();this.id_personal.close();}

    if (idItem == "0") {
      this.record = this.newRecord();
      this.record.id_catquincena_aplicacion=this.catquincenaactiva.id;
      this.onChangeQuincenasAdeudadas(1);
  
    } else {
      
      this.percepcionesadeudosService.getRecord(idItem).subscribe(async resp => {
        this.record = resp;

        this.personalSvc.getRecord(this.record.id_personal).subscribe(resp => {
          if(resp!=null){
            this.record_personal =resp.numeemp + " - "
              +  resp.nombre + " " + resp.apellidopaterno
              + " " + resp.apellidomaterno + " - " + resp.curp;

            if(this.id_personal){
              this.id_personal.initialValue = this.record_personal;
              this.id_personal.searchInput.nativeElement.value = this.record_personal;
              this.record.id_personal=resp.id;
            }
          }
        })
      });
     }

    this.basicModalPercepcionesadeudos.show();
  }

  // close modal
  close(): void {
    this.basicModalPercepcionesadeudos.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit(null);
    }
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }

  onChangeQuincenasAdeudadas(value){
    this.Recalcular()
  }

  onChangeQuincenasRestar(value){
    this.Recalcular()
  }

  onChangeTipoAdeudo(value){
    this.editarDias=(this.cattiposadeudosCat.find(item=>item.id==value).condias==1);
    this.Recalcular();
  }

  Recalcular(){
    let quincena_ini=this.record.id_catquincena_aplicacion-3
      - (this.record_restarquincenas*3)
    let quincena_fin=quincena_ini - ((this.record_quincenasadeudadas-1)*3);
    
    this.record.id_catquincena_ini=quincena_fin;
    this.record.id_catquincena_fin=quincena_ini;

    //remover controles
    this.fieldsQuincenas.forEach((item) => {
      this.formQuincenas.removeControl(item.name)
    });
    
    this.quincenasCat=[];

    //agregar controles
    this.catquincenaCat.forEach ((item) => {
      if(item.id>=quincena_fin && item.id<=quincena_ini){
        let newItem=this.newRecordQuincena();
        newItem.id=item.id;
        newItem.quincena=parseInt(item.anio + "" + item.quincena.toString().padStart(2,"0"));
        newItem.dias=15;

        this.quincenasCat.push(newItem);
        this.addField(newItem.quincena,newItem.dias)
      }
    });
    this.refreshFields();
  }

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
    let items=val["full_name"].split(" -- ");
    this.record.id_personal=parseInt(items[2]);
  }
}
