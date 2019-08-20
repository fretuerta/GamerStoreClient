import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Plataforma } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PlataformasService {

  baseUrl: string = environment.baseUrl;

  constructor( protected http: HttpClient) { }

  public readPlataformas(): Promise<any> {
    return this.http.get(this.baseUrl + 'plataformas').toPromise();
  }

  public deletePlataforma(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + 'plataforma/' + id).toPromise();
  }

  public updatePlataforma(plataforma: Plataforma): Promise<any> {
    return this.http.put(this.baseUrl + 'plataforma/' + plataforma.id, plataforma ).toPromise();
  }

  public addPlataforma(plataforma: Plataforma): Promise<any> {
    const post = { nombre: plataforma.nombre };
    return this.http.post(this.baseUrl + 'plataforma', post).toPromise();
  }

}
