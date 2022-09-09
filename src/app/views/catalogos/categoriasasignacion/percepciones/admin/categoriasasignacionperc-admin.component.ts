import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { CategoriasasignacionpercService } from '../services/categoriasasignacionperc.service';

import { environment } from '../../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-categoriasasignacionperc-admin',
  templateUrl: './categoriasasignacionperc-admin.component.html',

})


export class CategoriasasignacionpercAdminComponent implements OnInit {
  @Input() dtOptions: DataTables.Settings = {};
  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  Members: any[];
  ColumnNames: string[];

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  private dtOptionsAdicional = { 
      datosBusqueda: {campo: 0, operador: 0, valor: ''}
    ,raw:0
    ,tipopercdeduc:'P'
  };

  nombreModulo = 'Categoriasasignacionperc';
  headersAdmin: any;

  record_tipopercdeduc:string='P';

  /* En el constructor creamos el objeto categoriasasignacionpercService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(
    private categoriasasignacionpercService: CategoriasasignacionpercService
    ,private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdata.cabeceras);

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 50,
        serverSide: true,
        processing: true,
        //destroy : true,
        searching : false,
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

          this.categoriasasignacionpercService.http
            .post<DataTablesResponse>(
              // this.API_URL + '/a6b_apis/read_records_dt.php',
              this.API_URL + '/categoriasasignacion/getAdminPerc',
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
        columns: this.headersAdmin,
        columnDefs:[{"visible": false, "searchable": false, "targets": 0}
                  ,{"width":"5%", "targets": 1}]
      };

  }
  openModal(id: string, accion: string, idItem: number) {
    this.categoriasasignacionpercService.open(id, accion, idItem,this.record_tipopercdeduc);
  }

  closeModal(id: string) {
    this.categoriasasignacionpercService.close(id);
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Hay que dessuscribirse del evento dtTrigger, para poder recrear la tabla.
    this.dtTrigger.unsubscribe();
  }

  onSelectTipopercdeduc(value){
    this.record_tipopercdeduc=value;
    this.reDraw();
  }

  reDraw(datosBusqueda: any = null): void {

    this.dtOptionsAdicional.tipopercdeduc=this.record_tipopercdeduc;
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
}
