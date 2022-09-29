import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { RetroactivosService } from './retroactivos.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RetroactivosIniService implements Resolve<Observable<any>>{

  constructor(private ds: RetroactivosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdataHoras => userdataHoras)
    )
  }
}
