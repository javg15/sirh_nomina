import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { OrdinariosService } from '../services/ordinarios.service';
import { Catquincena,Personal } from '../../../../_models';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { environment } from '../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-ordinarios-admin',
  templateUrl: './ordinarios-admin.component.html',
  styleUrls: ['./ordinarios-admin.component.css']
})


export class OrdinariosAdminComponent implements OnInit {
  @Input() dtOptions: DataTables.Settings = {};
  usuario:any=this.tokenStorage.getUser();
  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  Members: any[];
  ColumnNames: string[];

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  private dtOptionsAdicional = {
    datosBusqueda: {campo: 0, operador: 0, valor: ''},
    raw:0
    ,fkey:'id_catquincena'
    ,fkeyvalue:[0]
    ,modo:22
  };

  nombreModulo = 'Ordinarios';

  record_id_catquincena:number=0;
  record_id_personal:number=0;

  catquincenaCat:Catquincena[];
  catpersonalCat:Personal[];

  headersAdmin: any;

  keywordSearch = 'full_name';
  esInicio:boolean=true;
  isLoadingSearch:boolean;
  
  /* En el constructor creamos el objeto ordinariosService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(
    private tokenStorage: TokenStorageService,
    private ordinariosService: OrdinariosService, private route: ActivatedRoute,
    private catquincenaSvc: CatquincenaService,
    private personalSvc: PersonalService,
    private _sanitizer: DomSanitizer
  ) {
    this.catquincenaSvc.getCatalogoMenorActiva().subscribe(resp => {
      this.catquincenaCat = resp;
      this.record_id_catquincena=resp[0].id;
      this.esInicio=false; //si ya se cargó el catalogo, entonces, ya paso la carga inicial
    });

  }

  ngOnInit(): void {
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdata.cabeceras);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      displayStart: 0,
      serverSide: true,
      processing: true,
      //destroy : true,
      searching: false,
      info: true,
      
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
      // Use this attribute to enable the responsive extension
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {

        this.dtOptionsAdicional.raw++;
        dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

          this.ordinariosService.http
            .post<DataTablesResponse>(
              // this.API_URL + '/a6b_apis/read_records_dt.php',
              this.API_URL + '/calculoprincipal/getAdmin',
              dataTablesParameters, {}
            ).subscribe(resp => {

              this.ColumnNames = resp.columnNames;
              this.Members = resp.data;
              this.NumberOfMembers = resp.data.length;
              $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
              if (this.NumberOfMembers > 0) {
                $('.dataTables_empty').css('display', 'none');
              }
            }
          );
      },
      //order: [[ 3, "desc" ]],
      columns: this.headersAdmin,
      columnDefs: [{ "visible": false, "searchable": false, "targets": [0] }
        //, { "width": "5%", "targets": 1 }
      ]
    };

  }
  openModal(id: string, accion: string, idItem: number) {
    this.ordinariosService.open(id, accion, idItem);
  }

  closeModal(id: string) {
    this.ordinariosService.close(id);
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Hay que dessuscribirse del evento dtTrigger, para poder recrear la tabla.
    this.dtTrigger.unsubscribe();
  }

  reDraw(datosBusqueda: any = null): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if(datosBusqueda!=null){
        this.dtOptionsAdicional.datosBusqueda = datosBusqueda;
        // Destruimos la tabla
        dtInstance.destroy();
        // dtTrigger la reconstruye
        this.dtTrigger.next();
      }
      else{
        dtInstance.clear().draw(false); // viene de form, solo actualiza la vista actual (current page)
      }
    });
  }

  onSelectQuincena(select_quincena) {
    this.record_id_catquincena=select_quincena;
    if(select_quincena!=0)
      this.onClickBuscar();
  }

  onClickBuscar() {
    if(this.id_personal.query=="") this.record_id_personal=0;

    this.dtOptionsAdicional.fkeyvalue=[
      (this.record_id_catquincena==null?0:this.record_id_catquincena),
      this.record_id_personal,
    ];

    //si no es la carga inicial
    if(this.esInicio==false && !(this.dtOptionsAdicional.fkeyvalue[0]==0))
      {
        this.reDraw();
      }
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
  }

  onCleared(){
    this.record_id_personal=0;
    this.onClickBuscar();
  }

  onSelectIdPersonal(val: any) {
    let items=val["full_name"].split(" -- ");
    this.record_id_personal=parseInt(items[2]);
    if(this.record_id_personal!=0)
      this.onClickBuscar();
  }

    
}
