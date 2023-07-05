import { Injectable, inject } from '@angular/core';
import { IPerson } from '../interfaces/IPerson';
import { IResponse } from '../interfaces/IResponse';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {

  url = 'http://localhost:3000'//'https://backend.wonderfulsky-826aeb73.brazilsouth.azurecontainerapps.io';

  cookieService: CookieService = inject(CookieService);

  constructor() {}

  async getPeople(): Promise<IResponse<IPerson>> {
    return (
      (await (
        await fetch(`${this.url}/persona/listarPersonas`, {
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

  async getPersonById(idPerson: number): Promise<IResponse<IPerson>> {
    return (
      (await (
        await fetch(`${this.url}/persona/detallePersona/${idPerson}`, {
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
