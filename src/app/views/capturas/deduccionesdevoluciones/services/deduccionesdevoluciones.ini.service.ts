import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { DeduccionesdevolucionesService } from './deduccionesdevoluciones.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeduccionesdevolucionesIniService implements Resolve<Observable<any>>{

  constructor(private ds: DeduccionesdevolucionesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdataHoras => userdataHoras)
    )
  }
}
