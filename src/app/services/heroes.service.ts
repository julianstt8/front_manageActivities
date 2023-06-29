import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = `${environment.apiUrl}auth`;

  constructor(private http: HttpClient) { }

  /** Valida que el usuario exista para iniciar sesion */
  public validateUser = (params) => this.http.post(`${this.url}/validateUser`, params);
  /** Crea un usuario */
  public createUser = (params) => this.http.post(`${this.url}/createUser`, params);

}
