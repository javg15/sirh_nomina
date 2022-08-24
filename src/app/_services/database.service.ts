import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
/* Importamos los environments, para determinar la URL base de las API's */
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  public API_URL = environment.APIS_URL;

  constructor(private http: HttpClient) { }

  getEsquemas(): Observable<any> {
    return this.http.post(this.API_URL + '/shared/getEsquemas', {
      
    }, httpOptions);
  }

  getTablas(esquema): Observable<any> {
    return this.http.post(this.API_URL + '/shared/getTablas', {
      esquema
    }, httpOptions);
  }

  getCampos(esquema,tabla): Observable<any> {
    return this.http.post(this.API_URL + '/shared/getCampos', {
      esquema,tabla
    }, httpOptions);
  }

  getFunciones(esquema): Observable<any> {
    return this.http.post(this.API_URL + '/shared/getFunciones', {
      esquema
    }, httpOptions);
  }
}
