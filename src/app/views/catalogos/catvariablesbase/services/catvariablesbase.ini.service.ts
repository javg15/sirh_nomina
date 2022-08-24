import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { CatvariablesbaseService } from './catvariablesbase.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CatvariablesbaseIniService implements Resolve <Observable<any>>{

  constructor(private ds: CatvariablesbaseService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdata => userdata)
    )
  }
}
