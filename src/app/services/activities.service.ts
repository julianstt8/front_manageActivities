import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private url = `${environment.apiUrl}activities`;

  constructor(private http: HttpClient) { }

  public save = (params: FormData) => this.http.post(`${this.url}/save`, params);

  public getActivities = (id) => this.http.post(`${this.url}/getActivities`, id);
}
