import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { CompensacionesService } from './compensaciones.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompensacionesIniService implements Resolve<Observable<any>>{

  constructor(private ds: CompensacionesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdataHoras => userdataHoras)
    )
  }
}
