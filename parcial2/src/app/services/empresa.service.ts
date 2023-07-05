import { Injectable, inject } from '@angular/core';
import { IEmpresa } from '../interfaces/IEmpresa';
import { IResponse } from '../interfaces/iresponse';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {

  url = 'http://localhost:3000'

  cookieService: CookieService = inject(CookieService);

  constructor() {}

  async getEmpresas(): Promise<IResponse<IEmpresa>> {
    return (
      (await (
        await fetch(`${this.url}/empresa/listarEmpresas`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.cookieService.get('SESSIONID'),
            'Content-Type': 'application/json',
          },
        })
      ).json()) ?? []
    );
  }

  async getEmpresa(idSong: number): Promise<IResponse<IEmpresa>> {
    return (
      (await (
        await fetch(`${this.url}/empresa/detalleEmpresa/${idSong}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.cookieService.get('SESSIONID'),
            'Content-Type': 'application/json',
          },
        })
      ).json()) ?? []
    );
  }

}
