import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Categoriasasignacion,Catquincena,Catzonaeconomica,Categorias,Personal  } from '../../../../../_models';
import { CategoriasasignacionpercsubService } from '../services/categoriasasignacionpercsub.service';
import { CatzonaeconomicaService } from '../../../catzonaeconomica/services/catzonaeconomica.service';
import { CatquincenaService } from '../../../catquincena/services/catquincena.service';
import { CategoriasService } from '../../../categorias/services/categorias.service';
import { PersonalService } from '../../../personal/services/personal.service';

import { ActivatedRoute } from '@angular/router';

import { ValidationSummaryComponent } from '../../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../../_services/is-loading/is-loading.service';
import { environment } from '../../../../../../environments/environment';

import { AutocompleteComponent } from 'angular-ng-autocomplete';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-formasignacionperc-form',
  templateUrl: './formasignacionperc-form.component.html',
  styleUrls: ['./formasignacionperc-form.component.css']
})

export class CategoriasasignacionpercsubFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() dtOptions: DataTables.Settings = {};
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Input() varEditarHorPla: string = "H";
  @Output() redrawEvent = new EventEmitter<any>();

  API_URL = environment.APIS_URL;
  nombreModulo = 'Categoriasasignacionpercsub';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  successModalTimeOut: null | ReturnType<typeof setTimeout> = null;

  private elementModal: any;
  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Categoriasasignacion;
  catquincenaCat:Catquincena[];
  catzonaeconomicaCat:Catzonaeconomica[];
  categoriasCat:Categorias[];
  catmovimientosCat:any[];
  catpersonalCat:Personal[];
  record_tipomovimiento:String="C";
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;
  record_personal="";

  public customPatterns = { '0': { pattern: new RegExp('\[0-9a-zA-Z\\u00C0-\\u00FF \]')} };

  constructor(private isLoadingService: IsLoadingService,
    private el: ElementRef,
    private categoriasasignacionpercsubService:CategoriasasignacionpercsubService,
    private catzonaeconomicaSvc: CatzonaeconomicaService,
    private catquincenaSvc: CatquincenaService,
    private categoriasSvc: CategoriasService,
    private personalSvc:PersonalService,
    private route: ActivatedRoute
      ) {
      this.elementModal = el.nativeElement;
      this.catzonaeconomicaSvc.getCatalogo().subscribe(resp => {
        this.catzonaeconomicaCat = resp;
      });
      this.catquincenaSvc.getCatalogo().subscribe(resp => {
        this.catquincenaCat = resp;
      });
      this.categoriasSvc.getCatalogo().subscribe(resp => {
        this.categoriasCat = resp;
      });
  }

  newRecord(idParent:number,tipo:string): Categoriasasignacion {
    return {
      id: 0,  id_categorias:0, id_catpercdeduc:idParent,tipopercdeduc:tipo,id_personal:0,
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
      modal.categoriasasignacionpercsubService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.categoriasasignacionpercsubService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.categoriasasignacionpercsubService.setRecord(this.record,this.actionForm,this.record_tipomovimiento).subscribe(resp => {
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
    this.catmovimientosCat=this.categoriasCat;
    
    //limpiar autocomplete
    this.record_personal="";
    if(this.id_personal){ this.id_personal.clear();this.id_personal.close();}

    this.tituloForm="Asignación de Categoría " + titulosModal[accion] + " registro";
    if(idItem=="0"){
      this.record =this.newRecord(idParent,tipo);
    } else {
      this.categoriasasignacionpercsubService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
        if(this.record.id_categorias>0){
          this.record_tipomovimiento="C"
        }
        else{
          this.record_tipomovimiento="E";
          
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
          });
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

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }

  onSelectTipoMovimiento(value){
    this.record_tipomovimiento=value;
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
