import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { CategoriasasignacionsubService } from './categoriasasignacionsub.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriasasignacionsubIniService implements Resolve <Observable<any>>{

  constructor(private ds: CategoriasasignacionsubService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdata => userdata)
    )
  }
}
