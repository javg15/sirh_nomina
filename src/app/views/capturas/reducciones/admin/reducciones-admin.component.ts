import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ReduccionesService } from '../services/reducciones.service';
import { Reducciones,  Personal,Catquincena } from '../../../../_models';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { environment } from '../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-reducciones-admin',
  templateUrl: './reducciones-admin.component.html',
  styleUrls: ['./reducciones-admin.component.css']
})


export class ReduccionesAdminComponent implements OnInit {
  @Input() dtOptions: DataTables.Settings = {};
  usuario:any=this.tokenStorage.getUser();
  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  @ViewChild('reporteModal') reporteModal: ModalDirective;

  Members: any[];
  ColumnNames: string[];

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  private dtOptionsAdicional = {
    datosBusqueda: {campo: 0, operador: 0, valor: ''},
    raw:0
  };

  nombreModulo = 'Reducciones';

  record:Reducciones={
    id: 0, id_personal: 0, porcentaje: 0,
    id_catquincena_ini: 0, id_catquincena_fin: 0,
      state: '', created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0
  };
  catquincenaCat:Catquincena[];
  catpersonalCat:Personal[];
  keywordSearch = 'full_name';
  esInicio:boolean=true;
  isLoadingSearch:boolean;
  headersAdmin: any;
  
  tipoReporte:number;

  /* En el constructor creamos el objeto reduccionesService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(
    private tokenStorage: TokenStorageService,
    private reduccionesService: ReduccionesService, private route: ActivatedRoute,
    private catquincenaSvc: CatquincenaService,
    private personalSvc: PersonalService,
    private _sanitizer: DomSanitizer
  ) {
    this.catquincenaSvc.getCatalogo().subscribe(resp => {
      this.catquincenaCat = resp;
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

          this.reduccionesService.http
            .post<DataTablesResponse>(
              // this.API_URL + '/a6b_apis/read_records_dt.php',
              this.API_URL + '/reducciones/getAdmin',
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
    this.reduccionesService.open(id, accion, idItem);
  }

  closeModal(id: string) {
    this.reduccionesService.close(id);
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
      if (datosBusqueda != null) {
        this.dtOptionsAdicional.datosBusqueda = datosBusqueda;
        // Destruimos la tabla
        dtInstance.destroy();
        // dtTrigger la reconstruye
        this.dtTrigger.next();
      }
      else {
        dtInstance.clear().draw(false); // viene de form, solo actualiza la vista actual (current page)
      }
    });
  }

  //Call this method in the image source, it will sanitize it.
  transform(image) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + image);
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
    this.record.id_personal=0;
  }

  onSelectIdPersonal(val: any) {
    let items=val["full_name"].split(" -- ");
    this.record.id_personal=parseInt(items[2]);
  }
}
