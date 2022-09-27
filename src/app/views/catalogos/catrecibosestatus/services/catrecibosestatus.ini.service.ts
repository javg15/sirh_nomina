import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { CatrecibosestatusService } from './catrecibosestatus.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CatrecibosestatusIniService implements Resolve <Observable<any>>{

  constructor(private ds: CatrecibosestatusService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdata => userdata)
    )
  }
}
