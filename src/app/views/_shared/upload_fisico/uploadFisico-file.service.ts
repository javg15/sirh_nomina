import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../_services/token-storage.service';
/* Importamos los environments, para determinar la URL base de las API's */
import { environment } from '../../../../../src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadFisicoFileService {

  public API_URL = environment.APIS_URL;
  tipoGlobal:string;
  nombreGlobal:string;

  constructor(private http: HttpClient,private token: TokenStorageService) { }

  pushFileToStorage(file: File,ruta:string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    
    formdata.append('file', file);
    formdata.append('ruta',ruta);

    const req = new HttpRequest('POST', this.API_URL + '/archivos/uploadFisico', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);

  }

  listFile(id): Observable<any> {
    return this.http.get(this.API_URL + '/archivos/info/' + id);
  }

  //getFile(id): Observable<any> {
  getFile(ruta, tipo, nombre){
    const token = this.token.getToken();
    let re = /\//g;//reemplazar diagonal
    ruta=ruta.replace(re, "!");

    this.tipoGlobal=tipo
    this.nombreGlobal=nombre

    this.http.get(this.API_URL + '/archivos/df/' + ruta, {responseType: 'blob'})
    .subscribe( data => {

      const blob = new Blob([data], { type: this.tipoGlobal });
      const file = new File([blob], this.nombreGlobal, { type: this.tipoGlobal });
      const fileURL = URL.createObjectURL(file);

      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = fileURL;
      a.download = this.nombreGlobal;
      a.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(fileURL);
        document.body.removeChild(a);
      }, 0)

      //window.open(fileURL, '_blank');

      //var file = new Blob([data], {type: tipo});
      /*var fileURL = window.URL.createObjectURL(data);
      console.log("fileURL=>",fileURL)
      window.open(fileURL);*/
  });

    //return this.http.get(this.API_URL + '/archivos/' + id);
  }
}
